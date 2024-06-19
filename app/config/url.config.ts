export const getVideoUrl = (slug: string) => `/video/${slug}`
export const getCourseUrl = (slug: string) => `/course/${slug}`
export const getAuthorUrl = (slug: string) => `/author/${slug}`

export const getAdminUrl = (url: string) => `/manage/${url}`
export const getAdminHomeUrl = () => getAdminUrl('').slice(0, -1)
