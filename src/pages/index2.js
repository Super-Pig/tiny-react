import TinyReact from "../TinyReact"

function Demo() {
   return <div>
      Hello
   </div>
}

function Heart(props) {
   return <div>
      {props.title}
      <Demo />
   </div>
}

TinyReact.render(<Heart title="&hearts;"/>, document.getElementById('root'))
