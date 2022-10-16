import { Table, Button, Container, Col, Row } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useNavigate } from 'react-router-dom';
import {BsPlusSquareFill} from 'react-icons/bs'
import dayjs from 'dayjs';
import { useState } from 'react';

function TicketPage(props)
{
    return (
        <TicketTable services={props.services} setMessage={props.setMessage}></TicketTable>
      );
}
function TicketTable(props)
{
    const navigate=useNavigate();
    const [busy,setBusy]=useState(false);
    return (
      <>
      <Container>
        <Row>
          <Col>
    <Table>
        <thead>
          <tr>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>
          {
            props.services.map((s) => <ServiceRow service={s} key={s.id}setMessage={props.setMessage} busy={busy} setBusy={setBusy}/>)
          }
       </tbody>
      </Table>
      </Col>
      </Row>
     
      </Container>
      </>
                              
    );
}

function ServiceRow(props)
{
  
        return (
          <tr><ServiceData service={props.service} setMessage={props.setMessage} busy={props.busy} setBusy={props.setBusy}/></tr>
        );
      }

  function ServiceData(props)
  {   const giveTicket=(s)=>
    {
        if(!props.busy)
        {props.setMessage(s.name);
          props.setBusy(true);
        setTimeout(()=>
        {
          props.setMessage("ciao");
          props.setBusy(false);
        },5000)
      }
    }
     return(
      <>
        <td>{props.service.name}</td>
        <td><BsPlusSquareFill onClick={()=> giveTicket(props.service)}/></td>
        </>
  );
  }
export { TicketPage };
