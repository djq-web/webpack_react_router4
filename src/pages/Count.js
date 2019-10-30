import React, {Component} from 'react';
import '../assets/count.less';
export default class Count extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render() {
        return (
            <div>
                <p className="desrciption">当前count值：{this.state.count}</p>
                <button onClick={() => this.handleClick()} className="button">增加1</button>
            </div>
        )
    }
}