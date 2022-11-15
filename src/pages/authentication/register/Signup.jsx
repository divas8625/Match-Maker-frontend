import React from "react";
import "./Signup.css";
import logo from "../../../image/logo.png"
import couple from "../../../image/couple.png"
import blank from "../../../image/blank.png"
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUser, uploadFile } from "../../../service/api";
import { Input, Stack , VStack , HStack } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Button
} from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useBreakpointValue } from '@chakra-ui/media-query';
import { useMediaQuery } from "@chakra-ui/react";
import InputFields from "./InputFields";
import InputFieldsMobile from "./InputFieldsMobile";
import registerImage from "../../../image/Register-pic.png"

function Signup() {

  const AvatarSize = useBreakpointValue({ base: "sm", md: "md" });
  const [isMobile] = useMediaQuery("(max-width: 850px)") 
  const initial = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    mobile: "",
    dob: "",
    gender: "",
    location: "",
    religion: "",
    mothertongue: "",
    description: "",
    picture: "",
  };
  const history = useHistory();
  const [user, setUser] = useState(initial);
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState("");
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const image = await uploadFile(data);
        user.picture = image.data;
        setImageURL(image.data);
      }
    };
    getImage();
  }, [file]);

  const saveUser = async (e) => {
    e.preventDefault();
    const data = await createUser(user);
    try {
      if (data.status === 200) {
        if (data.data !== "Registration successfull") window.alert(data.data);
        else history.push("/login");
      } else throw new Error("Server Error:500");
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>

      <div className="sign-up-container">

        <div className = "register-intro">
          {/* <div className = "logo-name"> */}
            {/* <img className = "logo" src = {logo} /> */}
            {/* <h3 className = "heading">Match Founder</h3> */}
          {/* </div> */}
          {/* <h6 className = "tag-line">A few clicks away from finding your soul mate</h6> */}
          <img className="couple-img" src={registerImage} />
        </div>

        <div className = "register-fields">
          <h1 className="reg-heading">Register</h1>
          {
            !isMobile ?  <HStack><InputFields /></HStack> : <VStack><InputFieldsMobile /></VStack>
          }
        </div>
      </div>
    </>
  );
}

export default Signup;