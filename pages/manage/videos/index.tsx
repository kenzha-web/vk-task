import VideoList from '@/screens/admin/videos/VideoList'

import { NextPageAuth } from '@/shared/types/auth.types'

const VideoListPage: NextPageAuth = () => {
	return <VideoList />
}

VideoListPage.isOnlyAdmin = true

export default VideoListPage
