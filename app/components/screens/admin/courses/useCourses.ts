import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { CourseService } from '@/services/course/course.service'

import { toastError } from '@/utils/toastr-error'

import { getAdminUrl } from '@/config/url.config'

export const useCourses = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['course list', debouncedSearch],
		() => CourseService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(course): ITableItem => ({
						_id: course._id,
						editUrl: getAdminUrl(`course/edit/${course._id}`),
						items: [course.name, course.slug],
					})
				),
			onError(error) {
				toastError(error, 'course list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'create course',
		() => CourseService.create(),
		{
			onError(error) {
				toastError(error, 'Create course')
			},
			onSuccess({ data: _id }) {
				toastr.success('Create course', 'create was successful')
				push(getAdminUrl(`course/edit/${_id}`))
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete course',
		(courseId: string) => CourseService.delete(courseId),
		{
			onError(error) {
				toastError(error, 'Delete course')
			},
			onSuccess() {
				toastr.success('Delete course', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
