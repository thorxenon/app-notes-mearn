import './bootstrap.min.css';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScrren/RegisterScreen';

function App() {
  return (
    <BrowserRouter>
    <Header/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/mynotes" element={ <MyNotes/> }/>
          <Route path="/login" element={<LoginScreen/>} exact/>
          <Route path="/register" element={<RegisterScreen/>} exact/>
        </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;