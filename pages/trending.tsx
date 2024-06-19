import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-videos/Catalog'

import { IVideo } from '@/shared/types/video.types'

import { VideoService } from '@/services/video/video.service'

const TrendingPage: NextPage<{ videos: IVideo[] }> = ({ videos }) => {
	// const { data: popularVideos } = useQuery('Popular videos', () =>
	// 	VideoService.getMostPopularVideos()
	// )

	return (
		<Catalog
			videos={videos || []}
			title="Trending videos"
			description="Trending videos at the moment: , start taking courses"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const videos = await VideoService.getMostPopularVideos()
		return {
			props: {
				videos,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default TrendingPage
