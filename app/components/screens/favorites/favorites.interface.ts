import { IGalleryItem } from '@/components/ui/gallery/gallery.types'

export interface IFavoriteItem extends Omit<IGalleryItem, 'content'> {
	title: string
	_id: string
}
