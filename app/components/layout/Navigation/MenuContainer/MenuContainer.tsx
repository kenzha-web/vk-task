import dynamic from 'next/dynamic'
import { FC } from 'react'

import Menu from './Menu'
import { firstMenu, userMenu } from './menu.data'

const DynamicCourseMenu = dynamic(() => import('./courses/CourseMenu'), {
	ssr: false,
})

const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
			<DynamicCourseMenu />
			<Menu menu={userMenu} />
		</div>
	)
}

export default MenuContainer
