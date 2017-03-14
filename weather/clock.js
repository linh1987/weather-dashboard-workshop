import Inferno from 'inferno';
import Component from 'inferno-component';
import '../css/clock.scss';
import clockImage from '../images/clock-128.png';

export default class Clock extends Component {
    constructor() {
        super();
        // set initial time:
        this.state = {
	        time: Date.now()
        };
    }

    componentDidMount() {
        // update time every second
        this.timer = setInterval(() => {
            this.setState({ time: Date.now() });
        }, 1000);
    }

    componentWillUnmount() {
        // stop when not renderable
        clearInterval(this.timer);
    }

    render() {
        let time = new Date(this.state.time).toLocaleTimeString();
        return (
            <div>
                <span>{ time }</span>
                <img src={clockImage}/>
            </div>
        );
    }
}
