import Link from 'next/link'
import { FC } from 'react'

import styles from './VRroom.module.scss'

const VRroom: FC<{ title: string }> = ({ title }) => {
	return (
		<div className="text-white text-xl mb-5 font-semibold">
			<Link legacyBehavior href="http://localhost:8080">
				<a className={styles.button}>{title}</a>
			</Link>
		</div>
	)
}

export default VRroom
