import "./content.scss"
import {Col, Container, Form, Row} from "react-bootstrap";
import SearchComponent from "./input-search/SearchComponent";
import TableComponent from "./table/TableComponent";
import FooterComponent from "./footer/FooterComponent";

const Content: React.FC = (): React.ReactElement => {


    return (
        <div className={"content-wr"}>
          <Container>
              <Container fluid>
                  <Row>
                      <Col xs={12} md={8}>
                          <SearchComponent/>
                      </Col>
                      <Col xs={12} md={12}>
                          <TableComponent/>
                      </Col>
                      <Col xs={12} md={12}>
                          <FooterComponent/>
                      </Col>
                  </Row>
              </Container>
          </Container>
        </div>
    )
}
export default Content