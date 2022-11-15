import React, { useEffect, useState,useContext } from 'react'
import LikeCard from '../../components/likecard/LikeCard'
import { UserContext } from '../../context/Context'
import { Spinner } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import "./LikeCards.css"

const LikeCards = () => {
    
    const {userData } = useContext(UserContext);
    const [allLike , setAllLike] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    // const [user,setUser] = useState();
    useEffect(()=>{
        const data = userData;
        setIsLoading(false);
        setAllLike(data.liked)
        // setTimeout(() => {
        //     setIsLoading(true);
        // }, 1000);
        setIsLoading(true);
    },[userData]);
    
    return (

        <div className='like-page-container'>
        {
            isLoading === false ? <Spinner 
                thickness = '4px'
                speed = '0.65s'
                emptyColor = 'gray.200'
                color = '#ff477e'
                size = 'xl' 
            /> : (allLike !== null ? (allLike.length > 0 ? allLike.map(elem => {
                    return (
                        <LikeCard elem={elem}/>
                    )
            }): "Hey you Brat, First like someone and then come here"): "Hey you Brat, First like someone and then come here")
        }
        </div>
    )
}

export default LikeCards