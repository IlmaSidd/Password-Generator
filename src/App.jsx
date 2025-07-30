import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState()
  const [character, setCharacter] = useState()
  const [password, setPassword] = useState()

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) {
      str += "1234567890"
    }
    if(character){
      str += "!@#$%^&*-_=+[]`~{}"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length )
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length,number, character, setPassword])

  const refPassword = useRef(null)

  const copyPassword = useCallback(() => {
    refPassword.current?.select();                        //select all 
    refPassword.current?.setSelectionRange(0,101);       //can also give the range of selection
    window.navigator.clipboard.writeText(password)           
  }, [password])

  useEffect (() => {
      passwordGenerator()
  }, [length, number, character, passwordGenerator])


return(
  <>
  <div className="w-full max-w-2xl  mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className='text-white text-center my-3 text-3xl'>Password Generator</h1>
    <div className='flex shadow rounded-lg font-extrabold overflow-hidden mb-6 bg-white'>
      <input 
      type="text" 
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={refPassword}
      />
      <button
      onClick={copyPassword}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
    </div>
    <div className='flex text-sm gap-x-6 m-6'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}} 
        />
        <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={number}
        id='numberInput'
        onChange={() => {
          setNumber((prev) => !prev);
          }} 
        />
        <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={character}
        id='characterInput'
        onChange={() => {
          setCharacter((prev) => !prev);
        }} />
        <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
  </div>
  </>
)
}

export default App
