import React from 'react'
import { Avatar, AvatarBadge, AvatarGroup ,Wrap, WrapItem} from '@chakra-ui/react'
import "./LikeCard.css";
import { useBreakpointValue } from '@chakra-ui/media-query';

const LikeCard = ({elem}) => {
    // console.log(elem);

    const AvatarSize = useBreakpointValue({ base: 'md', md: '2xl' })

  return (
    <>
        <div className='likecard-container'>
            <div className='avatar-pic'>
                <Wrap>
                    <WrapItem>
                        <Avatar
                            size={AvatarSize}
                            name={elem.name}
                            src={elem.picture}

                        />
                    </WrapItem>
                </Wrap>
                
            </div>
            <div className='brief'>
                <div className='name'>{elem.name}</div>
                <div className='line'></div>
                <div className='proff'>{elem.profession}</div>
            </div>
        </div>
    </>
  )
}

export default LikeCard