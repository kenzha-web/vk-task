import axios from 'api/interceptors'

import { getRatingsUrl } from '@/config/api.config'

export const RatingService = {
	async setRating(videoId: string, value: number) {
		return axios.post<string>(getRatingsUrl('/set-rating'), {
			videoId,
			value,
		})
	},

	async getByUserVideo(videoId: string) {
		return axios.get<number>(getRatingsUrl(`/${videoId}`))
	},
}
