import CourseList from '@/components/screens/admin/courses/CourseList'

import { NextPageAuth } from '@/shared/types/auth.types'

const CourseListPage: NextPageAuth = () => {
	return <CourseList />
}

CourseListPage.isOnlyAdmin = true

export default CourseListPage
