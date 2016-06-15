var React = require('react');
var HTTP = require('../services/httpservice.jsx');

class Panel extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			days: [
				{date: '15. červen 2016', ico: '01d', temperature: '24°'},
				{date: '16. červen 2016', ico: '02d', temperature: '23°'},
				{date: '17. červen 2016', ico: '03d', temperature: '22°'},
				{date: '18. červen 2016', ico: '04d', temperature: '21°'},
				{date: '19. červen 2016', ico: '09d', temperature: '20°'},
			]
		}
	}

	componentWillMount() {
		HTTP.get(this.props.city).then( (data) => {
			let lastDt = 0;
			let days = [];
			for(let i = 0; i < data.list.length; i++) {
				let block = data.list[i];
				if(block.dt >= (lastDt + 3600*24)) {
					lastDt = block.dt;
					let date = new Date(block.dt * 1000);
					days.push({date: date.toLocaleDateString(), ico: block.weather[0].icon, temperature: Math.round(block.main.temp - 273.15) + '°'});
				}
			}
			this.setState({days: days});
		});
	}

	render() {

		var day = this.state.days;

		var rows = [];
		for(let i = 1; i < 5; i++) {
			let style = {backgroundColor: '#FFFFFF'};
			if(i % 2) {
				style = {backgroundColor: '#EEEEEE'};
			}

			rows.push(<tr key={i} style={style}>
				<td style={{textAlign: 'center', width: '50%'}}>{day[i].date}</td>
				<td><img src={'http://openweathermap.org/img/w/' + day[i].ico + '.png'} style={{width: 32, height: 32}} /></td>
				<td style={{paddingRight: 5}}>{day[i].temperature}</td>
			</tr>);
		}

		return(
			<div className="panel panel-default col-md-3" style={{padding: 0}}>
				<div style={{backgroundColor: this.props.color, color: '#FFFFFF', padding: 5}}>
					<h4>{this.props.city}</h4>
					<span>{day[0].date}</span>
					<div style={{textAlign: 'center'}}>
						<h1 style={{margin: 0}}>
						<img src={'http://openweathermap.org/img/w/' + day[0].ico + '.png'} style={{width: 72, height: 72}} />
						{day[0].temperature}
						</h1>
					</div>
				</div>
				<table style={{width: '100%', color: '#666666'}}>
					<tbody>
					{rows}
					</tbody>
				</table>
			</div>
		);
	}

}

module.exports = Panel;