import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [messages,setMessages]=useState("")
  const [sendMessage,setSendmessage]=useState("")
  useEffect(()=>{
   const socket=new WebSocket('ws://localhost:8080')
   socket.onopen=()=>{
    console.log('connected')
    setSocket(socket)
   }
   socket.onmessage=(message)=>{
    console.log('Recive message is' ,message.data)
    setMessages(message.data)
   }
  },[])
  if(!socket){
    return (
      <h1>loding</h1>
    )
  }

  return (
    <>
    <input type="text" 
      onChange={(e)=>setSendmessage(e.target.value)}
    />
    <button 
     onClick={()=>socket.send(sendMessage)}
    >click</button>
      {
        messages
      }
    </>
  )
}

export default App
