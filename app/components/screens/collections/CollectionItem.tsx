import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'

import { getCourseUrl } from '@/config/url.config'

import CollectionImage from './CollectionImage'
import styles from './Collections.module.scss'
import { ICollection } from './collections.types'

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link legacyBehavior href={getCourseUrl(collection.slug)}>
			<a className={styles.collection}>
				<CollectionImage collection={collection} />

				<div className={styles.content}>
					<div className={styles.title}>{collection.title}</div>
				</div>

				<div className={`${styles.behind} ${styles.second}`}>
					<CollectionImage collection={collection} />
				</div>

				<div className={cn(styles.behind, styles.second)}>
					<CollectionImage collection={collection} />
				</div>

				<div className={cn(styles.behind, styles.third)}>
					<CollectionImage collection={collection} />
				</div>
			</a>
		</Link>
	)
}

export default CollectionItem
