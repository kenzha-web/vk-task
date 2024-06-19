import { IVideo } from '@/shared/types/video.types'

export interface IVideoEditInput
	extends Omit<
		IVideo,
		'_id' | 'rating' | 'countOpened' | 'courses' | 'authors'
	> {
	courses: string[]
	authors: string[]
}
