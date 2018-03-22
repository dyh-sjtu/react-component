import * as React from "react";
import './input.css';

/**
 * 标签输入框组件
 */
export class MtdpLabelInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.delLabel = this.delLabel.bind(this);
		/**
		 * 初始化输入框状态
		 * @type {{value: string, valueArr: Array, error: string}}
		 */
		this.state = {
			value: '',
			valueArr: [],
			error: ''
		}
	}
	
	
	/**
	 * 用户输入改变时显示输入内容
	 * @param event
	 */
	handleChange(event) {
		let val = event.target.value.trim();
		this.setState({
			value: val,
			error: ''
		})
	}
	
	/**
	 * 删除标签
	 * @param event
	 */
	delLabel(event) {
		let index = Number(event.target.dataset.index || event.target.getAttribute('data-index'))
		let tempArr = this.state.valueArr;
		tempArr.splice(index, 1);
		this.setState({
			valueArr: tempArr
		})
	}
	
	/**
	 * 当用户按下enter键时触发生成标签事件
	 * @param event
	 */
	handleKeyDown(event) {
		let tempArr = this.state.valueArr;
		let val = event.target.value.trim()
		if (event.keyCode === 13) {
			if (val && this.state.valueArr.indexOf(val) === -1) {
				tempArr.push(val)  // 只有输入的字符串不为空时，才能生成标签
				this.setState({
					valueArr: tempArr,
					value: ''
				})
			} else if (val === '') {
				this.setState({
					error: '您输入的标签不能为空'
				})
			} else if (this.state.valueArr.indexOf(val) > -1) {
				this.setState({
					error: '您输入的标签重复,请重新输入',
					value: ''
				})
			}
		}
	}
	
	/**
	 * 根据传入参数的不同渲染不同的组件
	 * @returns {XML}
	 */
	render() {
		const listItems = this.state.valueArr.map((item, index) =>
			<div className="label-item" key={index.toString()}>
				<span>{item}</span>
				<i className="iconfont" data-index={index} onClick={this.delLabel}>&#xe635;</i>
			</div>)
		return (
			<div className="input-wrapper">
				<div className="input-left">
					<strong style={{color: 'red'}}>*</strong>
					<span>{this.props.text}</span>
				</div>
				<div className="input-right">
					<div className="right-wrapper">
						<div className="label-container">
							{listItems}
							<div className="input-text-container">
								<input type="text" className="label-input" value={this.state.value}
								       onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
							</div>
						</div>
					</div>
				</div>
				<div className="err-msg">{this.state.error}</div>
			</div>
		)
	}
	
}