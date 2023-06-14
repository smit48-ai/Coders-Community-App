import React from 'react';
import MainNavBar from '../components/MainNavbar';
import Feedpage from '../components/Feedpage';
import MenuList from '../components/MenuList';
import './Main.css';
import UserGroup from '../components/UserGroup';


function Main(){
   return <section id='Mainpage'>
                <MainNavBar fixed={1}/>
          <section className='content'>
            <MenuList/>
            <Feedpage/>
            <UserGroup/>   
         </section>
         <footer></footer>
   </section>
}

export default Main;