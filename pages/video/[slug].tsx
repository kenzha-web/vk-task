import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleVideo from '@/components/screens/single-video/SingleVideo'
import { IGalleryItem } from '@/components/ui/gallery/gallery.types'

import { IVideo } from '@/shared/types/video.types'

import { VideoService } from '@/services/video/video.service'

import { getVideoUrl } from '@/config/url.config'

import Error404 from '../404'

export interface IVideoPage {
	video: IVideo
	similarVideos: IGalleryItem[]
}

const VideoPage: NextPage<IVideoPage> = ({ video, similarVideos }) => {
	return video ? (
		<SingleVideo video={video} similarVideos={similarVideos || []} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: videos } = await VideoService.getVideos()
		const paths = videos.map((a) => ({
			params: { slug: a.slug },
		}))

		return { paths, fallback: 'blocking' }
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: video } = await VideoService.getBySlug(String(params?.slug))

		const { data: dataSimilarVideos } = await VideoService.getByCourses(
			video.courses.map((g) => g._id)
		)

		const similarVideos: IGalleryItem[] = dataSimilarVideos
			.filter((m) => m._id !== video._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getVideoUrl(m.slug),
			}))

		return {
			props: { video, similarVideos },
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default VideoPage
