import Navbar from './Navbar'
import Home from './Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Create from './Create';
import SpacecraftDetails from './SpacecraftDetails';
import NotFound from './NotFound';

function App() {


  const url = 'http://localhost:5000/spacecrafts'
  return (
    <Router>
      <div className="App">
         <Navbar />
        <div className="content">
          <Routes>
             <Route path='/' element={<Home url={url}/>} />
              <Route path='/create' element={<Create url={url}/>} />
              <Route path='/spacecraft/:id' element={<SpacecraftDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;