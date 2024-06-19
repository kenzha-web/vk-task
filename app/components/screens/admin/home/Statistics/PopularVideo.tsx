import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'
import SubHeading from '@/components/ui/heading/SubHeading'

import { IVideo } from '@/shared/types/video.types'

import { VideoService } from '@/services/video/video.service'

import { getVideoUrl } from '@/config/url.config'

import styles from '../Admin.module.scss'

const PopularVideo: FC = () => {
	const { isLoading, data: video } = useQuery(
		'Most popular video in admin',
		() => VideoService.getMostPopularVideos(),
		{
			select: (data): IVideo => data[0],
		}
	)

	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title="The most popular video" />
			{isLoading ? (
				<SkeletonLoader className="h-48" />
			) : (
				video && (
					<>
						<h3>Opened {video.countOpened} times</h3>
						<Link legacyBehavior href={getVideoUrl(video.slug)}>
							<a>
								<Image
									width={285}
									height={176}
									src={video.bigPoster}
									alt={video.title}
									className={styles.image}
									unoptimized
								/>
							</a>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularVideo
