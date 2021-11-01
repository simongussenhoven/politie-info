import Header from "./Header"
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TopMenu from './TopMenu'
import News from './News'
import Wanted from './Wanted'
import About from './About'
import Apblist from './Apblist'




function App() {
  
  return (
    <div className="app">
      <Header/>
      <Router>
      <TopMenu/>
      
          <Route exact path="/" component={News}/>
          <Route path="/gezochte-personen/" component={Wanted}/>
          <Route path="/over-deze-pagina/" component={About}/>
          <Route path="/nationale-opsporingslijst/" component={Apblist}/>
      </Router>
    </div>
  )
}

export default App;
