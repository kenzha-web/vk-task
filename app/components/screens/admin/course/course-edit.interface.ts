import { ICourse } from '@/shared/types/video.types'

export interface ICourseEditInput extends Omit<ICourse, '_id'> {}
