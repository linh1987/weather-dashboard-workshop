import Inferno from 'inferno';
import Component from 'inferno-component';
import '../css/image.scss';
import * as images from '../images/';


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
        let style = {
            width: '200px',
            margin: '10px 5px 0px 5px'
        };
        return (<div>
            <span class="clock-span">{time}</span>
            {images.forEach(function (image) {
                <img src={image} />
            }, this)
            }
        </div>);
    }
}
