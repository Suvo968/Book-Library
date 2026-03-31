import './App.css';
//import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './home/Home';
import Shop from './shop/Shop';
import About from './components/About';
import Blog from './components/Blog';
import MyFooter from './components/MyFooter';
import "flowbite/dist/flowbite.min.css";
import Chatbot from './components/chatbot';

const App = () => {
  return (
    <>
      <NavBar />
      <div id="home">
        <Home />
      </div>
      <div id="shop">
        <Shop />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <Chatbot />
      <MyFooter />
      
    </>
  );
};

export default App;