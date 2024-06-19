import { FC } from 'react'

import Catalog from '@/components/ui/catalog-videos/Catalog'

import { ICoursePage } from './genre.types'

const Course: FC<ICoursePage> = ({ course, videos }) => {
	return (
		<Catalog
			videos={videos || []}
			title={course.name}
			description={course.description}
		/>
	)
}

export default Course
