import './App.css'
import PostsList from './features/diary/posts/PostsList.jsx';

function App() {
  return (
    <>
      <div className="app">
        <h1>React on Rails Blog</h1>
        <p>Find this application in client/src/App.jsx</p>

        <PostsList />
      </div>
    </>
  )
}

export default App