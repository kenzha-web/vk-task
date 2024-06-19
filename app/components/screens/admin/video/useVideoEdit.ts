import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { VideoService } from '@/services/video/video.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toastr-error'

import { getAdminUrl } from '@/config/url.config'

import { IVideoEditInput } from './video-edit.interface'

export const useVideoEdit = (setValue: UseFormSetValue<IVideoEditInput>) => {
	const { query, push } = useRouter()

	const videoId = String(query.id)

	const { isLoading } = useQuery(
		['video', videoId],
		() => VideoService.getById(videoId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError(error) {
				toastError(error, 'Get video')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update video',
		(data: IVideoEditInput) => VideoService.update(videoId, data),
		{
			onError(error) {
				toastError(error, 'Update video')
			},
			onSuccess() {
				toastr.success('Update video', 'update was successful')
				push(getAdminUrl('video'))
			},
		}
	)

	const onSubmit: SubmitHandler<IVideoEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
