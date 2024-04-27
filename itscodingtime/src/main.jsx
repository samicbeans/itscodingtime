
import PostDetail from './routes/PostDetail.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './routes/Layout.jsx';
import NotFound from './routes/NotFound.jsx';
import EditPost from './routes/EditPost'

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index={true} element={<App />} />
      <Route index={false} path="/viewpost/:postId" element={<PostDetail />} />
      <Route path="/editpost/:postId" element={<EditPost />} />
      <Route path="*" element={ <NotFound /> }/>
    </Route>
  </Routes>
</BrowserRouter>
)