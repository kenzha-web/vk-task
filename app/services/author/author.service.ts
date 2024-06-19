import axios, { axiosClassic } from 'api/interceptors'

import { IAuthorEditInput } from '@/components/screens/admin/author/author-edit.interface'

import { IAuthor } from '@/shared/types/video.types'

import { getAuthorsUrl } from '@/config/api.config'

export const AuthorService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<IAuthor>(getAuthorsUrl(`/by-slug/${slug}`))
	},

	async create() {
		return axios.post<string>(getAuthorsUrl('/'))
	},

	async update(_id: string, data: IAuthorEditInput) {
		return axios.put<string>(getAuthorsUrl(`/${_id}`), data)
	},

	async delete(_id: string) {
		return axios.delete<string>(getAuthorsUrl(`/${_id}`))
	},

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IAuthor[]>(getAuthorsUrl(``), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getById(_id: string) {
		return axios.get<IAuthorEditInput>(getAuthorsUrl(`/${_id}`))
	},
}
