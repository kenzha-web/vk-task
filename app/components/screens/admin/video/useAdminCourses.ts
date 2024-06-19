import { useQuery } from 'react-query'

import { IOption } from '@/ui/select/select.interface'

import { CourseService } from '@/services/course/course.service'

import { toastError } from '@/utils/toastr-error'

export const useAdminCourses = () => {
	const queryData = useQuery('list of course', () => CourseService.getAll(), {
		select: ({ data }) =>
			data.map(
				(course): IOption => ({
					label: course.name,
					value: course._id,
				})
			),
		onError(error) {
			toastError(error, 'course list')
		},
	})

	return queryData
}
