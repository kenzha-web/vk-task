import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { UserService } from '@/services/user.service'

import { toastError } from '@/utils/toastr-error'

import { useFavorites } from '../../favorites/useFavorites'

import styles from './FavoriteButton.module.scss'

const FavoriteButton: FC<{ videoId: string }> = ({ videoId }) => {
	const [isSmashed, setIsSmashed] = useState(false)

	const { favoritesVideos, refetch } = useFavorites()

	useEffect(() => {
		if (favoritesVideos) {
			const isHasVideo = favoritesVideos.some((f) => f._id === videoId)
			if (isSmashed !== isHasVideo) setIsSmashed(isHasVideo)
		}
	}, [favoritesVideos, isSmashed, videoId])

	const { mutateAsync } = useMutation(
		'update favorites',
		() => UserService.toggleFavorite(videoId),
		{
			onError(error) {
				toastError(error, 'Update favorite list')
			},
			onSuccess() {
				setIsSmashed(!isSmashed)
				refetch()
			},
		}
	)

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed,
			})}
			style={{ backgroundImage: `url('/heart-animation.png')` }}
		/>
	)
}

export default FavoriteButton
