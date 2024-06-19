import axios from 'api/interceptors'

import { IProfileInput } from '@/components/screens/profile/profile.interface'

import { IUser } from '@/shared/types/user.types'
import { IVideo } from '@/shared/types/video.types'

import { getUsersUrl } from '@/config/api.config'

export const UserService = {
	async getProfile() {
		return axios.get<IUser>(getUsersUrl('/profile'))
	},

	async updateProfile(data: IProfileInput) {
		return axios.put<string>(getUsersUrl('/profile'), data)
	},

	async getUsers(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getUser(_id: string) {
		return axios.get<IUser>(getUsersUrl(`/${_id}`))
	},

	async updateUser(_id: string, data: IProfileInput) {
		return axios.put<string>(getUsersUrl(`/${_id}`), data)
	},

	async deleteUser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	},

	async getFavorites() {
		return axios.get<IVideo[]>(getUsersUrl('/profile/favorites'))
	},

	async toggleFavorite(videoId: string) {
		return axios.put(getUsersUrl('/profile/favorites'), {
			videoId,
		})
	},
}
