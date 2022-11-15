import React, { useContext } from 'react'
import { UserContext } from '../../context/Context'

const Singlemssg = ({elem}) => {
   

    return (
        <>
            <div className='mssg-container'>
                {elem}
            </div>
        </>
    )
}

export default Singlemssg