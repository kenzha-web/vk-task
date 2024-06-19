import { FC } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

import { useAuth } from '@/hooks/useAuth'

import { IVideo } from '@/shared/types/video.types'

import { getAuthorUrl, getCourseUrl } from '@/config/url.config'

import FavoriteButton from '../FavoriteButton/FavoriteButton'

import styles from './Content.module.scss'
import ContentList from './ContentList/ContentList'

const Content: FC<{ video: IVideo }> = ({ video }) => {
	const { user } = useAuth()
	return (
		<div className={styles.content}>
			<h1>{video.title}</h1>
			<div className={styles.details}>
				<span>{video.parameters.year} · </span>
				<span>{video.parameters.university} · </span>
				<span>{video.parameters.duration} min.</span>
			</div>
			<ContentList
				name="Courses"
				links={video.courses.slice(0, 3).map((g) => ({
					_id: g._id,
					link: getCourseUrl(g.slug),
					title: g.name,
				}))}
			/>
			<ContentList
				name="Authors"
				links={video.authors.slice(0, 3).map((a) => ({
					_id: a._id,
					link: getAuthorUrl(a.slug),
					title: a.name,
				}))}
			/>

			<div className={styles.rating}>
				<MaterialIcon name="MdStarRate" />
				<span>{video.rating.toFixed(1)}</span>
			</div>
			<FavoriteButton videoId={video._id} />
		</div>
	)
}

export default Content
