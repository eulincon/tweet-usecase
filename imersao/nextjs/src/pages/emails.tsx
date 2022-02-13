import { NextPage } from 'next'
import React, { FormEvent } from 'react'
import useSWR from 'swr'
import Button from '../components/Button'
import { Title } from '../components/Title'
import http from '../utils/http'

const fetcher = (url: string) =>
	http.get(url).then((res) => (res.data === '' ? [] : res.data.emails))

const EmailsPage: NextPage = () => {
	const { data } = useSWR('mail-list', fetcher, {
		fallbackData: [],
	})

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const emailsTextarea = document.getElementById(
			'emails'
		) as HTMLTextAreaElement
		await http.post('mail-list', { emails: emailsTextarea.value.split('\n') })
	}

	return (
		<>
			<Title>Emails</Title>
			<div className='border-b' />
			<form onSubmit={onSubmit}>
				<textarea
					className='border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
					id='emails'
					placeholder='Digite os emails separados por linha'
					rows={10}
					defaultValue={data.join('\n')}
				></textarea>
				<Button></Button>
			</form>
		</>
	)
}

export default EmailsPage
