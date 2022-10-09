/*
 * Copyright © 2020-2022 Ocean Galaxy Inc. All Rights Reserved.
 * @Description: 
 * @LastEditors: garry彭
 * @LastEditTime: 2022-10-09 16:55:09
 */
import TinyReact from "../TinyReact";


class C extends TinyReact.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [{
                key: 0,
                name: 'a'
            }, {
                key: 1,
                name: 'b'
            }]
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            data: [{
                key: 1,
                name: 'c'
            }, {
                key: 2,
                name: 'd'
            }, {
                key: 0,
                name: 'b'
            }]
        })
    }

    render() {
        return <div>
            {
                this.state.data.map(({ key, name }) => (
                    <p key={key}>
                        {key}: {name}
                    </p>
                ))
            }

            <button onClick={this.handleClick}>click</button>
        </div>
    }
}

TinyReact.render(<C />, document.getElementById('root'))

