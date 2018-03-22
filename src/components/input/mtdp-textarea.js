import * as React from 'react'
import './input.css'

export class MtdpTextArea extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			value: '',
		}
	}
	
	/**
	 * 用户输入改变时显示输入内容
	 * @param event
	 */
	handleChange(event) {
		let val = event.target.value.trim()
		this.setState({
			value: val,
		})
		
	}
	
	render() {
		return (
			<div className="input-wrapper">
				<div className="input-left">
					<strong style={{color: 'red'}}>*</strong>
					<span>{this.props.text}</span>
				</div>
				<div className="input-right">
					<textarea className="title-textarea" value={this.state.value} onChange={this.handleChange}>
					</textarea>
				</div>
			</div>
		)
	}
}