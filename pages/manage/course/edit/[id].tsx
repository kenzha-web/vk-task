import CourseEdit from '@/components/screens/admin/course/CourseEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const CourseEditPage: NextPageAuth = () => {
	return <CourseEdit />
}

CourseEditPage.isOnlyAdmin = true

export default CourseEditPage
