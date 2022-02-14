import { NextPage } from 'next'
import React from 'react'
import useSWR from 'swr'
import { Title } from '../components/Title'
import Tweet from '../components/Tweet'
import http from '../utils/http'
import { Tweet as TweetModel } from '../utils/models'

const fetcher = (url: string) => http.get(url).then((res) => res.data)

const TweetsPage: NextPage = () => {
	const { data: tweets } = useSWR<TweetModel[]>('tweets', fetcher, {
		refreshInterval: 5000,
	})

	console.log(tweets)

	return (
		<>
			<Title>Tweets</Title>
			{tweets?.map((tweet, key) => (
				<Tweet tweet={tweet} key={key} />
			))}
		</>
	)
}

export default TweetsPage
