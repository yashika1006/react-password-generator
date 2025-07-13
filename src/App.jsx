import { useCallback, useState, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [ pass , setPass ] = useState("")
  const [number , setNumber] = useState(false)
  const [ char , setChar ] = useState(false)
  const [length , setLength ] = useState(8)
  const inputRef = useRef(null);

  
  const makePass = useCallback ( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if ( number ) str+= "0123456789"
    if ( char ) str+= "+=-_$%&*@"
    for (let i=1 ; i <= length ; i++){
      let index = Math.floor(Math.random() * str.length )
      pass += str[index]
    }
    setPass(pass)
  }
  ,[number , char , setPass , length])

  useEffect(() => {
    makePass();
  }, [number, char, length]);
  
  return (
  <>
    <div>
      <h3 className='text-center text-4xl py-8 bg-gray-100 rounded-lg mx-36 text-gray-700 shadow-sm'>
        Password Generator
      </h3>

      <div className='py-20 flex flex-col items-center bg-gray-200 mx-36 rounded-lg'>
        <div>
          <input
            className="py-3 border-gray-400 border-2 rounded-lg px-40 focus:outline-none focus:border-blue-500 text-gray-800"
            type="text" readOnly ref={inputRef} value={pass}
          />

          <button 
          className='border-2 border-gray-400 rounded-lg m-2 text-gray-700 hover:bg-gray-300 px-4 py-2'
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.select(); 
                navigator.clipboard.writeText(inputRef.current.value)
              }
            }}>
            Copy
          </button>
        </div>

        <div className='flex items-center gap-6 mt-6'>
          <label className="text-gray-700 text-lg">
            <input
              min="4"
              max="32"
              value={length}
              type="range"
              name=""
              id=""
              onChange={(e) => setLength(e.target.value)}
              className="accent-blue-500"
            />
            Length: {length}
          </label>

          <label className="text-gray-700 text-lg">
            <input type="checkbox" name="" id="" className="accent-blue-500" 
            onChange={ () => setNumber((prev) => !prev)} /> Numbers
          </label>

          <label className="text-gray-700 text-lg">
            <input type="checkbox" name="" id="" className="accent-blue-500" 
            onChange={ () => setChar((prev) => !prev)}/> Characters
          </label>
        </div>
      </div>
    </div>
  </>
);
}

export default App
