import { IVideo } from '@/shared/types/video.types'

export interface ISlide extends Pick<IVideo, '_id' | 'bigPoster' | 'title'> {
	// _id: string
	// bigPoster: string
	// title: string
	subTitle: string
	link: string
}
