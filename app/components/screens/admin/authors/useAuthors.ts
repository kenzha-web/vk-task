import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { AuthorService } from '@/services/author/author.service'

import { toastError } from '@/utils/toastr-error'

import { getAdminUrl } from '@/config/url.config'

export const useAuthors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['author list', debouncedSearch],
		() => AuthorService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(author): ITableItem => ({
						_id: author._id,
						editUrl: getAdminUrl(`author/edit/${author._id}`),
						items: [author.name, String(author.countVideos)],
					})
				),
			onError(error) {
				toastError(error, 'author list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'create author',
		() => AuthorService.create(),
		{
			onError(error) {
				toastError(error, 'Create author')
			},
			onSuccess({ data: _id }) {
				toastr.success('Create author', 'create was successful')
				push(getAdminUrl(`author/edit/${_id}`))
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete author',
		(authorId: string) => AuthorService.delete(authorId),
		{
			onError(error) {
				toastError(error, 'Delete author')
			},
			onSuccess() {
				toastr.success('Delete author', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
