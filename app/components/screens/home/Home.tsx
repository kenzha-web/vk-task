import { FC } from 'react'

import Gallery from '@/components/ui/gallery/Gallery'
import Heading from '@/components/ui/heading/Heading'
import SubHeading from '@/components/ui/heading/SubHeading'
import Slider from '@/components/ui/slider/Slider'

import Meta from '@/utils/meta/Meta'

import { IHome } from './home.interface'

const Home: FC<IHome> = ({ slides, authors, trendingVideos }) => {
	return (
		<Meta
			title="Take the course online"
			description="Take courses from D. Serikbayev EKTU teachers and industry experts at no cost to you,. Learn new skills and explore new and emerging topics."
		>
			<Heading
				title="Take the course online"
				className="text-gray-300 mb-8 text-xl"
			/>

			{slides.length && <Slider slides={slides} />}

			<div className="my-10">
				<SubHeading title="Trending video material" />
				{trendingVideos.length && <Gallery items={trendingVideos} />}
			</div>

			<div>
				<SubHeading title="Active authors" />
				{authors.length && <Gallery items={authors} />}
			</div>
		</Meta>
	)
}

export default Home
