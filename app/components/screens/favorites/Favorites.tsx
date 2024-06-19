import { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'

import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/Meta'

import FavoriteItem from './FavoriteItem'
import styles from './Favorites.module.scss'
import { useFavorites } from './useFavorites'

const Favorites: FC = () => {
	const { favoritesVideos, isLoading } = useFavorites()

	const { user } = useAuth()
	// if (!user) return null

	return (
		<Meta title="Favorites">
			<Heading title={'Favorites'} />
			<section className={styles.favorites}>
				{/* {isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : ( */}
				{favoritesVideos?.map((video) => (
					<FavoriteItem key={video._id} video={video} />
				))}
				)
			</section>
		</Meta>
	)
}

export default Favorites
