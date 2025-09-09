import React, { useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom'
import logo from '../imgs/logo2-removebg-preview.png'
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { navlinks } from '../data/navlinks'
import {useSelector} from 'react-redux'
import { Profiledetails } from './Profiledetails';
import "../static/header.css"
import { gettags } from '../apicalls/fetchtags';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTagName } from "../slice/tagSlice";
 
const Header = () => {

  const {token} =useSelector((state)=> state.auth);
  const {profile} =useSelector((state)=> state.profile);
  // const {totalItems} =useSelector((state)=> state.cart);
  const [subCatalog,setSubCatalog]=useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("user data",profile);

  const handleTagClick = (tagId, name) => {
    dispatch(setTagName(name)); 
    navigate(`/catalog/${tagId}`); 
  };

  useEffect(() => {
    const fetchTags = async () => {
      const data = await gettags();
      setSubCatalog(data);
    };
    fetchTags();
  }, []);
  

  // console.log(subCatalog);

  return (
    <div className='header-container'>
      <div className='header'>
        <NavLink to={'/'} className='logo1'>  
          <img src={logo} alt="logo" />
        </NavLink>
        <nav className='navbar'>
          {navlinks.map((navelem,index)=>{
            return (  
              (navelem.title==="Catalog")?
                <div className='catalog' key={index}>
                  {navelem.title} 
                  <IoIosArrowDown />
                  <div className="drop-down">
                    {subCatalog.length === 0 ? (
                      <div>Loading..</div>
                    ) : (
                      subCatalog.map((subtitle, index) => (
                        <div
                          key={index}
                          className="subtitle"
                          onClick={() => handleTagClick(subtitle._id, subtitle.name)}
                        >
                          {subtitle.name}
                        </div>
                      ))
                    )}
                  </div>
                </div>
                :
                  <NavLink key={index} to={`${navelem.path}`} className={({isActive})=>isActive?"activenavlement":"navelements"}>
                    <div >{navelem.title}</div>
                  </NavLink>
            )
          })}
        </nav>
        <div className='header-rightcontainer'>
          {
            (token===null)?
            <div className='login-container'>
              <NavLink to={'/login'}>
               <button>Login</button>
              </NavLink>
              <NavLink to={'/signup'}>
               <button>SignUp</button>
              </NavLink>
            </div>  : 
              (profile.accounttype!=="educator")?
              <div className='login-container'>
                <FaShoppingCart />
                <Profiledetails/>
              </div>
              :<div className='login-container'>
                <NavLink to={'/createcourse'}>
                  <IoAddCircle />
                </NavLink>
                <Profiledetails/>
            </div>
              
          }
        </div>
      </div>
    </div>
  )
}

export default Header