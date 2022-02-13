import { NextPage } from 'next'
import React from 'react'
import useSWR from 'swr'
import http from '../utils/http'
import { Tweet } from '../utils/models'

const fetcher = (url: string) => http.get(url).then((res) => res.data)

const TweetsPage: NextPage = () => {
	const { data: tweets } = useSWR<Tweet[]>('tweets', fetcher)

	console.log(tweets)

	return (
		<div>
			<h1>Tweets</h1>
			listagem dos tweets
		</div>
	)
}

export default TweetsPage
