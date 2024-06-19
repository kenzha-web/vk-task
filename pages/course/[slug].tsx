// import { errorCatch } from 'api/api.helpers'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

// import { ICoursePage } from '@/components/screens/course/genre.types'
import Catalog from '@/components/ui/catalog-videos/Catalog'

import { ICourse, IVideo } from '@/shared/types/video.types'

import { CourseService } from '@/services/course/course.service'
import { VideoService } from '@/services/video/video.service'

import Error404 from '../404'

interface ICoursePage {
	videos: IVideo[]
	course: ICourse | undefined
}

const CoursePage: NextPage<ICoursePage> = ({ videos, course }) => {
	return course ? (
		<Catalog
			videos={videos || []}
			title={course.name}
			description={course.description}
		/>
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: courses } = await CourseService.getAll()
		const paths = courses.map((g) => ({
			params: { slug: g.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: course } = await CourseService.getBySlug(String(params?.slug))

		const { data: videos } = await VideoService.getByCourses([course._id])

		return {
			props: { videos, course },
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default CoursePage
