import { FC } from 'react'

import GalleryItem from '@/components/ui/gallery/GalleryItem'
import Description from '@/components/ui/heading/Description'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { getVideoUrl } from '@/config/url.config'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.types'

const Catalog: FC<ICatalog> = ({ title, description, videos }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description text={description} className={styles.description} />
			)}

			<section className={styles.videos}>
				{videos.map((video) => (
					<GalleryItem
						key={video._id}
						variant="horizontal"
						item={{
							name: video.title,
							posterPath: video.bigPoster,
							link: getVideoUrl(video.slug),
							content: {
								title: video.title,
							},
						}}
					/>
				))}
			</section>
		</Meta>
	)
}

export default Catalog
