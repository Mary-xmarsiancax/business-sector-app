import {Col, Container, Row} from "react-bootstrap";
import "./footer.scss"
import PaginationComponent from "../pagination/PaginationComponent";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/store";
import React from "react";
import {Post} from "../../services/api-types";
import {actions} from "../../redux/reducers/post-reducer";

const FooterComponent: React.FC = (): React.ReactElement => {
    const posts = useSelector<AppState>(state => state.posts) as Array<Post>;
    const dispatch = useDispatch()

    const onPageChange = (page: number) => {
        dispatch(actions.setCurrentPage(page))
    }

    return (
        <div>
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