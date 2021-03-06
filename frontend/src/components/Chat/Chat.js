import React , {useState,useEffect} from 'react'
import queryString from "query-string"
import io from "socket.io-client"
import "./styles.css"
import Infobar from "../Infobar/Infobar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"

let socket;

function Chat({location}) {

    const [name,setName] = useState("")
    const [room,setRoom] = useState("")
    const ENDPOINT  = 'http://localhost:5000'
    const [message,setMessage] = useState('')
    const [messages,setMessages] = useState([])

    useEffect(()=>{
        const {name , room} = queryString.parse(location.search)
        socket = io(ENDPOINT , {transports: ['websocket', 'polling', 'flashsocket']});
        
        setName(name)
        setRoom(room)
       
        socket.emit("join" , {name,room} , () =>
        {

        })

        return () =>
        {
            socket.emit("disconnect")
            socket.off()
        }

    } , [ENDPOINT , location.search])

    useEffect(() =>
    {
        socket.on("message" , (message) =>
        {
            setMessages([...messages , message])
        })
    },[messages])

    const sendMessage = (e) =>
    {
        e.preventDefault()
        if(message)
        {
            socket.emit("sendMessage" , message , () => setMessage(""))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat
 