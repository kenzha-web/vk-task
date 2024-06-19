import dynamic from 'next/dynamic'
import { FC } from 'react'

import PopularVideos from './PopularVideos'

const DynamicFavoriteVideos = dynamic(
	() => import('./FavoriteVideos/FavoriteVideos'),
	{
		ssr: false,
	}
)

const VideosContainer: FC = () => {
	return (
		<div>
			<PopularVideos />
			<DynamicFavoriteVideos />
		</div>
	)
}

export default VideosContainer
