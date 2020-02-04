import React from 'react'
import './error-boundary.scss'

export default class ErrorBoundary extends React.Component {
	state = {
		hasError: false
	}

	componentDidCatch(error, info) {
		this.setState({ hasError: true })
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='error-main'>
					<div className='error-image'></div>
					<h3 className='error-description'>Guess something went wrong</h3>
				</div>
			)
		}
		return this.props.children
	}
}