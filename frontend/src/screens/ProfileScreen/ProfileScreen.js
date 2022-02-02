import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MainScreen from '../../components/MainScreen';
import './ProfileScreen.css';
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { updateUserAction } from '../../actions/userActions';
import Loading from '../../components/Loading';

const ProfileScreen = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const [email, setEmail] = useState('');
  const [pic, setPic] = useState();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state)=> state.userLogin);
  const { userInfo } = userLogin;

  const updateUser = useSelector((state) => state.updateUser);
  const { loading, error, success } = updateUser;

  useEffect(() => {
    if(!userInfo){
      navigate('/')
    }else{
      setFirstName(userInfo.name.firstName);
      setLastName(userInfo.name.lastName);
      setEmail(userInfo.email);
      setPic(userInfo.pic)
    }
  }, [userInfo]);

  const postDetails = (pics) =>{
    setPicMessage(null);
    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data = new FormData();
      data.append("file", pics);
      data.append('upload_preset', "mearn-noteZipper");
      data.append('cloud_name','drpvwzbtz');
      fetch('http://api.cloudinary.com/v1_1/drpvwzbtz/image/upload',{
          method:'POST',
          body: data
      }).then((res)=>res.json()).then((data)=>{
        setPic(data.url.toString())
      })
      .catch((err) =>{
        console.log(err);
      }); 
    }else{
      return setPicMessage('Please Select an Image!');
    };
  };

  const submitHandler = (e) =>{
    e.preventDefault();
    if(password === newPassword){
      return <ErrorMessage>New Password must be difference!</ErrorMessage>
    }else{
      dispatch(updateUserAction({firstName, lastName, email, password, newPassword, pic}))
    }
  }
  

  return (
      <MainScreen title="EDIT PROFILE">
          <div>
            <Row className="profileContainer">
              <Col md={6}>
                <Form onSubmit={submitHandler}>
                  {loading && <Loading/>}
                  {success && (
                    <ErrorMessage
                      style={{backgroundColor:'green'}}
                    >
                      Updated Successfully
                    </ErrorMessage>
                  )}
                  <Form.Group controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter First Name'
                      value={firstName}
                      onChange={(e)=> setFirstName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Last Name'
                      value={lastName}
                      onChange={(e)=> setLastName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter E-mail'
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter Password'
                      value={password}
                      onChange={(e)=> setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId='newPassword'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter the New Password'
                      value={newPassword}
                      onChange={(e)=> setNewPassword(e.target.value)}
                    />
                  </Form.Group>

                  {picMessage && (
                    <ErrorMessage variante='danger'>{picMessage}</ErrorMessage>
                  )}

                  <Form.Group controlId='pic'>
                    <Form.Label>Change Profile Picture</Form.Label>
                    <Form.Control
                      type='file'
                      label="Upload Profile Picture"
                      accept="image/png, image/jpeg"
                      onChange={(e)=> postDetails(e.target.files[0])}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    style={{marginTop:15}}
                  >Update</Button>

                  
                </Form>
              </Col>
              <Col
                style={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
                }}
              ><img src={userInfo.pic} alt={firstName} className='profilePic'/></Col>
            </Row>
          </div>
      </MainScreen>
  )
};

export default ProfileScreen;
