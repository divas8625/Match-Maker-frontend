import react ,{ useState,useContext} from "react";
import { useDisclosure , RadioGroup , Radio , Button , Stack } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import MatchesCard from "../../components/matches-card/MatchesCard";
import { accessChat } from "../../service/api";
import { UserContext } from "../../context/Context";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const SideDrawer = ({matchArray}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [placement, setPlacement] = useState("left");
    const {chats , setChats ,selectedChat , setSelectedChat} = useContext(UserContext);
  
    const handleChat = async (elem) => {
    const data = await accessChat({id: elem._id});
    console.log(data);
    
    if(!chats?.find((ch) => ch?._id === data?.data?._id))
      setChats([data.data , ...chats]);
    setSelectedChat(data?.data);
  }

  return (
    <>
      <RadioGroup defaultValue={placement} onChange={setPlacement}>
        <Stack direction="row" mb="4">
          {/* <Radio value="top">Top</Radio>
          <Radio value="right">Right</Radio>
          <Radio value="bottom">Bottom</Radio> */}
          {/* <Radio value="left">Left</Radio> */}
        </Stack>
      </RadioGroup>
      <Button colorScheme="green" onClick={onOpen}>
        <ArrowBackIcon />
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Button colorScheme="green" onClick={onClose} m={"2"}>
              <ArrowBackIcon />
            </Button>
            My Matches
          </DrawerHeader>
          <DrawerBody>
            {
              <>
                {matchArray?.map((elem) => {
                  return (
                    <p
                      onClick={() => handleChat(elem)}
                      style={{ cursor: "pointer" }}
                    >
                      <MatchesCard elem={elem} />
                    </p>
                  );
                })}
              </>
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;