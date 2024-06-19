import Link from 'next/link'
import { FC } from 'react'

import VideoItem from './VideoItem'
import styles from './VideoList.module.scss'
import { IVideoList } from './video-list.interface'

const VideoList: FC<IVideoList> = ({ link, videos, title }) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{videos.map((video) => (
				<VideoItem key={video._id} video={video} />
			))}
			<Link legacyBehavior href={link}>
				<a className={styles.button}>See more</a>
			</Link>
		</div>
	)
}

export default VideoList
