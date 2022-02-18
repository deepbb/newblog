import './App.css';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import Write from './pages/Write/Write';
import Home from './pages/Home/Home';
import Single from './pages/Single/Single';
import Topbar from './Topbar/Topbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Singlepost from './Singlepost/Singlepost';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react';
import { AuthContext } from "./Context/AuthContext"

function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router basename='/'>
      <Topbar />
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/register" element={user ? <Home /> : <Register />} />
     <Route path="/login" element={user ? <Home /> : <Login />} />
      <Route path="/write" element={user ?<Write /> : <Register />} />
      <Route path="/settings" element={user ? <Settings /> : <Register />}/>
      <Route path="/singlepost" element={user && <Singlepost />}/>
      <Route path="/post/:postid" element={<Single /> }/>
    
    </Routes>
    <ToastContainer position="top-center"/>
    </Router>
  );
}

export default App;
