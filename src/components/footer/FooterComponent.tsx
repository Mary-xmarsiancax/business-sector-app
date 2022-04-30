import {Container} from "react-bootstrap";
import "./footer.scss"
import {useSelector} from "react-redux";
import {AppState} from "../../redux/store";
import React from "react";
import {Post} from "../../services/api-types";

const FooterComponent: React.FC = (): React.ReactElement => {
    const posts = useSelector<AppState>(state => state.posts) as Array<Post>;


    return (
        <div>
            <Container>

            </Container>
        </div>
    )
}
export default FooterComponent