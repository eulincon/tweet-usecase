import TimeAgo from 'javascript-time-ago'
import pt from 'javascript-time-ago/locale/pt-PT.json'
import Image from 'next/image'
import React from 'react'
import { Tweet as TweetModel } from '../utils/models'

TimeAgo.addDefaultLocale(pt)
const timeAgo = new TimeAgo('pt-PT')

type TweetProps = {
	tweet: TweetModel
}

const Tweet: React.FunctionComponent<TweetProps> = ({ tweet }) => {
	return (
		<>
			<div className='border-b' />
			<div className='flex p-4 pb-0'>
				<div className='flex items-center'>
					<div className='h-10 w-10 relative'>
						<Image
							className='rounded-full'
							src={tweet.User.BiggerProfileImageURLHttps}
							alt=''
							layout='fill'
							objectFit='cover'
						/>
					</div>
					<div className='ml-3'>
						<p className='text-base leading-6 font-medium text-black'>
							{tweet.User.Name}
							<span className='text-sm font-normal text-gray-600'>
								@{tweet.User.ScreenName} . {timeAgo.format(tweet.CreatedAt)}
							</span>
						</p>
					</div>
				</div>
			</div>
			<div className='pl-16'>
				<p className='text-black'>{tweet.Text}</p>
			</div>
			<div className='mb-4' />
		</>
	)
}

export default Tweet
