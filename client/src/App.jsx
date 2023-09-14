import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import AppRoutes from './components/AppRoutes.jsx';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <h1>React on Rails Blog</h1>
        <p>Find this application in client/src/App.jsx</p>

        <NavBar />
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App
