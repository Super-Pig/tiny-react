import TinyReact from "../TinyReact"

const virtualDOM = (
  <div className="container">
    <h1>Hello Tiny React</h1>
    <h2 data-test="test">(Coding)</h2>
    <div>
    nesting1 <div>nesting1.1</div>
    </div>
    <h3>(observation：this one will be change)</h3>
    {2 == 1 && <div>2==1</div>}
    {2 == 2 && <div>2</div>}
    <p>one paragraph</p>
    <button onClick={() => alert('hello')}>clickme</button>
    <h3>this one will be deleted</h3>
    2,3
    <input type='text' value='123' />
  </div>
)

const modifyDOM = (
  <div className="container">
    <h1>Hello Tiny React</h1>
    <h2 data-test="test123">(Coding)</h2>
    <div>
    nesting1 <div>nesting1.1</div>
    </div>
    <h3>(observation：this one will be change)</h3>
    {2 == 1 && <div>2==1</div>}
    {2 == 2 && <div>2</div>}
    <p>one modified paragraph</p>
    <button onClick={() => alert('hello!!!!')}>clickme</button>
    <input type='text' value='123' />
  </div>
)

TinyReact.render(virtualDOM, document.getElementById('root'))

setTimeout(()=> {
    TinyReact.render(modifyDOM, document.getElementById('root'))
}, 2000)