import { useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import './LandingPage.css';

const LandingPage = () => {

    /*useEffect(()=>{
        const userInfo = localStorage.getItem('userInfo');
        if(userInfo){
            history.push("/mynotes")
        }
    },[history, userInfo])*/

  return <div className="main">
      <Container>
          <Row>
            <div className="intro-text">
                <div>
                    <h1 className="title">Welcome to Note Zipper App</h1>
                    <p className="subtitle">One Safe place for all your notes.</p>
                </div>
                <div className="buttonContainer">
                    <a href="/login">
                        <Button size="lg" className="landingButton">
                            Signin
                        </Button>
                    </a>

                    <a href="/register">
                        <Button
                            size="lg"
                            className="landingButton"
                            variant="outline-primary"
                        >
                            Signup
                        </Button>
                    </a>
                </div>
            </div>
          </Row>
      </Container>
  </div>;
};

export default LandingPage;