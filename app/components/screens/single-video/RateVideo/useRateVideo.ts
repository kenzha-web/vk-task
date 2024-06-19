import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { useAuth } from '@/hooks/useAuth'

import { RatingService } from '@/services/rating/rating.service'

import { toastError } from '@/utils/toastr-error'

export const useRateVideo = (videoId: string) => {
	const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)

	const { user } = useAuth()

	const { refetch } = useQuery(
		['your video rating', videoId],
		() => RatingService.getByUserVideo(videoId),
		{
			onSuccess({ data }) {
				setRating(data)
			},
			onError: (error) => {
				toastError(error, 'Get rating')
			},
			enabled: !!videoId && !!user,
		}
	)

	const { mutateAsync } = useMutation(
		'set rating video',
		({ value }: { value: number }) => RatingService.setRating(videoId, value),
		{
			onError(error) {
				toastError(error, 'Rate video')
			},
			onSuccess() {
				toastr.success('Rate video', 'You have successfully rated!')

				setIsSended(true)
				refetch()

				setTimeout(() => {
					setIsSended(false)
				}, 2400)
			},
		}
	)

	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await mutateAsync({ value: nextValue })
	}

	return {
		isSended,
		rating,
		handleClick,
	}
}
