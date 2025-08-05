import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const[numAllow,setnumAllow] = useState(false)
  const[charAllow,setcharAllow] = useState(false)
  const[psw,setpsw]= useState("")

  const pswRef= useRef(null)

const pswGenerator = useCallback(()=> {
    let pass= ""
    let str= "ABCDEFGHIJLLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllow) str+= "0123456789"
    if(charAllow) str+="!@#$%&*+-_"
    for (let i = 1; i <= length; i++) {
      let char= Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setpsw(pass)
}
  , [length,numAllow,charAllow,setpsw])

   const copyPasswordToClipboard = useCallback(() => {
    pswRef.current?.select();
    pswRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(psw)
  }, [psw])

  useEffect(()=> {
    pswGenerator()
  },[length,numAllow,charAllow,pswGenerator])
  return (
    <>
    
    <div className=' w-full max-w-md mx-auto  bg-slate-700 my-10 px-4 py-3 h-36 rounded-lg text-orange-700 '>
      <h1 className='text-white text-center pb-2'>Password generator</h1>
      <div className='flex bg-gray-100 h-9 mb-4 rounded-lg '>
          <input 
          type='text'
         value={psw}
          className='w-[23rem]  pl-3 bg-slate-50'
          placeholder='password'
          readOnly
          ref={pswRef}
          />
          
        <button onClick={copyPasswordToClipboard} 
        className='bg-blue-600 text-white w-12 pl-2 '>
          copy
        </button>
      </div>
      <div className='flex text-md gap-x-2'>
        <div className='flex items-center gap-x-1'>
        <input
         type='range'
         min={1}
         max={100}
         value={length}
         className='cursor-pointer'
         onChange={(e)=>{setlength(e.target.value)}}
        />
        <label>Length: {length}</label>
        </div>
      <input
      type='checkbox'
      defaultChecked={numAllow}
      id='numberInput'
      onChange={()=>{
        setnumAllow((prev) => !prev)
      }}
      />
      <label htmlFor='numberInput'>Numbers</label>
      <div className='flex items-center gap-x-1'>
        <input type='checkbox'
      defaultChecked={charAllow}
      id='characterInput'
      onChange={()=>{
        setcharAllow((prev) => !prev)
      }}
      />
      <label htmlFor='characterInput'>Characters</label>
      </div>
      </div>
    </div>
    </>
  )
}

export default App
