import { useQuery } from 'react-query'

import { CourseService } from '@/services/course/course.service'

import { toastError } from '@/utils/toastr-error'

import { getCourseUrl } from '@/config/url.config'

import { IMenuItem } from '../menu.interface'

export const usePopularCourses = () => {
	const queryData = useQuery(
		'popular course menu',
		() => CourseService.getAll(),
		{
			select: ({ data }) =>
				data
					.filter((course) => course.icon)
					.map(
						(course) =>
							({
								icon: course.icon,
								link: getCourseUrl(course.slug),
								title: course.name,
							} as IMenuItem)
					)
					.slice(0, 4),
			onError(error) {
				toastError(error, 'Popular courses menu')
			},
		}
	)
	return queryData
}
