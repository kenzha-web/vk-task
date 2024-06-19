import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'

import { VideoService } from '@/services/video/video.service'

import VideoList from './VideoList'

const PopularVideos: FC = () => {
	const { isLoading, data: popularVideos } = useQuery(
		'Popular videos in sidebar',
		() => VideoService.getMostPopularVideos(),
		{
			select: (data) => data.slice(0, 3),
		}
	)

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<VideoList
			link="/trending"
			videos={popularVideos || []}
			title="Popular videos"
		/>
	)
}

export default PopularVideos
