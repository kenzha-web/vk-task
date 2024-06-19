import { IAuthor, IVideo } from '@/shared/types/video.types'

export interface IAuthorPage {
	author: IAuthor
	videos: IVideo[]
}
