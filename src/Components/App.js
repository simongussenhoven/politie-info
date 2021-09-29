import Header from "./Header"
import "bootstrap/dist/css/bootstrap.min.css";
import SubMenu from "./SubMenu"
import React, {useState, useEffect} from 'react'
import Loading from './Loading'


function App() {
  const [isLoading, setLoading] = useState(true)
  const [apb, setApb ] = useState([])
  useEffect(() => {
    fetch(
      'https://api.politie.nl/v4/gezocht/gezochtepersonen?language=nl&radius=5.0&maxnumberofitems=10&offset=0',
      {
        method: "get",
        "Access-Control-Allow-Origin": "*",
        headers: {
          'Content-Type': 'application/json'
        }, 
      }
    )
  .then(res => console.log(res))

    .catch (error => console.log(error));
  },[]);
  return (
    <div className="App">
      <Header/>
      <SubMenu/>
      {isLoading ? <p>Loading</p> : <p>Loaded</p>}
    </div>
  );
}

export default App;
