import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route,Navigate, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {LogoutButton } from './LoginPage';
import { TicketPage } from './TicketPage';



const services = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b'},
  { id: 3, name: 'c'}
];

function App() {
  return (
    <Router>
    <App2 />
  </Router>
  );
}
function App2(){
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const[user,setUser]=useState([]);
  const navigate=useNavigate();



  const doLogIn = (credentials) => {
   /* API.logIn(credentials)
      .then(user => {
       
      })
      .catch(err => {
      
      }
      )*/
  }

  const doLogOut = async () => {
  
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
        </Routes>
        </>
   
  );
}

export default App;
