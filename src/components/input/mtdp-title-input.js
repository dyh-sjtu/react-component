import * as React from 'react';
import './input.css';

export class MtdpTitleInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			value: '',
			dangerColor: ''
		}
	}
	
	
	/**
	 * 用户输入改变时显示输入内容
	 * @param event
	 */
	handleChange(event) {
		let val = event.target.value.trim()
		if (val.length === 30) {
			this.setState({
				value: val,
				dangerColor: 'red'
			})
		}else {
			this.setState({
				value: val,
				dangerColor:''
			})
		}
	}
	
	
	/**
	 * 根据传入参数的不同渲染不同的组件
	 * @returns {XML}
	 */
	render() {
		return (
			<div className="input-wrapper">
				<div className="input-left">
					<strong style={{color: 'red'}}>*</strong>
					<span>{this.props.text}</span>
				</div>
				<div className="input-right">
					<input type="text" className="title-input" style={{borderColor: this.state.dangerColor}} value={this.state.value} onChange={this.handleChange} maxLength="30"/>
				</div>
				<span className="res-num" style={{color: this.state.dangerColor}}>还剩{30-this.state.value.trim().length}/30个字</span>
			</div>
		)
	}
}