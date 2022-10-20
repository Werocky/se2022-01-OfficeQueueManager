import { Form, Button, Alert, Container, Row, Col ,Table} from 'react-bootstrap';
import {useEffect,useState} from 'react';
import API from './API';

function OfficerPage(props)
{
  const [services,setServices]=useState();
    const callNext = () => 
    {
        API.getNextClient()
        .then((id)=>
        {
          console.log(id);
          props.setMessage("Next client is "+id);
        })
      }
        return (
          <Button onClick={() => {callNext();props.setMessage("client called")}} >NEXT</Button>
        );
}
export {OfficerPage};