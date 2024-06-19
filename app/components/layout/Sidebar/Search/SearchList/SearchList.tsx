import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IVideo } from '@/shared/types/video.types'

import { getVideoUrl } from '@/config/url.config'

import styles from './SearchList.module.scss'

const SearchList: FC<{ videos: IVideo[] }> = ({ videos }) => {
	return (
		<div className={styles.list}>
			{videos.length ? (
				videos.map((video) => (
					<Link legacyBehavior key={video._id} href={getVideoUrl(video.slug)}>
						<a>
							<Image
								src={video.poster}
								width={50}
								height={50}
								style={{ objectFit: 'cover', objectPosition: 'top' }}
								alt={video.title}
								draggable={false}
							/>
							<span>{video.title}</span>
						</a>
					</Link>
				))
			) : (
				<div className="text-white text-center my-4">Videos not found!</div>
			)}
		</div>
	)
}

export default SearchList
