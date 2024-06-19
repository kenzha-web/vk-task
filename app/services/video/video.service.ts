import axios, { axiosClassic } from 'api/interceptors'

import { IVideoEditInput } from '@/components/screens/admin/video/video-edit.interface'

import { IVideo } from '@/shared/types/video.types'

import { getVideosUrl } from '@/config/api.config'

export const VideoService = {
	async getVideos(searchTerm?: string) {
		return axiosClassic.get<IVideo[]>(getVideosUrl(``), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getMostPopularVideos() {
		const { data: videos } = await axiosClassic.get<IVideo[]>(
			getVideosUrl('/most-popular')
		)

		return videos
	},

	async delete(_id: string) {
		return axios.delete<string>(getVideosUrl(`/${_id}`))
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IVideo>(getVideosUrl(`/by-slug/${slug}`))
	},

	async getByAuthor(authorId: string) {
		return axiosClassic.get<IVideo[]>(getVideosUrl(`/by-author/${authorId}`))
	},

	async getByCourses(courseIds: string[]) {
		return axiosClassic.post<IVideo[]>(getVideosUrl(`/by-courses`), {
			courseIds,
		})
	},

	async create() {
		return axios.post<string>(getVideosUrl('/'))
	},

	async updateCountOpened(slug: string) {
		return axiosClassic.put(getVideosUrl('/update-count-opened'), {
			slug,
		})
	},

	async update(_id: string, data: IVideoEditInput) {
		return axios.put<string>(getVideosUrl(`/${_id}`), data)
	},

	async getById(_id: string) {
		return axios.get<IVideoEditInput>(getVideosUrl(`/${_id}`))
	},
}
