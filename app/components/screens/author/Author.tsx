import { FC } from 'react'

import Catalog from '@/components/ui/catalog-videos/Catalog'

import { IAuthorPage } from './author.types'

const Author: FC<IAuthorPage> = ({ author, videos }) => {
	return <Catalog videos={videos} title={author.name} />
}

export default Author
