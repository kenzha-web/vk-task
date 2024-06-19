import { FC } from 'react'
import StarRating from 'react-star-rating-component'

import AuthButton from '@/ui/video-player/AuthPlaceholder/AuthButton'

import { useAuth } from '@/hooks/useAuth'

import styles from './RateVideo.module.scss'
import { useRateVideo } from './useRateVideo'

interface IRateVideo {
	id: string
	slug: string
}

const RateVideo: FC<IRateVideo> = ({ slug, id }) => {
	const { user } = useAuth()
	const { handleClick, isSended, rating } = useRateVideo(id)

	return (
		<div className={styles.wrapper}>
			<h3>How do you like the video?</h3>
			<p>Ratings improve recommendations</p>
			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}>Thanks for rating!</div>
					) : (
						<StarRating
							name="star-rating"
							value={rating}
							onStarClick={handleClick}
							emptyStarColor="#4f4f4f"
						/>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	)
}

export default RateVideo
