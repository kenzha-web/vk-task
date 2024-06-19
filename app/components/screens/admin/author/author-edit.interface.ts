import { IAuthor } from '@/shared/types/video.types'

export interface IAuthorEditInput
	extends Omit<IAuthor, '_id' | 'countVideos'> {}
