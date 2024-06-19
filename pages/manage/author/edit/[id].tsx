import AuthorEdit from '@/components/screens/admin/author/AuthorEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const AuthorEditPage: NextPageAuth = () => {
	return <AuthorEdit />
}

AuthorEditPage.isOnlyAdmin = true

export default AuthorEditPage
