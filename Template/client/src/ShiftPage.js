import { Form, Button, Alert, Container, Row, Col ,Table} from 'react-bootstrap';

function ShiftPage(props) {
    return (
        props.services.map((s) => <ServiceTab service={s} key={s.id} setMessage={props.setMessage} />)
    );
  }
function ServiceTab(props)
{
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
                        <tr><td>ciao</td></tr>
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
    
          </Container>
        </>
    )
}
export { ShiftPage };