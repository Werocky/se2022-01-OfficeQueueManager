import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route,Navigate, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { LoginForm, LogoutButton } from './LoginPage';
import { TicketPage } from './TicketPage';
import {ShiftPage} from './ShiftPage';
import { OfficerPage } from './OfficerPage';
import API from './API';



/*const services = [
  { id: '1', name: 'a' },
  { id: '2', name: 'b'},
  { id: '3', name: 'c'}
];*/

function App() {
  return (
    <Router>
    <App2 />
  </Router>
  );
}
function App2(){
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [errorLogin ,setErrorLogin] = useState(false);
  const [message, setMessage] = useState('');
  const [user,setUser]=useState([]);
  const [services, setServices] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    if(!loggedIn){
      API.getServices()
        .then((servicesList) => {
          setServices(servicesList);
        })
        .catch(/* error handling */)
      }
  }, [loggedIn])

  const doLogIn = (credentials) => {
    API.logIn(credentials)
      .then(user => {
        setLoggedIn(true);
        setUser(user);
        setMessage('');
        navigate('/officerPage');
      })
      .catch(err => {
       
        setMessage(err);
      }
      )
  }

  const doLogOut = async () => {
    await API.logOut();
      setLoggedIn(false);
      setUser({});
      navigate('/');
  }
  return (
    <>
    <Container>
      <Row>
        <Col> 

        {loggedIn ? <LogoutButton logout={doLogOut} user={user} /> : false}
        </Col>
      </Row>
      <Row><Col>
        {message ? <Alert variant='primary' onClose={() => setMessage('')} dismissible>{message}</Alert> : false}
        </Col></Row>
        </Container>
        <Routes>
       
        <Route path='/' element={loggedIn?<Navigate to='/officerPage'/> :<TicketPage services={services} setMessage={setMessage}/>} />
        <Route path='/shifts' element={<ShiftPage services={services} setMessage={setMessage}/>}/>
        <Route path='/officerPage' element={!loggedIn?<Navigate to='/'/> :<OfficerPage setMessage={setMessage}/>} />
        <Route path='/login' element={loggedIn ? <Navigate to='/officerPage' /> : <LoginForm login={doLogIn} error={errorLogin} setErrorLogin={setErrorLogin} message={message}/>} />
        </Routes>
        </>
   
  );
}

export default App;
