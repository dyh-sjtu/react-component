import * as React from 'react';
import './input.css';
import {FileModel} from "../modal/file-model";
import {EventEmitter} from 'events';

export class MtdpUploadFile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imgArr: [],
			isShowImage: false,
			url: '',
			name: ''
		};
		this.addFile = this.addFile.bind(this);
		this.delFile = this.delFile.bind(this);
		this.showImage = this.showImage.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}
	
	componentWillMount() {
		let imgItem = new FileModel();
		let temp = this.state.imgArr;
		temp.push(imgItem);
		this.setState({
			imgArr: temp
		})
	}
	
	showImage(event) {
		let url = event.target.dataset.url;
		let name = event.target.dataset.name;
		this.setState({
			isShowImage: true,
			url: url,
			name: name
		})
	}
	
	hideModal(event) {
		if (event.target.tagName !== 'IMG') {
			this.setState({
				isShowImage: false,
				url: '',
				name: ''
			})
		}
	}
	
	addFile(event) {
		let imgItem = new FileModel();
		let temp = this.state.imgArr;
		temp.push(imgItem);
		this.setState({
			imgArr: temp
		})
	}
	
	delFile(event) {
		let index = event.target.dataset.index;
		let temp = this.state.imgArr;
		temp.splice(index, 1)
		this.setState({
			imgArr: temp
		})
		console.log(this.state.imgArr)
	}
	
	render() {
		return (
			<div className="wrapper">
				{this.state.isShowImage ?
					(<div className="img-layer" onClick={this.hideModal}>
						<img src={this.state.url} alt={this.state.name}/>
					</div>)
					:
					(null)
				}
				<div className="input-wrapper">
					<div className="input-left">
						<strong style={{color: 'red'}}>*</strong>
						<span>{this.props.text}(建议尺寸: 705*300、750*1334)</span>
					</div>
					<div className="file-right">
						<div className="img-item">
							<ImgComponent imgArr={this.state.imgArr} delItem={this.delFile} showImage={this.showImage}/>
							<div className="add-item" onClick={this.addFile}>
								<button className="add-btn">
									<span>添加上传</span>
									<i className="iconfont cor-icon">&#xe71b;</i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export class ImgComponent extends React.Component {
	constructor(props) {
		super(props);
		this.handChange = this.handChange.bind(this);
		this.state = {
			uploadState: {
				isInit: true,
				isUploading: false,
				loaded: false,
				isError: false,
			},
		}
	}
	
	handChange(event) {
		event.stopPropagation();
		let fileReader = new FileReader();
		let file = this.fileInput.files[0];
		console.log(file);
		// if (!/image/.test(file.type)) {  // 因为input的accept属性限制了文件类型，所以无需判断是否上传的为图片
		// 	this.setState({
		// 		uploadState: {
		// 			isUploading: false,
		// 			loaded: false,
		// 			isError: true,
		// 			initial: false
		// 		}
		// 	})
		// } else {
		fileReader.readAsDataURL(file)
		// }
		
		fileReader.onerror = () => {
			this.setState({
				uploadState: {
					isInit: false,
					isUploading: false,
					loaded: false,
					isError: true,
				}
			})
		}
		
		fileReader.onprogress = (event) => {
			// 处理进度条
			this.setState({
				uploadState: {
					isUploading: true,
					loaded: false,
					isError: false,
					initial: false
				}
			})
		}
		
		fileReader.onload = () => {
			let temp = this.props.imgArr;
			temp[this.fileInput.dataset.index] = Object.assign(temp[this.fileInput.dataset.index], {
				type: file.type,
				name: file.name,
				size: file.size,
				url: fileReader.result
			});
			console.log(this.props.imgArr)
			this.setState({
				uploadState: {
					isUploading: false,
					loaded: true,
					isError: false,
					initial: false
				},
			})
		}
	}
	
	render() {
		return (
			this.props.imgArr.map((item, index) => {
				return (
					<div className="img-container" data-index={index} key={index.toString()}>
						<div className="upload-file">
							<a href="javascript:;" className="file-input-wrapper">
								<div className="img-upload">
									{item.name
										?
										(<div className="img-show" style={{backgroundImage: 'url(' + item.url + ')'}} data-name={item.name}
										      data-url={item.url} onClick={this.props.showImage}></div>)
										:
										(
											<div className="wrapper">
												<i className="iconfont upload-icon">&#xe600;</i>
												<input id="upload-input" data-index={index} className="file-input" type="file" accept="image/*"
												       onChange={this.handChange}
												       ref={input => this.fileInput = input}/>
											</div>
										)
									}
								</div>
							</a>
						</div>
						{this.props.imgArr.length !== 1 &&
						(<span className="del-item">
							<i className="iconfont" onClick={this.props.delItem}>&#xe605;</i>
						</span>)
						}
					</div>
				)
			})
		)
	}
}
