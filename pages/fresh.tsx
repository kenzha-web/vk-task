import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-videos/Catalog'

import { IVideo } from '@/shared/types/video.types'

import { VideoService } from '@/services/video/video.service'

const FreshPage: NextPage<{ videos: IVideo[] }> = ({ videos }) => {
	return (
		<Catalog
			videos={videos || []}
			title="Fresh videos"
			description="New videos, take courses, upgrade yourself with other users"
		/>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: videos } = await VideoService.getVideos()

		return {
			props: { videos },
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default FreshPage
