import dynamic from 'next/dynamic'
import { FC } from 'react'

import VRroom from '@/components/ui/vr-room/VRroom'

import Banner from '@/ui/banner/Banner'
import Gallery from '@/ui/gallery/Gallery'
import SubHeading from '@/ui/heading/SubHeading'

import Meta from '@/utils/meta/Meta'

import { IVideoPage } from '../../../../pages/video/[slug]'

import Content from './Content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'

const DynamicPlayer = dynamic(() => import('@/ui/video-player/VideoPlayer'), {
	ssr: false,
})

const DynamicRateVideo = dynamic(() => import('./RateVideo/RateVideo'), {
	ssr: false,
})

const SingleVideo: FC<IVideoPage> = ({ video, similarVideos }) => {
	useUpdateCountOpened(video.slug)

	return (
		<Meta title={video.title} description={`Watch ${video.title}`}>
			<Banner
				image={video.bigPoster}
				Detail={() => <Content video={video} />}
			/>

			<div className="mt-12">
				<VRroom title="Join VR room" />
			</div>

			<DynamicPlayer slug={video.slug} videoSource={video.videoUrl} />

			<div className="mt-12">
				<SubHeading title="Other videos" />
				<Gallery items={similarVideos} />
			</div>

			<DynamicRateVideo slug={video.slug} id={video._id} />
		</Meta>
	)
}

export default SingleVideo
