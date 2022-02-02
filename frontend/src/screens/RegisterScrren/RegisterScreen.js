import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import './RegisterScreen.css';
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const postDetails = (pics) =>{
    if(!pics){
      return setPicMessage('Please Select an Image');
    }
    setPicMessage(null);
    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'mearn-noteZipper');
      data.append('cloud_name', 'drpvwzbtz');
      fetch('http://api.cloudinary.com/v1_1/drpvwzbtz/image/upload',{
        method:'POST',
        body:data,
      }).then((res)=>res.json()).then((data)=>{
        setPic(data.url.toString())
      })
      .catch((err) =>{
        console.log(err);
      }); 
    }else{
      return setPicMessage('Please Select an Image!');
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/mynotes');
    }
  }, [userInfo]);

  const submitHandler = async(e) => {
    e.preventDefault();

    if(password !== confirmpassword){
      setMessage('Password do not match');
    }else dispatch(register(firstName, lastName, email, password, pic));
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="name"
              value={firstName}
              placeholder="Enter name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group >
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="name"
              value={lastName}
              placeholder="Enter name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group /*controlId="formBasicEmail"*/>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group /*controlId="formBasicPassword"*/>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group /*controlId="confirmPassword"*/>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group /*controlId="formfile" */className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="file"
              label="Upload Profile Picture"
              accept="image/png, image/jpeg"             
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;