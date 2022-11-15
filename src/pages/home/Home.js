import React, { useContext } from "react";
import "./Home.css";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import img1 from "../../image/home-pic.png"
import { UserContext } from "../../context/Context";
import Reason1 from "../../image/reason1.png"
import Reason2 from "../../image/reason2.png"
import Reason3 from "../../image/reason3.png"
import Step1 from "../../image/step1.png"
import Step2 from "../../image/step2.png"
import Step3 from "../../image/step3.png"
import StoryPic from "../../image/story-pic.png"

const Home = () => {
  
  const steps = [
    {
      name: "Sign Up",
      pic: Step1,
      desc: "Register for free & set up your profile",
    },
    {
      name: "Connect",
      pic: Step2,
      desc: "Select & Connect with matches you like",
    },
    {
      name: "Interact",
      pic: Step3,
      desc: "Start a conversation with your match",
    },
  ];
  const stories = [1,2,3];
  const {userData} = useContext(UserContext);
  return (
    <div className="home-container">
      <div className="home-container-child">
        <div className="small-screen-bg">
            <img src={img1}/>
        </div>
        <div className="home-content">
          <div>
            <div className="welcome">
              <div className="welcome-text">Welcome to</div>
              <div className="web-name">Match Maker</div>
            </div>
            <div className="brief">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna
              molestie at elementum eu.
            </div>
            {!userData ?<> <Link to="/signup">
              <Button
                bg="#EA0A84"
                color="white"
                _hover={{ bg: "white" }}
                className="register-btn"
              >
                Register Now
              </Button>
            </Link> <div className="log-link">
              Already a user?{" "}
              <Link to="/login">
                <span> Login</span>
              </Link>
            </div></>:<Link to="/allusers">
              <Button
                bg="#EA0A84"
                color="white"
                _hover={{ bg: "white" , borderColor: "#EA0A84" , color: "#EA0A84"}}
                className="register-btn"
              >
                See all Users
              </Button>
            </Link>}
          </div>
        </div>
      </div>

      <div className="about-container" id="about">
        <div className="about-head">
          About Us
        </div>
        <div className="about-desc">
          MatchMaker is a matchmaking service created for parents who are looking for a life partner for their loved ones. Unlike other Matrimonial services, we focus on providing detailed family and background information to help you take the next step with confidence. With over 80+ community sites, you can find a match from your own community. MatchMaker is part of Shaadi.com (sometimes mis-spelt as Shadi), the World's No. 1 Matchmaking service.
        </div>
        <div className="story">
          <div className="story-head">
            Over 1500+ Happy Stories
          </div>
          <div className="stories">
            {
              stories.map( (i) => 
                <div className="story-detail">
                  <img src= {StoryPic} alt ="story-pic"/>
                  <div className="story-content">Rohan 💓 Saloni</div>
                </div>
              )
            }
          </div>
        </div>
      </div>

      <div className="services" id ="services">
        <div className="steps">
          <div className="heading">
            Find Your Special Someone
          </div>
          <div className="ways">
            {
              steps.map((elem) => {
                return (
                  <div className="step">
                    <div className="image">
                      <img src={elem.pic} alt={elem.pic}/>
                    </div>
                    <div className="name">
                      {elem.name}
                    </div>
                    <div className="desc">
                      {elem.desc}
                    </div>
                  </div>
                )
              })  
            }
          </div>
        </div>
        <div className="reason-container">
          <div className="heading">Why MatchMakers ? </div>
          <div className="reasons">
            <div className="reason">
              <img src = {Reason1} alt = "reason1"/>
              <div className="desc">Contact genuine profiles with 100% verified </div>
            </div>
            <div className="reason">
              <img src = {Reason2} alt = "reason2"/>
              <div className="desc">Most trusted matrimonail website </div>
            </div>
            <div className="reason">
              <img src = {Reason3} alt = "reason2"/>
              <div className="desc">1500+ successful marriages. </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;