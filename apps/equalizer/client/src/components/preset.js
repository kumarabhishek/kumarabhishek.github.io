/**
 * Preset Component - Provide predefined frequency bands
 */
const $ = React.createElement;
const presets = {
	rock: [-5, -2, 2, -1, 0],
	pop: [0, -4, -4, -1, 4],
	jazz: [-7, -6, -2, 2, -11],
	classic: [-3, -1, 3, -2, 2]
}

export default class Preset extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value: props.value,
			pos: 0
		}

		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		const {onPreset} = this.props;
		const btn = e.target;
		const type = btn.innerHTML.toLowerCase();
		onPreset && onPreset(presets[type]);
	}


	render() { return ( $('div', {class:'preset flex flexc marl1r'}, 
				$('label', {class: ''}, 'Preset'),
				$('div', {class:'flex flex1 flexc'}, 
					$('button', {class:'flex1', onClick: this.onClick}, 'Rock'),
					$('button', {class:'flex1', onClick: this.onClick}, 'Pop'),
					$('button', {class:'flex1', onClick: this.onClick}, 'Jazz'),
					$('button', {class:'flex1', onClick: this.onClick}, 'Classic'),
				)
			)
		);
	}
}