import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import logo from "../assests/logo.jpg";
import "./Navbar.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar(props) {

  return (
    <div className="Navcontainer">
      <div>
      <Link to="/"><span>Transfer</span></Link>
      </div>
      <ul>
        <li>
        <Link to="/Main"><a href="">Read</a></Link>
        </li>
        <li>
          <a href="">About Me</a>
        </li>
      </ul>
    </div>
  );
}
export default Navbar;
