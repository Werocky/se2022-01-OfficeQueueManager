import { Table, Button, Container, Col, Row } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function TicketPage(props)
{
    return (
        <TicketTable services={props.services} setMessage={props.setMessage}></TicketTable>
      );
}
function TicketTable()
{
    const navigate=useNavigate();
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
            props.services.map((i) => <ServiceRow service={s} key={s.id}setMessage={props.setMessage}/>)
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
    const giveTicket=(s)=>
    {
        setMessage(s.name);
        setTimeout
    }
        return (
        <tr><td>{props.service.name}</td>
        <Button onClick={()=> giveTicket(props.service)}></Button>
        </tr>
        );
      }
export { TicketPage };

