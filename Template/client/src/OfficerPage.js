import { Form, Button, Alert, Container, Row, Col ,Table} from 'react-bootstrap';
import {useEffect,useState} from 'react';
import API from './API';

function OfficerPage(props)
{
    const callNext = (s) => 
    {
        console.log(services);
    }



    const [services,setServices]=useState();
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