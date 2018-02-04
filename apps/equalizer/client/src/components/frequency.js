/**
 * Frequenct Component: Provide individual frequency selection in an equilizer.
 */
import {perc2color} from '../utils/index.js';

const $ = React.createElement;

export default class Frequency extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value: props.value,
			pos: 0
		}
		this.rail = null;
		this.refSetup = this.refSetup.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onRailMouseUp = this.onRailMouseUp.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.calculatePos = this.calculatePos.bind(this);
		this.calculateValue = this.calculateValue.bind(this);
	}

	calculatePos(val) {
		const { min, max, step} = this.props;
		const percent = (( val - min))/(max - min);
		const pos = Math.floor(percent*this.rail.clientHeight) - 16;
		this.setState({value: val, pos});
		let p = (val+max)/(max-min)*100;
		this.rail.style.backgroundColor = perc2color(p);
	}

	calculateValue(y) {
		const diffY = y - this.rail.children[0].getBoundingClientRect().top;
		//
		//const { min, max, step} = this.props;
		//const percent = ((max-val))/(max - min);
		//const pos = Math.floor(percent*this.rail.clientHeight) - 16;
		//this.setState({value: val, pos});
		this.setState({value: val, pos: diffY-16});
	}

	onKeyDown(e){
		
		const { keyCode } = e;
		const { min, max, step, onChange, id } = this.props;
		let curValue = this.state.value;
		switch (keyCode) {
			case 38:
			case 39:
				//Up/Right Arrow - Decrease frequency
				console.log('Up', id)
				e.preventDefault();
				curValue -= step;
				curValue = curValue < min ? min : curValue;
				onChange && onChange(id, curValue)
				break;
			case 37:
			case 40:
				//Down/Left Arrow - Increase frequency
				e.preventDefault();
				curValue += step;
				curValue = curValue > max ? max : curValue;
				onChange && onChange(id, curValue);
				break
		}
	}

	onMouseDown(e) {
		document.addEventListener('mousemove', this.onMouseMove);
		document.addEventListener('mouseup', this.onMouseUp);
		this.ismoving = true;
		this.shiftY = e.clientY - this.rail.children[0].getBoundingClientRect().top;

		console.log('onMouseDown:', e, this.shiftY);
	}

	onMouseUp(e) {
		e.preventDefault();
		document.removeEventListener('mousemove', this.onMouseMove);
		document.removeEventListener('mouseup', this.onMouseUp);
		this.ismoving = false;
		//console.log('onMouseUp:', e);
	}

	onMouseMove(e) {
		e.preventDefault();
		const r = this.rail.getBoundingClientRect();
		let diffY = e.clientY - r.top;// + this.shiftY;
		console.log(diffY, r.height);
		if(diffY >= 0 && diffY <= r.height+16){
			const { min, max, step, id, onChange} = this.props;
			const percent = (max - min)/100;
			let val = Math.floor(((max-min) * diffY)/r.height) - max;
			if(val < min) {
				val = min;
			} else if(val > max) {
				val = max;
			}
			onChange && onChange(id, val);
		}
		
	}

	onRailMouseUp(e) {
		e.preventDefault();
		const rect = this.rail.getBoundingClientRect();
		let diffY = e.clientY - rect.top;
		
		if(diffY >= 0 && diffY <= rect.height){
			const { min, max, step, id, onChange} = this.props;
			let val = (((max-min) * diffY)/rect.height) - max;
			if(val < 0){
				val = Math.floor(val);
				
			} else {
				val = Math.ceil(val);
			}
			
			if(val < min) {
				val = min;
			} else if(val > max) {
				val = max;
			}
			onChange && onChange(id, val);
		}
	}

	onTouchStart(e) {
		//console.log('onTouchStart', e);
	}

	refSetup(r) {
		this.rail = r;
	}

	componentDidMount() {
		this.calculatePos(this.props.value);
		setTimeout(()=> {
			this.rail.children[0].classList.add('animated');
		}, 0);
	}

	componentWillReceiveProps(newProps) {
		this.calculatePos(newProps.value);
	}

	render() {
		return (
			$('div', {
					class:'freq flex justsb flexc', ref: this.refSetup,
					onMouseUp: this.onRailMouseUp,
					
				}, 
				$('button', {
						class: 'knob white',
						style: {marginTop: this.state.pos},
						onKeyDown: this.onKeyDown,
						onMouseDown: this.onMouseDown,
						//onMouseUp: this.onMouseUp,
						//onMouseMove: this.onMouseMove,
						//onTouchStart: this.onTouchStart
					},
					this.state.value
				),
			)
		);
	}
};