import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-videos/Catalog'

import { IAuthor, IVideo } from '@/shared/types/video.types'

// import { IAuthorPage } from '@/components/screens/author/author.types'
import { AuthorService } from '@/services/author/author.service'
import { VideoService } from '@/services/video/video.service'

import Error404 from '../404'

interface IAuthorPage {
	videos: IVideo[]
	author: IAuthor | undefined
}

const AuthorPage: NextPage<IAuthorPage> = ({ author, videos }) => {
	return author ? (
		<Catalog videos={videos || []} title={author.name} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: authors } = await AuthorService.getAll()
		const paths = authors.map((a) => ({
			params: { slug: a.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (e) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: author } = await AuthorService.getBySlug(String(params?.slug))

		const { data: videos } = await VideoService.getByAuthor(author._id)

		return {
			props: { videos, author },
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default AuthorPage
