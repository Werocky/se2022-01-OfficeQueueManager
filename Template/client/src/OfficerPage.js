import { Form, Button, Alert, Container, Row, Col ,Table} from 'react-bootstrap';
import {useEffect,useState} from 'react';
import API from './API';

function OfficerPage(props)
{
  const [services,setServices]=useState();
    const callNext = (s) => 
    {
        API.getServicesPerOfficer
        .then((servicesList) => {
          setServices(servicesList);
        })
        .catch(/* error handling */)
      }
    useEffect(() => {
        API.getServicesPerOfficer()
        .then((servicesList) => {
            setServices(servicesList);
          })
          .catch(/* error handling */)
      }, [])
        return (
          <Button onClick={() => {callNext(services);props.setMessage("client called")}} >NEXT</Button>
        );
}
export {OfficerPage};