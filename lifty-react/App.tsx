import {Component} from "react";
import * as tf from '@tensorflow/tfjs';

import Navigation from './src';

export default class App extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            isTfReady: false,
        };
    }

    async componentDidMount() {
        await tf.ready();
        this.setState({ isTfReady: true });
    }

    render() {
        return <Navigation />;
    }
}
