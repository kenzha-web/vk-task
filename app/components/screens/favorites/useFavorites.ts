import { useQuery } from 'react-query'

import { useAuth } from '@/hooks/useAuth'

import { UserService } from '@/services/user.service'

export const useFavorites = () => {
	const { user } = useAuth()
	const {
		isLoading,
		data: favoritesVideos,
		refetch,
	} = useQuery('Favorite videos', () => UserService.getFavorites(), {
		select: ({ data }) => data,
		enabled: !!user,
	})

	return { isLoading, favoritesVideos, refetch }
}
