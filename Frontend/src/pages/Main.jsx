import React from 'react';
import MainNavBar from '../components/MainNavbar';
import Feedpage from '../components/Feedpage';
import MenuList from '../components/MenuList';
import './Main.css';
import UserGroup from '../components/UserGroup';
import { Link } from "react-router-dom";
//icons
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import StyleIcon from "@mui/icons-material/Style";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";


function Main(){
   return <section id='Mainpage' >
                <MainNavBar fixed={1}/>
          <section className='content bg-slate-200 pt-[100px] mx-auto'>
            <div className='min-w-fit md:min-w-[250px] m-5 mt-0 md:pl-10 font-Poppins max-lg:hidden'>
          <ul>
          <li>
            <Link
              to="/Main"
              className="flex gap-2 p-2 hover:bg-slate-300 rounded-md transition-bg duration-200"
            >
              <HomeIcon />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Post"
              className="flex gap-2 p-2 hover:bg-slate-300 rounded-md transition-bg duration-200"
            >
              <CreateIcon />
              Create Post
            </Link>
          </li>
          <li>
            <Link
              to="/SavePosts"
              className="flex gap-2 p-2 hover:bg-slate-300 rounded-md transition-bg duration-200"
            >
              <ListIcon />
              Saved list
            </Link>
          </li>
          <li className="flex gap-2 p-2 hover:bg-slate-300 rounded-md transition-bg duration-200">
            <StyleIcon />
            Tags
          </li>
          <li className="flex gap-2 p-2 hover:bg-slate-300 rounded-md transition-bg duration-200">
            <PhoneIcon />
            Contact me
          </li>
        </ul>
        </div>
            <Feedpage />
            <UserGroup className='max-md:hidden'/>   
         </section>
         <footer></footer>
   </section>
}

export default Main;