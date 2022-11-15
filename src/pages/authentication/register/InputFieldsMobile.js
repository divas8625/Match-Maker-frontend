import React from "react";
import "./Signup.css";
import logo from "../../../image/logo.png";
import couple from "../../../image/couple.png";
import blank from "../../../image/blank.png";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUser, uploadFile } from "../../../service/api";
import { Input, Stack, VStack, HStack } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Button,
} from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useMediaQuery } from "@chakra-ui/react";

const InputFieldsMobile = () => {

    const initial = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      mobile: "",
      dob: "",
      gender: "",
      address: "",
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
      // console.log(user);
     
      try {
        const data = await createUser(user);
        // console.log(data);
        if (data.status === 200) {
          if (data.data.message !== "Registration successfull") window.alert(data.data.message);
          else history.push("/login");
        } else throw new Error("Server Error:500");
      } catch (err) {
        window.alert(err);
      }
    };

    const AvatarSize = useBreakpointValue({ base: "sm", md: "xl" });
    const [isMobile] = useMediaQuery("(max-width: 768px)"); 

    return (
        <>
          <FormControl>
            <VStack spacing={3} style={{width: "90%"}}>

                <FormLabel htmlFor="name" >Name</FormLabel>
                <Input variant='outline' onChange={(e) => handleChange(e)} name="name" isRequired id="name" placeholder='Name' type="text" />

                <FormLabel htmlFor="email">Email ID</FormLabel>
                <Input variant='outline' onChange={(e) => handleChange(e)} name="email" isRequired id="email" placeholder='Email ID' />

                <FormLabel htmlFor="mobile-number" >Mobile Number</FormLabel>
                <Input variant='outline' onChange={(e) => handleChange(e)} name="mobile" isRequired id="mobile-number" placeholder='Mobile Number' type="number" />

                <FormLabel htmlFor="dob">Date of Birth</FormLabel>
                <Input variant='outline' onChange={(e) => handleChange(e)} name="dob" isRequired id='dob' placeholder='Date of Birth' type="date"/>

                <FormLabel htmlFor='gender'>Gender</FormLabel>
                <Select id='gender' name="gender" placeholder='Select Gender' onChange={(e) => handleChange(e)}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                </Select>

                <FormLabel htmlFor="address">Address</FormLabel>
                <Input variant='outline' onChange={(e) => handleChange(e)} name="address" isRequired id="address" placeholder='Address' />

                <FormLabel htmlFor="profession">Profession</FormLabel>
                <Input variant='outline' onChange={(e) => handleChange(e)} name="profession" isRequired id="profession" placeholder='Profession' />

                <FormLabel htmlFor="religion">Religion</FormLabel>
                <Input variant='outline' onChange={(e) => handleChange(e)} name="religion" isRequired id="religion" placeholder='Religion' />

                <FormLabel htmlFor="about">About Yourself</FormLabel>
                <Input variant='outline' onChange={(e) => handleChange(e)} name="description" isRequired id="about" placeholder='About Yourself' />
                
                <FormLabel htmlFor="mother-tongue">Mother Tongue</FormLabel>
                <Input variant='outline' onChange={(e) => handleChange(e)} name="mothertongue" isRequired id="mother-tongue" placeholder='Mother Tongue' />

                <FormLabel htmlFor="password">Password</FormLabel>
                <Input variant='outline' onChange={(e) => handleChange(e)} name="password" isRequired id="password" placeholder='Password' type="password" />

                <FormLabel htmlFor="cpassword">Confirm Password</FormLabel>
                <Input variant='outline' onChange={(e) => handleChange(e)} name="cpassword" isRequired id="cpassword" placeholder='Confirm Password' type="password" />
                
                <Avatar
                    size={AvatarSize}
                    // name={"name" |}
                    src={imageURL || "https://bit.ly/broken-link"}
                    style={{ border: "1px solid #EA0A84"}}    
                />
                <label htmlFor="regimg">
                    <i className="fa fa-plus-circle"></i>Upload image
                </label>
                <Input type="file" name="picture" className="imgfile" id="regimg" onChange={(e) => setFile(e.target.files[0])} />
                
                <Button
                    bg="#EA0A84"
                    color="white"
                    _hover={{ bg: "#0aea6f" }}
                    className="register-btn"
                    style={{ margin: "2rem" }}
                    onClick={(e) => (saveUser(e))} 
                >
                    Create Account
                </Button>
            </VStack>
          </FormControl>
        </>
    );
};

export default InputFieldsMobile;