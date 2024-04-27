import AddPost from './components/AddPost';
import ReadPosts from './ReadPosts';

function App() {
    return (
        <div className='mainpage'>
          <h1>Welcome to the Coding Scripting Society</h1>

          <h3>Create a Post</h3>
          <div className='add'>
                <AddPost />
            </div>

            <h2>Home Feed</h2>
            <div className='feed'>
                <ReadPosts />
            </div>
        </div>
    );
}

export default App;