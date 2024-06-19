import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { CourseService } from '@/services/course/course.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toastr-error'

import { getAdminUrl } from '@/config/url.config'

import { ICourseEditInput } from './course-edit.interface'

export const useCourseEdit = (setValue: UseFormSetValue<ICourseEditInput>) => {
	const { query, push } = useRouter()

	const courseId = String(query.id)

	const { isLoading } = useQuery(
		['course', courseId],
		() => CourseService.getById(courseId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError(error) {
				toastError(error, 'Get course')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update course',
		(data: ICourseEditInput) => CourseService.update(courseId, data),
		{
			onError(error) {
				toastError(error, 'Update course')
			},
			onSuccess() {
				toastr.success('Update course', 'update was successful')
				push(getAdminUrl('course'))
			},
		}
	)

	const onSubmit: SubmitHandler<ICourseEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
