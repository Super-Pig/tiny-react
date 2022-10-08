/*
 * Copyright © 2020-2022 Ocean Galaxy Inc. All Rights Reserved.
 * @Description: 
 * @LastEditors: garry彭
 * @LastEditTime: 2022-10-08 14:28:26
 */
import TinyReact from "../TinyReact";

const OldVdom = <div>
    {
        new Array(3).fill(0).map((_, index) => {
            return <p key={index}>{index}</p>
        })
    }

    <h1>other1</h1>
    <h1>other2</h1>
</div>

const NewVdom = <div>
    <h1>other1</h1>
    <h2>other2</h2>
    {
        new Array(2).fill(0).map((_, index) => {
            return <p key={index}>{index}</p>
        })
    }
</div>

TinyReact.render(OldVdom, document.getElementById('root'))

setTimeout(() => {
    TinyReact.render(NewVdom, document.getElementById('root'))
}, 2000)