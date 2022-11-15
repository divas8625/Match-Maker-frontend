import React from 'react'
import { Avatar ,Wrap, WrapItem} from '@chakra-ui/react'
import { useBreakpointValue } from '@chakra-ui/media-query';
import "./MatchesCard.css"

const MatchesCard = ({elem}) => {
    const AvatarSize = useBreakpointValue({ base: 'sm', md: 'md' })
    // console.log(elem);

  return (
    <div className='matches-card-container'>
        <div className='match-pic'>
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
        <div className='match-name'>{elem.name}</div>
    </div>
  )
}

export default MatchesCard