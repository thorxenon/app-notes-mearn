import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import './LoginScreen.css';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { login } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginScreen = ({ history }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector((state)=>state.userLogin);
    const { loading, error, userInfo } = userLogin;
    const navigate = useNavigate();

    useEffect(() => {
      if(userInfo){
          navigate('/mynotes')
      }
    }, [ userInfo ]);
    

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(login(email, password));
    }

  return (
    <MainScreen title="LOGIN">
        <div className="loginContainer">
            { error && <ErrorMessage variant="danger">{error}</ErrorMessage> }
            { loading && <Loading/> }
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    </MainScreen>
  );
};

export default LoginScreen;
