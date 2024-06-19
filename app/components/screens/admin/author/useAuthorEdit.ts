import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { AuthorService } from '@/services/author/author.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toastr-error'

import { getAdminUrl } from '@/config/url.config'

import { IAuthorEditInput } from './author-edit.interface'

export const useAuthorEdit = (setValue: UseFormSetValue<IAuthorEditInput>) => {
	const { query, push } = useRouter()

	const authorId = String(query.id)

	const { isLoading } = useQuery(
		['author', authorId],
		() => AuthorService.getById(authorId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError(error) {
				toastError(error, 'Get author')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update author',
		(data: IAuthorEditInput) => AuthorService.update(authorId, data),
		{
			onError(error) {
				toastError(error, 'Update author')
			},
			onSuccess() {
				toastr.success('Update author', 'update was successful')
				push(getAdminUrl('author'))
			},
		}
	)

	const onSubmit: SubmitHandler<IAuthorEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
