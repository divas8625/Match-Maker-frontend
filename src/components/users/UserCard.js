import {React , useEffect , useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import "./UserCard.css"
import { updateLike , updateDislike, getUser } from '../../service/api'
import { useToast } from '@chakra-ui/react'
import sound from "./drop-sound.mp3";
import { UserContext } from '../../context/Context'
import { Image , Box } from '@chakra-ui/react'

const UserCard = ({elem , socket}) => {
    
    const toast = useToast();
    const [like , setLike] = useState(false);
    const [temp,setTemp] = useState([]);
    const {userData,setUserData} = useContext(UserContext);

    useEffect(()=>{
        // let data = JSON.parse(window.localStorage.getItem(`userInfo`));
        let data = userData;
        setTemp(data);
        let islike = data.liked.find((val)=>val._id===elem._id);
        if(islike===undefined || islike === null)
        islike = false;
        else    
        islike = true;
        setLike(islike);
        window.localStorage.setItem(`${elem._id}`,JSON.stringify(islike));
    },[])



    // useEffect(()=>{
        
    //     socket.on("getNotification" , async({sender , type}) => {
    //         console.log(type);
    //         const data = await getUser();
    //         console.log(data.data);
    //         setUserData(data.data);   
    //     });

    // },[socket]);
    

    
    const handleLike = (elem) => {
      var birdSound = new Audio(sound);
                birdSound.loop = false;
                birdSound.play();

                //Toast
                toast({
                    title: "You liked",
                    description: `You have liked ${elem?.name}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  })
        // // socket.volatile.emit("liked",user._id,elem._id)
        const editLike = async(obj)=>{
            try {
                // console.log("temp:",obj.likedby,"elem:",obj.liked);
                
                const data = await updateLike(obj);
                // window.localStorage.setItem("userInfo" , JSON.stringify(data.data));
                setUserData(data.data); 
                  
                
            } catch (error) {
                console.log("It's an error!")
            }
        }
        
        editLike({"likedby":temp?._id , "liked":elem?._id});
        window.localStorage.setItem(`${elem?._id}`,JSON.stringify(true));
        setLike(true);
        setTimeout(()=>{
                // const data = JSON.parse(window.localStorage.getItem("userInfo"));
                const data = userData;        
                socket.emit("sendNotification" , {sender: data, receiver:elem, type: "liked"});
        },2000)
    }
    
    const handleDislike = (elem) => {
        // // socket.volatile.emit("liked",user._id,elem._id)
        const editDislike = async(obj)=>{
            try {
                const data = await updateDislike(obj);
                
                // window.localStorage.setItem("userInfo" , JSON.stringify(data.data));
                setUserData(data.data);   

            } catch (error) {
                console.log("It's an error!")
            }
        }
        
        editDislike({"dislikedby":temp._id , "disliked":elem._id});
        window.localStorage.setItem(`${elem?._id}`,JSON.stringify(false));
        setLike(false);
        setTimeout(()=>{
            // const data = JSON.parse(window.localStorage.getItem("userInfo"));        
            const data = userData;
            socket.emit("sendNotification" , {sender: data, receiver:elem, type: "disliked"});
        },2000)
    }


  
    return (
      <div className="user-card-container">
        <div className="profile-pic">
            <img src={elem.picture}/>
        </div>          
        <div className="info">
          <div className="name-proff">
            <div className="name" style={{ display: "inline-block" }}>
              {elem.name}
              <div className={`init-heart ${like === false ? "" : "hidden"}`}>
                <i
                  className="fa fa-heart-o"
                  onClick={() => {
                    setLike(true);
                    handleLike(elem);
                  }}
                ></i>
              </div>

              <div className={`heart ${like === false ? "hidden" : ""}`}>
                <i
                  className="fa fa-solid fa-heart"
                  onClick={() => {
                    setLike(false);
                    handleDislike(elem);
                  }}
                ></i>
              </div>
            </div>
            <div className="proff">{elem.profession}</div>
          </div>
          <div className="desc">
            <div className="age">D.O.B : {elem.dob}</div>
            <div className="religion">Religion : {elem.religion}</div>
            <div className="age">Mother Tongue : {elem.mothertongue}</div>
            <hr />
            <div className="description"> {elem.description} </div>
          </div>
          <div className="button">
            <Link to={`/detailview/${elem._id}`}>
              <button className="view-profile">View Profile</button>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default UserCard