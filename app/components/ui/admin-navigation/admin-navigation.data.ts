import { getAdminHomeUrl, getAdminUrl } from '@/config/url.config'

import { INavItem } from './admin-navigation.interface'

export const navItems: INavItem[] = [
	{
		title: 'Statistics',
		link: getAdminHomeUrl(),
	},
	{
		title: 'Users',
		link: getAdminUrl('users'),
	},
	{
		title: 'Videos',
		link: getAdminUrl('videos'),
	},
	{
		title: 'Authors',
		link: getAdminUrl('authors'),
	},
	{
		title: 'Courses',
		link: getAdminUrl('courses'),
	},
]
