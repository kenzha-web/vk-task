import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { IVideo } from '@/shared/types/video.types'

import { getVideoUrl } from '@/config/url.config'

import FavoriteButton from '../single-video/FavoriteButton/FavoriteButton'

import styles from './Favorites.module.scss'

const FavoriteItem: FC<{ video: IVideo }> = ({ video }) => {
	const { user } = useAuth()
	return (
		<div className={styles.itemWrapper}>
			{user && <FavoriteButton videoId={video._id} />}
			<Link legacyBehavior href={getVideoUrl(video.slug)}>
				<a className={styles.item}>
					<Image
						alt={video.title}
						src={video.bigPoster}
						layout="fill"
						draggable={false}
						priority
					/>

					<div className={styles.title}>{video.title}</div>
				</a>
			</Link>
		</div>
	)
}

export default FavoriteItem
