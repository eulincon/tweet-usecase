import { GetServerSideProps, NextPage } from 'next'
import React from 'react'

type Page1Props = {
	name: string
}

const Page1: NextPage<Page1Props> = (props) => {
	return <div>Hello {props.name}</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		props: {
			name: 'Full Cycle',
		},
	}
}

export default Page1
