import AuthorList from '@/screens/admin/authors/AuthorList'

import { NextPageAuth } from '@/shared/types/auth.types'

const AuthorListPage: NextPageAuth = () => {
	return <AuthorList />
}

AuthorListPage.isOnlyAdmin = true

export default AuthorListPage
