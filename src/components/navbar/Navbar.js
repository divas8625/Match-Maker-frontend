import { React, useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import {HashLink} from "react-router-hash-link"; 
import { Icon, createIcon } from "@chakra-ui/react";
import { UserContext } from "../../context/Context";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { getUser , removeNotif , clearNotification , logout } from "../../service/api";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Navpic from "../../image/fav-icon.png"

const Navbar = ({ socket }) => {

  const history = useHistory();

  const { userData, setUserData } = useContext(UserContext);
  const [notification, setNotification] = useState(0);
  const [notlen, setNotlen] = useState(0);


  useEffect(() => {
    if(!userData)
      history.replace("/");
    else
    setNotlen(userData?.notifications?.length);
  }, [userData]);

  //Vertical Navbar
  const verticalNav = (e) => {
    const nav = document.querySelector(".nav-links-horizontal");
    nav.classList.toggle("responsive");
   
  };
  
  //Reading Notifications
  const handleRead = async (notif , id) => {
    const notification = notif;
    const data = await removeNotif(notif , id);
    // console.log(data);
    setUserData(data.data);
    history.push(`/detailview/${notification._id}`);
    window.location.reload(true);
  }

  //CLear All Notifications
  const handleClearNotification = async () => {
    const data = await clearNotification({id: userData._id});
    setUserData(data.data);
  } 
  const handleNavbarRes=()=>{
    const nav = document.querySelector(".nav-links-horizontal");
    nav.classList.remove("responsive");
  }
  //logout functionality
  const handleLogout = async () => {
    // console.log("clicked")
    const data = await logout();
    window.localStorage.clear();
    setUserData(null);
    history.replace("/login");
  };

  return (
    <div>
      <header>
        <div className="navbar">
        
          <div className="help" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <img style={{marginLeft: "5px"}} src={Navpic} alt = "nav-pic"className="nav-pic"/>
          <div style={{display: "flex" , flexDirection: "row"}}>
            {!userData?"": 
            <div className="bell-small-screen" style={{display: "flex" , flexDdirection: "row"}}>
                {/* <li><img src={Navpic} alt="nav-pic" className="nav-pic" /></li> */}

                  <Menu isLazy closeOnSelect matchWidth>
                    <MenuButton>
                      <BellIcon w={8} h={8} />{" "}
                    </MenuButton>{" "}
                    <MenuList>
                      {notlen > 3 ? (
                        <MenuItem
                          minH="40px"
                          minW="300px"
                          onClick={() =>
                            handleRead(userData?.notifications[3], userData._id)
                          }
                        >
                          {" "}
                          <Avatar
                            size="xs"
                            name={userData?.notifications[3]?.name}
                            src={userData?.notifications[3]?.picture}
                            mr={3}
                          />
                          {userData?.notifications[3]?.message}
                        </MenuItem>
                      ) : (
                        ""
                      )}{" "}
                      {notlen > 2 ? (
                        <MenuItem
                          minH="40px"
                          minW="300px"
                          onClick={() =>
                            handleRead(userData?.notifications[2], userData._id)
                          }
                        >
                          {" "}
                          <Avatar
                            size="xs"
                            name={userData?.notifications[2]?.name}
                            src={userData?.notifications[2]?.picture}
                            mr={3}
                          />
                          {userData?.notifications[2]?.message}
                        </MenuItem>
                      ) : (
                        ""
                      )}{" "}
                      {notlen > 1 ? (
                        <MenuItem
                          minH="40px"
                          minW="300px"
                          onClick={() =>
                            handleRead(userData?.notifications[1], userData._id)
                          }
                        >
                          {" "}
                          <Avatar
                            size="xs"
                            name={userData?.notifications[1]?.name}
                            src={userData?.notifications[1]?.picture}
                            mr={3}
                          />
                          {userData?.notifications[1]?.message}
                        </MenuItem>
                      ) : (
                        ""
                      )}{" "}
                      {notlen > 0 ? (
                        <MenuItem
                          minH="40px"
                          minW="300px"
                          onClick={() =>
                            handleRead(userData?.notifications[0], userData._id)
                          }
                        >
                          {" "}
                          <Avatar
                            size="xs"
                            name={userData?.notifications[0]?.name}
                            src={userData?.notifications[0]?.picture}
                            mr={3}
                          />
                          {userData?.notifications[0]?.message}{" "}
                        </MenuItem>
                      ) : (
                        "No Notification"
                      )}{" "}
                      {notlen > 4 ? <MenuItem>view More</MenuItem> : ""}{" "}
                      {notlen > 0 ? (
                        <MenuItem onClick={() => handleClearNotification()}>
                          Clear Notifications
                        </MenuItem>
                      ) : (
                        ""
                      )}
                    </MenuList>{" "}
                  </Menu>{" "}

                <span
                  style={{
                    background: "#EA0A84",
                    // padding: "5px",
                    position: "relative",
                    right: "20px",
                    bottom: "8px",
                    borderRadius: "5162px",
                    fontSize: "15px",
                    width: "25px",
                    height: "25px",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {notlen}
                </span>
              </div>
            }
            
            <div
              className="icon"
              onClick={(e) => {
                verticalNav(e);
              }}
              style={{
                paddingRight: "1rem",
              }}
            >
              <i
                className="fa fa-bars"
                style={{
                  fontSize: "3rem",
                  color: "#EA0A84;",
                }}
              ></i>{" "}
            </div>{" "}
          </div>
        </div>

          <div className="nav-links-horizontal">
            <ul
              className="links-horizontal"
              style={{
                margin: "0",
                padding: "0",
              }}
            >
              
              <li onClick={()=>{handleNavbarRes()}}>
                <Link to="/">
                  <span className="home-span"> Home </span>{" "}
                </Link>{" "}
              </li>{" "}
              {/* <li>
                <Link to="/matches">
                  <span className="services"> Matches </span>{" "}
                </Link>{" "}
              </li>{" "} */}
                

              <li onClick={()=>{handleNavbarRes()}}>
                <HashLink to="#about">
                  <span className="aboutUs"> About Us </span>{" "}
                </HashLink>{" "}
              </li>{" "}

              <li onClick={()=>{handleNavbarRes()}}>
                <HashLink to ="#services"
                  >
                  <span className="services" > Services </span>{" "}
                </HashLink>{" "}
              </li>{" "} 
              
              <li onClick={()=>{handleNavbarRes()}}>
                <Link to="#">
                  <span className="contactUs"> Contact Us </span>{" "}
                </Link>{" "}
              </li>{" "}
              {!userData?"":<li className="bell-large-screen">
                {" "}
                {/* <NotificationsNoneIcon
                              className="bell-small-screen"
                              fontSize: "large"
                              style={{fontSize: "large"}}
                            /> */}{" "}
                <Menu isLazy closeOnSelect matchWidth>
                  <MenuButton>
                    <BellIcon w={8} h={8} />{" "}
                  </MenuButton>{" "}
                  <MenuList>
                    {notlen > 3 ? (
                      <MenuItem
                        minH="40px"
                        minW="300px"
                        onClick={() =>
                          handleRead(userData?.notifications[3], userData._id)
                        }
                      >
                        {" "}
                        <Avatar
                          size="xs"
                          name={userData?.notifications[3]?.name}
                          src={userData?.notifications[3]?.picture}
                          mr={3}
                        />
                        {userData?.notifications[3]?.message}
                      </MenuItem>
                    ) : (
                      ""
                    )}{" "}
                    {notlen > 2 ? (
                      <MenuItem
                        minH="40px"
                        minW="300px"
                        onClick={() =>
                          handleRead(userData?.notifications[2], userData._id)
                        }
                      >
                        {" "}
                        <Avatar
                          size="xs"
                          name={userData?.notifications[2]?.name}
                          src={userData?.notifications[2]?.picture}
                          mr={3}
                        />
                        {userData?.notifications[2]?.message}
                      </MenuItem>
                    ) : (
                      ""
                    )}{" "}
                    {notlen > 1 ? (
                      <MenuItem
                        minH="40px"
                        minW="300px"
                        onClick={() =>
                          handleRead(userData?.notifications[1], userData._id)
                        }
                      >
                        {" "}
                        <Avatar
                          size="xs"
                          name={userData?.notifications[1]?.name}
                          src={userData?.notifications[1]?.picture}
                          mr={3}
                        />
                        {userData?.notifications[1]?.message}
                      </MenuItem>
                    ) : (
                      ""
                    )}{" "}
                    {notlen > 0 ? (
                      <MenuItem
                        minH="40px"
                        minW="300px"
                        onClick={() =>
                          handleRead(userData?.notifications[0], userData._id)
                        }
                      >
                        {" "}
                        <Avatar
                          size="xs"
                          name={userData?.notifications[0]?.name}
                          src={userData?.notifications[0]?.picture}
                          mr={3}
                        />
                        {userData?.notifications[0]?.message}{" "}
                      </MenuItem>
                    ) : (
                      "No Notification"
                    )}{" "}
                    {notlen > 4 ? <MenuItem>view More</MenuItem> : ""}{" "}
                    {notlen > 0 ? (
                      <MenuItem onClick={() => handleClearNotification()}>
                        Clear Notifications
                      </MenuItem>
                    ) : (
                      ""
                    )}
                  </MenuList>{" "}
                </Menu>{" "}
                <span
                  style={{
                    background: "#EA0A84",
                    padding: "5px",
                    position: "relative",
                    right: "20px",
                    bottom: "8px",
                    borderRadius: "5162px",
                    fontSize: "15px",
                    width: "40px",
                    textAlign: "center",
                    fontWeight: "500",
                    color: "white",
                  }}
                >
                  {notlen}
                </span>
              </li>}
              <li>
                {" "}
                {!userData ? (
                  <Link to="/login">
                    <p className="login-span" onClick={()=>{handleNavbarRes()}}> Login </p>{" "}
                  </Link>
                ) : (
                  <>
                    <Menu maxW="15px">
                      <MenuButton>
                        <Avatar
                          size="md"
                          name={userData.name}
                          src={userData.picture}
                          // mr={3}
                        />
                        <ChevronDownIcon h={10} w={10} />
                      </MenuButton>
                      <MenuList maxW="inherit">
                        <MenuItem maxW="inherit" onClick={()=>{handleNavbarRes()}}>
                          <Link to="/userprofile">Your Profile</Link>
                        </MenuItem>
                        <MenuItem maxW="inherit" onClick={()=>{handleNavbarRes()}}>
                          <Link to="/matches">Your Matches</Link>
                        </MenuItem>
                        <MenuItem maxW="inherit" onClick={() =>{handleNavbarRes();handleLogout()}} >
                          Logout
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    {/* <Link to="/login" onCLick={() => handleLogout()}>
                      <p className="login-span"> Logout </p>{" "}
                    </Link>{" "} */}
                  </>
                )}{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
      </header>{" "}
    </div>
  );
};

export default Navbar;