import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import PostDetail from './Pages/PostDetails';
import Products from './Pages/Products';
import NotFound from './Pages/NotFound';
export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}