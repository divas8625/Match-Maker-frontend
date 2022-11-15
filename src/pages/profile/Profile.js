import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { getUser } from "../../service/api";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { deleteUser } from "../../service/api";
import Update from "./Update";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/Context";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import MatchesCard from "../../components/matches-card/MatchesCard";
import Matches from "../matches/Matches";

const initial = {
  name: "",
  email: "",
  mobile: "",
  dob: "",
  gender: "",
  address: "",
  religion: "",
  mothertongue: "",
  description: "",
  picture: "",
};

const Profile = ({ socket }) => {
  // const {user} = useContext(UserContext);
  const history = useHistory();
  const [liked, setLiked] = useState([]);
  const [likedby, setLikedby] = useState([]);
  const [user, setUser] = useState(initial);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    // const like = JSON.parse(window.localStorage.getItem("userInfo"));
    const like = userData;
    setLiked(like.liked);
    setLikedby(like.likedby);
    setUser(like);
  }, [userData]);

  const handleDelete = async () => {
    const data = await deleteUser();
    window.localStorage.clear();
    history.push("/register");
  };

  const colors = useColorModeValue(
    ["red.50", "teal.50"],
    ["red.900", "teal.900"]
  );

  const [tabIndex, setTabIndex] = React.useState(0);
  const bg = colors[tabIndex];

  return (
    <section
      style={{
        backgroundColor: "#eee",
      }}
      className="profile-container"
    >
      <div className="container py-3">
        <div className="row">
          <div className="col">
            {" "}
            {/* <nav
                        aria-label="breadcrumb"
                        className="bg-light rounded-3 p-3 mb-4"
                      >
                        <ol className="breadcrumb mb-0">
                          <li className="breadcrumb-item">
                            <a href="#">Home</a>
                          </li>
                          <li className="breadcrumb-item">
                            <a href="#">User</a>
                          </li>
                          <li className="breadcrumb-item active" aria-current="page">
                            User Profile
                          </li>
                        </ol>
                      </nav> */}{" "}
          </div>{" "}
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center pic-text">
                <img
                  src={user.picture}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{
                    width: "250px",
                  }}
                />{" "}
                <h5 className="my-3"> {user.name} </h5>{" "}
                {/* <p className="text-muted mb-1">Full Stack Developer</p>
                        <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}{" "}
                <div className="d-flex justify-content-center mb-2 btns">
                  <Link to={`/update/${user._id}`}>
                    <button type="button" className="btn  edit-btn">
                      Edit Profile{" "}
                    </button>{" "}
                  </Link>{" "}
                  <button
                    type="button"
                    className="btn  ms-1 delete-btn"
                    onClick={handleDelete}
                  >
                    Delete Profile{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
              <TabList>
                <Tab> People you liked </Tab> <Tab> People who liked you </Tab>{" "}
              </TabList>{" "}
              <TabPanels p="2rem">
                <TabPanel>
                  {" "}
                  {!liked[0] ? (
                    "You have not liked anyone"
                  ) : (
                    <MatchesCard elem={user.liked[0]} />
                  )}{" "}
                  {liked[1] ? <MatchesCard elem={user.liked[1]} /> : ""}{" "}
                  {liked[2] ? <Link to="/like"> View More </Link> : ""}{" "}
                </TabPanel>{" "}
                <TabPanel>
                  {" "}
                  {!likedby[0] ? (
                    "You have not been likedby anyone"
                  ) : (
                    <MatchesCard elem={user.likedby[0]} />
                  )}{" "}
                  {likedby[1] ? <MatchesCard elem={user.likedby[1]} /> : ""}{" "}
                  {likedby[2] ? <Link to="/likedby"> View More </Link> : ""}{" "}
                </TabPanel>{" "}
              </TabPanels>{" "}
            </Tabs>{" "}
          </div>{" "}
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body detail-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0"> Full Name </p>{" "}
                  </div>{" "}
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"> {user.name} </p>{" "}
                  </div>{" "}
                </div>{" "}
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0"> Email </p>{" "}
                  </div>{" "}
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"> {user.email} </p>{" "}
                  </div>{" "}
                </div>{" "}
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0"> Mobile </p>{" "}
                  </div>{" "}
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"> {user.mobile} </p>{" "}
                  </div>{" "}
                </div>{" "}
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0"> Date of Birth </p>{" "}
                  </div>{" "}
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"> {user.dob} </p>{" "}
                  </div>{" "}
                </div>{" "}
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0"> Address </p>{" "}
                  </div>{" "}
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"> {user.address} </p>{" "}
                  </div>{" "}
                </div>{" "}
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0"> Gender </p>{" "}
                  </div>{" "}
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"> {user.gender} </p>{" "}
                  </div>{" "}
                </div>{" "}
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0"> Religion </p>{" "}
                  </div>{" "}
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"> {user.religion} </p>{" "}
                  </div>{" "}
                </div>{" "}
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0"> Mother Tongue </p>{" "}
                  </div>{" "}
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"> {user.mothertongue} </p>{" "}
                  </div>{" "}
                </div>{" "}
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0"> Description </p>{" "}
                  </div>{" "}
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"> {user.description} </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};

export default Profile;