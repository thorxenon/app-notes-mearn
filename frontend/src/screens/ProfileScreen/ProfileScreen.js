import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MainScreen from '../../components/MainScreen';
import './ProfileScreen.css';

const ProfileScreen = () => {

  const [name, setName] = useState('');
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

  return (
      <MainScreen title="EDIT PROFILE">
          <div>
            <Row className="profileContainer">
              <Col md={6}>
                <Form >
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Name'
                      value={name}
                      onChange={(e)=> setName(e.target.value)}
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
                      type='text'
                      placeholder='Enter the New Password'
                      value={newPassword}
                      onChange={(e)=> setNewPassword(e.target.value)}
                    />
                  </Form.Group>

                  {/*{picMessage && (
                    <ErrorMessage variante='danger'>{picMessage}</ErrorMessage>
                  )}*/}

                  <Form.Group controlId='pic'>
                    <Form.Label>Change Profile Picture</Form.Label>
                    <Form.Control
                      type='file'
                      id="custom-file"
                      label="Upload Profile Picture"
                      accept="image/png, image/jpeg"
                      //onChange={(e)=> postDetails(e.target.value)}
                    />
                  </Form.Group>

                  
                </Form>
              </Col>
              <Col
                style={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
                }}
              ><img src={userInfo.pic} alt={name} className='profilePic'/></Col>
            </Row>
          </div>
      </MainScreen>
  )
};

export default ProfileScreen;
