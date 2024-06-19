import { GetStaticProps, NextPage } from 'next'

import Collections from '@/screens/collections/Collections'
import { ICollection } from '@/screens/collections/collections.types'

import { CourseService } from '@/services/course/course.service'

import Error404 from './404'

const CoursesPage: NextPage<{ collections: ICollection[] }> = ({
	collections,
}) => {
	return collections ? (
		<Collections collections={collections || []} />
	) : (
		<Error404 />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await CourseService.getCollections()

		return {
			props: { collections },
			revalidate: 60,
		}
	} catch (error) {
		return {
			props: {},
			// notFound: true,
		}
	}
}

export default CoursesPage
