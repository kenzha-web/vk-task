import { FC } from 'react'

import styles from '../Admin.module.scss'

import CountUsers from './CountUsers'
import PopularVideo from './PopularVideo'

const Statistics: FC = () => {
	return (
		<div className={styles.statistics}>
			<CountUsers />
			<PopularVideo />
		</div>
	)
}

export default Statistics
