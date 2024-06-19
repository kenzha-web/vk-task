import axios, { axiosClassic } from 'api/interceptors'

import { ICourseEditInput } from '@/components/screens/admin/course/course-edit.interface'
import { ICollection } from '@/components/screens/collections/collections.types'

import { ICourse } from '@/shared/types/video.types'

import { getCoursesUrl } from '@/config/api.config'

export const CourseService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<ICourse[]>(getCoursesUrl(``), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<ICourse>(getCoursesUrl(`/by-slug/${slug}`))
	},

	async getById(_id: string) {
		return axios.get<ICourseEditInput>(getCoursesUrl(`/${_id}`))
	},

	async create() {
		return axios.post<string>(getCoursesUrl('/'))
	},

	async update(_id: string, data: ICourseEditInput) {
		return axios.put<string>(getCoursesUrl(`/${_id}`), data)
	},

	async delete(_id: string) {
		return axios.delete<string>(getCoursesUrl(`/${_id}`))
	},

	async getCollections() {
		return axiosClassic.get<ICollection[]>(getCoursesUrl('/collections'))
	},

	async getPopularCourses(limit: number = 4) {
		return axiosClassic.get<ICourse[]>(getCoursesUrl(`/popular`), {
			params: {
				limit,
			},
		})
	},
}
