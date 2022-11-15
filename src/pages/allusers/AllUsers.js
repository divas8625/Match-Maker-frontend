import {React , useState , useEffect,useContext} from 'react'
import UserCard from '../../components/users/UserCard'
import { getAllUser } from '../../service/api'
import { Link } from 'react-router-dom';
import "./AllUsers.css"
import { Spinner } from '@chakra-ui/react'
import { UserContext } from '../../context/Context';


const AllUsers = ({socket}) => {

    const [isloading , setIsLoading] = useState(true);
    const [users , setUsers] = useState([]);
    const {userData} = useContext(UserContext);

    useEffect(() => {
        setIsLoading(true);
        
        const allUsers = async () => {
            try {
            
            const peep = userData;
            const data = await getAllUser(peep?._id);
            setUsers(data.data);
            setIsLoading(false);
            } catch (error) {
                console.log("error in fetching all users",error);
            }
        }
        allUsers();
    }, [])
    
    // function getCookie(cname) {
    //     let name = cname + "=";
    //     let ca = document.cookie.split(';');
    //     for (let i = 0; i < ca.length; i++) {
    //         let c = ca[i];
    //         while (c.charAt(0) === ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) === 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }
    // const s = getCookie("jwtoken");
    // // console.log(s);
    // let data = users.find((elem) => elem.tokens[0].token === s);
    
    return (
        <>

        <div className="all-user-card-container">
            {
                isloading === true ? 
                (<div className="spinner" style={{display: "flex" , gap: "5rem" , flexDirection: "column" , justifyContent: "center" , alignItems: "center"}}>
                    <h1 style={{fontSize: "5rem" , color: "#ff477e"}}>Wait for your partners</h1>
                    <Spinner 
                        thickness = '4px'
                        speed = '0.65s'
                        emptyColor = 'gray.200'
                        color = '#ff477e'
                        size = 'xl'
                    />
                </div>)  
                    :
                    users?.map( (elem) => {
                    return( 
                        <UserCard elem={elem} socket={socket} key={elem._id}/>
                    )
                })
            }    
        </div>
        </>
    )
}

export default AllUsers