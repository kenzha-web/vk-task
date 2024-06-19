import VideoEdit from '@/components/screens/admin/video/VideoEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const VideoEditPage: NextPageAuth = () => {
	return <VideoEdit />
}

VideoEditPage.isOnlyAdmin = true

export default VideoEditPage
