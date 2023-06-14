import React from 'react';
import Navbar from '../components/Navbar';
import Intro from "../components/Intro";
import './Home.css';
import Main from './Main';
import { useSelector } from 'react-redux';




function Home(props){
    const user=useSelector(state=>state.user);
   return <div className="homescreen">
          <Navbar />
          <Intro/>
          {/* <Main/> */}
      </div>
}

export default Home;