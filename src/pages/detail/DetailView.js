import React from 'react'
import { useState, useEffect, useContext  } from "react";
import { useParams ,useHistory} from 'react-router';
import { getDetail } from '../../service/api';
import { UserContext } from '../../context/Context';
import { updateLike , updateDislike , accessChat } from '../../service/api';
import "./DetailView.css"
import { useToast } from '@chakra-ui/react'
import sound from "../../components/users/drop-sound.mp3"

function DetailView({socket}) {
  const toast = useToast();
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

  const {id} = useParams();

  const [like, setLike] = useState(false);
  const {userData , setUserData} = useContext(UserContext);
    // const [user,setUser] = useState();
  const [user, setUser] = useState(initial);
  const history = useHistory();

  useEffect(() => {
    const getData = async (id) => {
      const data = await getDetail(id);
    //   if (!data.data._id) history.push("/");
      setUser(data.data);
    };
    getData(id);
    const chatTest = async () => {
      try {
        const test = await accessChat({id: id});
        // console.log(test);
      } catch (error) {
        console.log(error);
      }
    }
    chatTest();
  

  }, []);

  useEffect(() => {
    // let data = JSON.parse(window.localStorage.getItem(`userInfo`));
    const data = JSON.parse(window.localStorage.getItem(`${id}`));
    if(data)
      setLike(true)
    else  
      setLike(false)
  }, []);

  // useEffect(()=>{
  //     window.localStorage.setItem(`${id}`, JSON.stringify(like));
  //   },[like])

  const handleLike = () => {
    const editLike = async (obj) => {
      try {
        // console.log("temp:",obj.likedby,"elem:",obj.liked);

        const data = await updateLike(obj);
        // window.localStorage.setItem("userInfo" , JSON.stringify(data.data));
        setUserData(data.data);
      } catch (error) {
        console.log("It's an error!");
      }
    };
    var birdSound = new Audio(sound);
    birdSound.loop = false;
    birdSound.play();

    //Toast
    toast({
      title: "You liked",
      description: `You have liked ${user?.name}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    editLike({ likedby: userData?._id, liked: user?._id });
    window.localStorage.setItem(`${user?._id}`, JSON.stringify(true));
    setLike(true);
    setTimeout(() => {
      // const data = JSON.parse(window.localStorage.getItem("userInfo"));
      const data = userData;
      socket.emit("sendNotification", {
        sender: data,
        receiver: user,
        type: "liked",
      });
    }, 2000);
  };

  const handleDislike = () => {
    const editDislike = async(obj)=>{
            try {
                const data = await updateDislike(obj);
                
                // window.localStorage.setItem("userInfo" , JSON.stringify(data.data));
                setUserData(data.data);   

            } catch (error) {
                console.log("It's an error!")
            }
        }
        
        editDislike({"dislikedby":userData?._id , "disliked":user?._id});
        window.localStorage.setItem(`${user?._id}`,JSON.stringify(false));
        setLike(false);
        setTimeout(()=>{
            // const data = JSON.parse(window.localStorage.getItem("userInfo"));        
            const data = userData;
            socket.emit("sendNotification" , {sender: data, receiver:user, type: "disliked"});
        },2000)
  };
  
  // setIsLiked(user.)

 
  return (
    <div>
        <section style={{ backgroundColor: "#eee" }}className="detail-container">
      
      <div className="container py-3">
        <div className="row">
          <div className="col">
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center pic-text">
                <img
                  src={user.picture}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "250px" }}
                />
                <h5 className="my-3">{user.name}</h5>
              
                <div className={`init-heart ${like === false ? "" : "hidden"}`} ><i className="fa fa-heart-o" onClick={()=>{setLike(!like); handleLike()}}></i></div> 
                <div className={`heart ${like === false ? "hidden" : ""}`} ><i className="fa fa-solid fa-heart" style={{color:"#ff477e "}} onClick={()=>{setLike(!like); handleDislike()}}></i></div>
              
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body detail-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Mobile</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.mobile}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Date of Birth</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.dob}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.address}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Gender</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.gender}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Religion</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.religion}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Mother Tongue</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.mothertongue}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Description</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default DetailView