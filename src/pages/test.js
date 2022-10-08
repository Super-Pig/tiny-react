/*
 * Copyright © 2020-2022 Ocean Galaxy Inc. All Rights Reserved.
 * @Description: 
 * @LastEditors: garry彭
 * @LastEditTime: 2022-10-08 21:06:24
 */
import TinyReact from "../TinyReact";

// const C = ({name}) => {
//     return <h1>{name}</h1>
// }

class C extends TinyReact.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <h1>
            {this.props.name}
        </h1>
    }
}

TinyReact.render(<C name='garry' />, document.getElementById('root'))

setTimeout(() => {
    TinyReact.render(<C name='peng' />, document.getElementById('root'))
}, 2000);