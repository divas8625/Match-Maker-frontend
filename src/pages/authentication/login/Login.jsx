import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { logUser } from "../../../service/api";
import "./Login.css";
import { UserContext } from "../../../context/Context";
import logPic from "../../../image/log-pic.png"
const Login = ({ socket }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const userLog = async (e) => {
    e.preventDefault();
    const obj = { email: email, password: password };
    const data = await logUser(obj);
    
    if (data.status === 200) {
      window.localStorage.setItem("userInfo", JSON.stringify(data.data.user));
      setUserData(data.data.user);
      socket?.emit("setup", { sender: data.data.user });
      

      history.replace("/");
    } else window.alert("Invalid Credentials!");
  };

  return (
    <>
      
      <div className="log-container">
        
        <div className="log-content">
          <div>
            <div className="log-text">Login to</div>
            <div className="wel-text">Match Maker</div>
            <form>
            <div className="input-area">
            <div className="input-label">Email</div>
            <input type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}/>
            <div className="input-label">Password</div>
            <input type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPass(e.target.value)}/>
            </div>
            <button className="log-btn" onClick={(e) => userLog(e)}>Log In</button>
            </form>
          </div>
        </div>
        <div className="log-img"><img src = {logPic} alt = "login-pic"/></div>
      </div>
    </>
  );
};

export default Login;