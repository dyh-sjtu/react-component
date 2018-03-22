import * as React from 'react';
import * as ReactDom from 'react-dom';

import {MtdpLabelInput} from './components/input/mtdp-label-input';
import {MtdpTitleInput} from "./components/input/mtdp-title-input";
import {MtdpTextArea} from "./components/input/mtdp-textarea";
import {MtdpNumberInput} from "./components/input/mtdp-number-input";
import {MtdpUploadFile} from "./components/input/mtdp-upload-file"

ReactDom.render(
	<div>
		<MtdpLabelInput text="目的地"/>
		<MtdpLabelInput text="标签"/>
		<MtdpTitleInput text="行程名称"/>
		<MtdpTextArea text="行程介绍"/>
		<MtdpNumberInput text="热度"/>
		<MtdpUploadFile text="点评行程头图"/>
	</div>,
	document.getElementById('root')
)