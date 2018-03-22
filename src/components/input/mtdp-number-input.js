import * as React from 'react'
import './input.css'

export class MtdpNumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.add = this.add.bind(this);
		this.sub = this.sub.bind(this);
		this.state = {
			value: 100,
			error: ''
		}
	}
	
	/**
	 * 用户输入改变时显示输入内容
	 * @param event
	 */
	handleChange(event) {
		let val = event.target.value.trim();
		if (!isNaN(Number(val)) && (Number(val) >=0 && Number(val) <= 100) && Number(val) === Math.floor(Number(val))) {
			this.setState({
				value: val.replace(/\./g, ''),
				error:''
			})
		}else {
			this.setState({
				error: "请您输入0到100之间的整数"
			})
		}
	}
	
	/**
	 * 热度数字加
	 */
	add() {
		let num = Number(this.state.value);
		num++;
		if (num <= 100 && num >= 0) {
			this.setState({
				value: num.toString(),
				error: ''
			})
		}else {
			this.setState({
				error: "请您输入小于等于100的整数"
			})
		}
	}
	
	/**
	 * 热度数字减
	 */
	sub() {
		let num = Number(this.state.value);
		num--;
		if (num <= 100 && num >= 0) {
			this.setState({
				value: num.toString(),
				error: ''
			})
		}else {
			this.setState({
				error: "请您输入大于等于0的整数"
			})
		}
	}
	
	handleBlur() {
		this.setState({
			error:''
		})
	}
	
	render() {
		return (
			<div className="input-wrapper">
				<div className="input-left">
					<strong style={{color: 'red'}}>*</strong>
					<span>{this.props.text}</span>
				</div>
				<div className="input-num-right">
					<div className="input-container">
						<div className="input-number-wrapper">
							<input className="number-input" type="text" value={this.state.value} onChange={this.handleChange} onBlur={this.handleBlur.bind(this)}/>
						</div>
						<div className="switch-btn">
							<div className="up btn" onClick={this.add}>
								<i className="iconfont">&#xe78f;</i>
							</div>
							<div className="down btn" onClick={this.sub}>
								<i className="iconfont">&#xe604;</i>
							</div>
						</div>
					</div>
				</div>
				<div className="input-num-note">%人旅行者选择此路线</div>
				<div className="err-msg">{this.state.error}</div>
			</div>
		)
	}
}