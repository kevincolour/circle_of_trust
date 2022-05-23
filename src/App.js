import './App.css';
import io from 'socket.io-client'
import React, { useEffect, useState } from 'react';
import {ActionButton} from '@fluentui/react'
import {Counter} from './gameLoop'


function addEventListeners(setCoord,socket) {
  
  document.body.addEventListener("mousemove", (mouse) => {
    const coords = [mouse.clientX,mouse.clientY];
    setCoord(coords)
    socket.emit('playerMove', coords);
  },false)
}

function App() {
  const [socket, setSocket] = useState(null);
  const [resolvePlayers, setresolvePlayers] = useState(null);
  const [playerCoord, setPlayerCoord] = useState([0,0]);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    addEventListeners(setPlayerCoord,newSocket);
    setSocket(newSocket);
    
    return () => newSocket.close();
  }, [setSocket]);


  socket && socket.on('userClick', function(msg) {
    console.log(msg + "clickedemit")
    setresolvePlayers(msg);
  });
  socket && socket.on('playerMove', function(msg) {
    console.log(msg + "moved")
    setPlayerCoord(msg.data);
  });


  return (
    <div className="App">
      <div style = {{position:"absolute", width:30, height:30, background: "blue", left: playerCoord[0], top: playerCoord[1]}}>

      </div>

    {resolvePlayers && <div>SOMEBODY DID SOMETHING</div>}
    <ActionButton style = {{width: 300, height:300,background:"red"}} onClick = {() =>{
        if (true) {
          socket.emit('clicked', "testVal");
        }
      } 
    }>
      CLICK ME 
    </ActionButton>
      <header className="app-header">
        React Chat
      </header>
      { socket ? (
        <div className="chat-container">
          test
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    {/* <Counter/> */}
    </div>
  );
}

export default App;
