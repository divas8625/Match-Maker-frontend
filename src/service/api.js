import axios from "axios";
const url = "http://localhost:8000";

///////////////////////////////////////////////////////////////////////
///////////////*****User Apis*****////////////////////////////

export const uploadFile = async (post) => {
  try {
    return await axios.post(`${url}/file/upload`, post);
  } catch (error) {
    console.log("Error while calling uploadFile API ", error);
  }
};

export const createUser = async (user) => {
  try {
    return await axios.post(`${url}/register`, user,{ withCredentials: true });
  } catch (err) {
    return err;
  }
};

export const logUser = async (user) => {
  try {
    return await axios.post(`${url}/login`, user, { withCredentials: true });
  } catch (err) {
    return err;
  }
};

export const getUser = async () => {
  try {
    
    const data = await axios.get(`${url}/getuser`, { withCredentials: true });
   
    return data;
  } catch (error) {
    return error;
  }
};
export const getAllUser = async (id) => {
  try {
    // console.log("APi");
    const data = await axios.get(`${url}/getalluser/${id}`, { withCredentials: true });
    return data;
  } catch (error) {
    return error;
  }
};
export const editUser = async ( user) => {
  try {
    const res = await axios.post(`${url}/editprofile`, user);
    return res;
  } catch (err) {
    console.log("Error while calling editPost API", err);
  }
};

export const deleteUser = async () => {
  try {
    const data = await axios.delete(`${url}/deleteprofile`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const getDetail=async(id)=>{
  try {
    const data = await axios.get(`${url}/getdetail/${id}`);
    return data;
  } catch (error) {
    return error;
  }
}

export const updateLike = async(obj) => {
  try {
    const data = await axios.post(`${url}/updatelike`,obj,{withCredentials: true,});
    return data;
  } catch (error) {
    return error;
  }
}

export const updateDislike = async (obj) => {
  try {
    const data = await axios.post(`${url}/updatedislike` , obj , {withCredentials: true,});
    return data;
  } catch (error) {
    return error;
  }
}

export const removeNotif = async (obj , id) => {
  try {
    const obj1 = {obj , id};
    const data = await axios.post(`${url}/removenotification` , obj1 , {withCredentials: true});
    return data;
  } catch (error) {
    return error;
  }
}

export const clearNotification = async (obj) => {
  try {
    const data = await axios.post(`${url}/clearnotification` , obj , {withCredentials: true});
    return data;
  } catch (error) {
    return error;
  }
}

export const logout = async () => {
  try {
    const data = await axios.get(`${url}/logout` , {withCredentials:true});
    return data;
  } catch (error) {
    return error;
  }
}

/////////////////////////////////////////////////////////////////////////////////
//////////////////*********Chat APis********////////////////////////////////////


export const accessChat = async (id)=>{
  try {
    const data = await axios.post(`${url}/accesschat`,id,{withCredentials:true});
    return data;
  } catch (error) {
    return error;
  }
}

export const allMessages = async (id) => {
  try {
    const data = await axios.get(`${url}/allmessages/${id}` , id , {withCredentials: true});
    return data;
  } catch (error) {
    return error;
  }
}

export const sendMessage = async (obj) => {
  try {
    const data = await axios.post(`${url}/sendmessage`,obj,{withCredentials:true});
    return data;
  } catch (error) {
    return error;
  }
}

export const saveNotification = async (obj) => {
  try {
    const data = await axios.post(`${url}/savenotification`,obj,{withCredentials: true});
    return data;
  } catch (error) {
    return error;
  }
}