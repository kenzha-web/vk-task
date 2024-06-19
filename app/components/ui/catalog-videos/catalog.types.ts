import { IVideo } from '@/shared/types/video.types'

export interface ICatalog {
	title: string
	description?: string
	videos: IVideo[]
}
