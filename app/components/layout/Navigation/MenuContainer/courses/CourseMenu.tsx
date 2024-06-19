import { FC } from 'react'

import SkeletonLoader from '@/ui/heading/SkeletonLoader'

import Menu from '../Menu'

import { usePopularCourses } from './usePopularCourses'

const CourseMenu: FC = () => {
	const { isLoading, data } = usePopularCourses()
	return isLoading ? (
		<div className="mx-11 md-6">
			<SkeletonLoader count={5} className="h-7 mt-6" />
		</div>
	) : (
		<Menu menu={{ title: 'Popular courses', items: data || [] }} />
	)
}

export default CourseMenu
