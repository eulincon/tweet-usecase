import React from 'react'

type TitleProps = {}

export const Title: React.FunctionComponent<TitleProps> = ({ children }) => {
	return <h1 className='text-5xl leading-normal text-gray-700'>{children}</h1>
}
