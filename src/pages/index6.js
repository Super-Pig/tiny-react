import TinyReact from "../TinyReact";

const states = []
const setters = []
let stateIndex = 0
let depsIndex = 0

const render = () => {
    stateIndex = 0
    depsIndex = 0

    TinyReact.render(<App />, document.getElementById('root'))
}

const createSetter = index => {
    return newState => {
        states[index] = newState

        render()
    }
}

const useState = (initialState) => {
    const state = states[stateIndex] = (states[stateIndex] || initialState)
    const setter = setters[stateIndex] = (setters[stateIndex] || createSetter(stateIndex))

    stateIndex++

    return [state, setter]
}


const didMount = []
const didUpdate = []
let prevDepsArray = []

const useEffect = (callback, depsArray) => {
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new Error('useEffect 函数的第一个参数必须是函数')
    }

    if (depsArray === undefined) {
        callback()
    } else {
        if (Object.prototype.toString.call(depsArray) !== '[object Array]') {
            throw new Error('useEffect 函数的第二个参数必须是数组')
        }

        const prevDeps = prevDepsArray[depsIndex]

        // 将当前的依赖值和上一次的依赖值做对比，如果有变化，调用callback
        const hasChanged = prevDeps
            ? depsArray.every((dep, index) => dep === prevDeps[index]) === false
            : true

        if (hasChanged) {
            callback()
        }

        prevDepsArray[depsIndex++] = depsArray
    }
}

function App() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('garry')

    useEffect(() => {
        console.log('mounted')
    }, [])

    useEffect(() => {
        console.log('hello')
    }, [name])

    useEffect(() => {
        console.log('world')
    }, [count])

    return <div>
        <p>Count: {count} <button onClick={() => setCount(count + 1)}>+1</button></p>
        <p>Name: {name} <button onClick={() => setName('Penggan')}>change</button></p>
    </div>
}

render()