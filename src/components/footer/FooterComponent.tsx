import {Col, Container, Row} from "react-bootstrap";
import "./footer.scss"
import PaginationComponent from "../pagination/PaginationComponent";
import {useSelector} from "react-redux";
import {AppState} from "../../redux/store";
import React from "react";
import {Post} from "../../services/api-types";

const FooterComponent: React.FC = (): React.ReactElement => {
    const posts = useSelector<AppState>(state => state.posts) as Array<Post>;

    const onPageChange = (page: number) => {
        console.log(page);
        // TODO изменять страницу в сторе.
    }

    return (
        <div className={"footer-wr"}>
            <Container>
                <Row>
                    <Col xs={12}>
                        <PaginationComponent count={posts.length} max={10} onChange={onPageChange}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default FooterComponent