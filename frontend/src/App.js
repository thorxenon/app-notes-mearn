import './bootstrap.min.css';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScrren/RegisterScreen';
import CreateNote  from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

function App() {

  const [ search, setSearch ] = useState("");

  return (
    <BrowserRouter>
    <Header setSearch={setSearch}/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/mynotes" element={ <MyNotes search={search}/> }/>
          <Route path="/login" element={<LoginScreen/>} exact/>
          <Route path="/register" element={<RegisterScreen/>} exact/>
          <Route path='/createnote' element={<CreateNote/>} />
          <Route path='/note/:id' element={<SingleNote/>} />
          <Route path='/profile' element={<ProfileScreen/>}/>
        </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;