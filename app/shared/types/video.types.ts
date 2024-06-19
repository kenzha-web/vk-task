import { TypeMaterialIconName } from './icon.types'

export interface ICourse {
	_id: string
	name: string
	slug: string
	description: string
	icon: TypeMaterialIconName
}

export interface IAuthor {
	_id: string
	photo: string
	name: string
	countVideos: number
	slug: string
}

export interface IParameters {
	year: number
	duration: number
	university: string
}

export interface IVideo {
	_id: string
	poster: string
	bigPoster: string
	title: string
	parameters: IParameters
	courses: ICourse[]
	authors: IAuthor[]
	countOpened: number
	videoUrl: string
	rating: number
	slug: string
}
