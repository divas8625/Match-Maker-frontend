import {React , useEffect, useState,useContext} from "react";
import {useParams,useHistory} from "react-router"
// import { UserContext } from "../../context/Context";
import { getUser ,editUser , uploadFile} from "../../service/api";
import "./Update.css";

function Update() {

  const {id} = useParams();
  const history = useHistory();

  const initial = {
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    address: "",
    religion: "",
    mothertongue: "",
    description: "",
    picture: "",
  };

  // const {user,setUser} = useContext(UserContext);
  const [user,setUser] = useState(initial);
  const handleChange=(e)=>{
    
    setUser({...user,[e.target.name]:e.target.value});
  }

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("userInfo")));
    if(!user || user === undefined)
      history.push("/");
  }, []);

  //upload image
  const [imageURL , setImageURL] = useState("");
  const [file , setFile] = useState("");
  useEffect(() => {
    const getImage = async () => {
      if(file) {
        const data = new FormData();
        data.append("name" , file.name);
        data.append("file" , file);

        const image = await uploadFile(data);
        user.picture = image.data;
        setImageURL(image.data);
      }
    };
    getImage();
  }, [file]);
  
  //user updated
  const saveChanges = async (e) => {
    e.preventDefault();
    
    const data = await editUser(user);
    window.localStorage.setItem("userInfo" , JSON.stringify(data.data.updatedUser));
    history.push("/");
  };

  return (
    <section style={{ backgroundColor: "#eee" }} className="update-container">
      <div className="container py-5">
        <div className="row">
          <div className="col">
            
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center pic-text">
                <img
                  src={user.picture}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "250px" }}
                />
                <label htmlFor="userimg">
              <i className="fa fa-plus-circle"></i>
              Upload image
            </label>
                <input type="file" id ="userimg" onChange={(e) => (setFile(e.target.files[0]))} style={{display:"none"}}/>
                <h5 className="my-3">{user.name}</h5>
                {/* <p className="text-muted mb-1">Full Stack Developer</p>
            <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn save-btn" onClick={(e) => saveChanges(e)}>
                    Save Changes
                  </button>
                  
                </div>
              </div>
            </div>
            
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body detail-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <input value = {user.name} name="name" className="text-muted mb-0" onChange={(e) => handleChange(e)}></input>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <input className="text-muted mb-0" name = "email" value={user.email} onChange={(e) => handleChange(e)}></input>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Mobile</p>
                  </div>
                  <div className="col-sm-9">
                    <input value={user.mobile} name="mobile" className="text-muted mb-0" onChange={(e) => handleChange(e)} ></input>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0" >Date of Birth</p>
                  </div>
                  <div className="col-sm-9">
                    <input value={user.dob} name="dob" className="text-muted mb-0" onChange={(e) => handleChange(e)}></input>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <input value = {user.address} name="address" className="text-muted mb-0" onChange={(e) => handleChange(e)}></input>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Gender</p>
                  </div>
                  <div className="col-sm-9">
                    <input value={user.gender} name="gender" className="text-muted mb-0" onChange={(e) => handleChange(e)}></input>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Religion</p>
                  </div>
                  <div className="col-sm-9">
                    <input className="text-muted mb-0" value={user.religion} name="religion" onChange={(e) => handleChange(e)}></input>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Mother Tongue</p>
                  </div>
                  <div className="col-sm-9">
                    <input className="text-muted mb-0" value={user.mothertongue} name="mothertongue" onChange={(e) => handleChange(e)}></input>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Description</p>
                  </div>
                  <div className="col-sm-9">
                    <input className="text-muted mb-0" value={user.description} name="description" onChange={(e) => handleChange(e)}></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Update;