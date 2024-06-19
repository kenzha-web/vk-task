import { FC } from 'react'

import Search from './Search/Search'
import styles from './Sidebar.module.scss'
import VideosContainer from './VideosContainer/VideosContainer'

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Search />
			<VideosContainer />
		</div>
	)
}

export default Sidebar
