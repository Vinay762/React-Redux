import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from './redux/postSlice';

function App() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.post);



  if (data.loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <button onClick={() => dispatch(getAllPosts())}>Get All Posts</button>
      {data.posts.map((post) => (
        <h1 key={post.id}>{post.title}</h1>
      ))}
    </>
  );
}

export default App;
