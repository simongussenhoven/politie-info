import Header from "./Header"
import "bootstrap/dist/css/bootstrap.min.css";
import SubMenu from "./SubMenu"
import React, {useState, useEffect} from 'react'
import Loading from './Loading'


function App() {
  const [info, setInfo ] = useState("No info selected")
  
  const handler = () =>
  fetch("/.netlify/functions/police-general", { headers: { accept: "Accept: application/json" } })
    .then(x => x.json())
    .then(data => setInfo(data))
    .catch(error => console.log(error))
    .then(console.log(info))
  return (
    <div className="App">
      <Header/>
      <div className="container">
        <button onClick={handler}>Click me</button>
        <p></p>
      </div>
    </div>
  );
}

export default App;
