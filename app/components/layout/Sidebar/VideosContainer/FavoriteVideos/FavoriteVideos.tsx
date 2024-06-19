import { FC } from 'react'

import { useFavorites } from '@/components/screens/favorites/useFavorites'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'

import VideoList from '../VideoList'

import NotAuthFavorites from './NotAuthFavorites'

const FavoriteVideos: FC = () => {
	const { isLoading, favoritesVideos } = useFavorites()
	const { user } = useAuth()

	if (!user) return <NotAuthFavorites />

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<VideoList
			link="/favorites"
			videos={favoritesVideos?.slice(0, 3) || []}
			title="Favorites"
		/>
	)
}

export default FavoriteVideos
