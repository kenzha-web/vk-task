import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { VideoService } from '@/services/video/video.service'

import { toastError } from '@/utils/toastr-error'
import { getCoursesList } from '@/utils/video/getCoursesList'

import { getAdminUrl } from '@/config/url.config'

export const useVideos = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['video list', debouncedSearch],
		() => VideoService.getVideos(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(video): ITableItem => ({
						_id: video._id,
						editUrl: getAdminUrl(`video/edit/${video._id}`),
						items: [
							video.title,
							getCoursesList(video.courses),
							String(video.rating),
						],
					})
				),
			onError(error) {
				toastError(error, 'video list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'create video',
		() => VideoService.create(),
		{
			onError(error) {
				toastError(error, 'Create video')
			},
			onSuccess({ data: _id }) {
				toastr.success('Create video', 'create was successful')
				push(getAdminUrl(`video/edit/${_id}`))
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete video',
		(videoId: string) => VideoService.delete(videoId),
		{
			onError(error) {
				toastError(error, 'Delete video')
			},
			onSuccess() {
				toastr.success('Delete video', 'delete was successful')
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
