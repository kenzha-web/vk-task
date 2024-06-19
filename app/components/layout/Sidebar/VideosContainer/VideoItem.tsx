import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import { IVideo } from '@/shared/types/video.types'

import { getCoursesListEach } from '@/utils/video/getCoursesList'

import { getCourseUrl, getVideoUrl } from '@/config/url.config'

import styles from './VideoList.module.scss'

const VideoItem: FC<{ video: IVideo }> = ({ video }) => {
	return (
		<div className={styles.item}>
			<Link legacyBehavior href={getVideoUrl(video.slug)}>
				<a>
					<Image
						width={65}
						height={97}
						src={video.poster}
						alt={video.title}
						draggable={false}
						priority
					/>
				</a>
			</Link>
			<div className={styles.info}>
				<div>
					<div className={styles.title}>{video.title}</div>
					<div className={styles.courses}>
						{video.courses.map((course, idx) => (
							<Link
								legacyBehavior
								key={course._id}
								href={getCourseUrl(course.slug)}
							>
								<a>
									{getCoursesListEach(idx, video.courses.length, course.name)}
								</a>
							</Link>
						))}
					</div>
				</div>
				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{video.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}

export default VideoItem
