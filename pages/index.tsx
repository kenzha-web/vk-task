import type { GetStaticProps, NextPage } from 'next'

import Home from '@/screens/home/Home'

import { IHome } from '@/components/screens/home/home.interface'
import { IGalleryItem } from '@/components/ui/gallery/gallery.types'
import { ISlide } from '@/components/ui/slider/slider.types'

import { AuthorService } from '@/services/author/author.service'
import { VideoService } from '@/services/video/video.service'

import { getCoursesList } from '@/utils/video/getCoursesList'

import { getAuthorUrl, getVideoUrl } from '@/config/url.config'

const HomePage: NextPage<IHome> = ({ slides, authors, trendingVideos }) => {
	return (
		<Home slides={slides} authors={authors} trendingVideos={trendingVideos} />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: videos } = await VideoService.getVideos()
		const { data: dataAuthors } = await AuthorService.getAll()
		const dataTrendingVideos = await VideoService.getMostPopularVideos()

		const slides: ISlide[] = videos.slice(0, 3).map((m) => ({
			_id: m._id,
			link: getVideoUrl(m.slug),
			bigPoster: m.bigPoster,
			subTitle: getCoursesList(m.courses),
			title: m.title,
		}))

		const authors: IGalleryItem[] = dataAuthors.slice(0, 7).map((a) => ({
			name: a.name,
			posterPath: a.photo,
			link: getAuthorUrl(a.slug),
			content: {
				title: a.name,
				subTitle: `+${a.countVideos} videos`,
			},
		}))

		const trendingVideos: IGalleryItem[] = dataTrendingVideos
			.slice(0, 7)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getVideoUrl(m.slug),
			}))

		return {
			props: {
				slides,
				authors,
				trendingVideos,
			} as IHome,
			revalidate: 60,
		}
	} catch (error) {
		return {
			props: {
				slides: [],
				authors: [],
				trendingVideos: [],
			},
		}
	}
}

export default HomePage
