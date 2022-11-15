import "./App.css";
import { useEffect, useState, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { io } from "socket.io-client";

import Login from "./pages/authentication/login/Login";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/authentication/register/Signup";
import Update from "./pages/profile/Update";
import Navbar from "./components/navbar/Navbar";
import AllUsers from "./pages/allusers/AllUsers";
import DetailView from "./pages/detail/DetailView";
import LikeCard from "./components/likecard/LikeCard";
import LikeCards from "./pages/likecards/LikeCards";
import LikedByCards from "./pages/likecards/LikedByCards";
import Matches from "./pages/matches/Matches";
import MatchesCard from "./components/matches-card/MatchesCard";
import { ChakraProvider } from "@chakra-ui/react";
import { UserContext } from "./context/Context";
import { getUser } from "./service/api";
import Home from "./pages/home/Home";

function App() {
  let selectedChatCompare;
  const [socket, setSocket] = useState(null);

  const { userData, setUserData, selectedChat, setMessages, messages,setArrivalMessage ,setNotObj} =
    useContext(UserContext);
  
  useEffect(() => {
    if (socket === null) {
      setSocket(io("http://localhost:8000"));
    }
    if (socket) {
      if (userData) socket.emit("setup", { sender: userData });
      socket.on("getNotification", async ({ sender, type }) => {
        const data = await getUser();
        setUserData(data.data);
      });
    }
  },);

  useEffect(() => {
    if (!socket) return;
    socket.on("new message", ({content,sender}) => {
      // console.log(content,"arrivalmeassage");
      // console.log(selectedChat,"selectedChat")
      // const rId = userData?._id;
      // const obj = {
      //   senderName : sender.name,
      //   senderId : sender.id,
      //   receiverId : rId,
      //   picture : sender.picture,
      // }
      // console.log(obj,"obj");
      // // if(obj.senderName)
      //   setNotObj(obj);
      setArrivalMessage(content);
    });
  });

  return (
    <>
      <ChakraProvider>
          <Navbar socket={socket}/>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route  path="/userprofile">
          {/* <Navbar scoket={socket}/> */}
          {!userData ? <Redirect to = "/"/>: 
          <Profile socket={socket} /> }
         
        </Route>
        <Route path="/update/:id">
          {/* <Navbar socket={socket} /> */}
          <Update />
        </Route>
        <Route path="/allusers">
          {/* <Navbar socket={socket} /> */}
          {!userData ? <Redirect to = "/"/>: 
          <AllUsers socket={socket} /> }
          
        </Route>
        <Route path="/detailview/:id">
          {/* <Navbar socket={socket} /> */}
          <DetailView socket={socket} />
        </Route>
        <Route path="/signup">
          {userData ? <Redirect to = "/"/>:<Signup /> }
          {/* <Signup /> */}
        </Route>
        <Route path="/login">
        {userData ? <Redirect to = "/"/>:<Login socket={socket} /> }
          
        </Route>
       
        <Route path="/like">
          {/* <Navbar socket={socket} /> */}
          <LikeCards />
        </Route>
        <Route path="/likedby">
          {/* <Navbar socket={socket} /> */}
          <LikedByCards />
        </Route>
        <Route path="/matches">
          {/* <Navbar socket={socket} /> */}
          {!userData ? <Redirect to = "/"/>:<Matches socket={socket} selectedChatCompare={selectedChatCompare} />}
          
        </Route>
        <Route path="/matchcard">
          <MatchesCard />
        </Route>
      </ChakraProvider>
    </>
  );
}

export default App;