import { ICourse, IVideo } from '@/shared/types/video.types'

export interface ICoursePage {
	videos: IVideo[]
	course: ICourse
}
