import {Table} from "react-bootstrap"
import "./table.scss"
import {useDispatch, useSelector} from "react-redux";
import {ChevronDown} from "react-bootstrap-icons";
import React, {useEffect, useMemo} from "react";
import {getPosts} from "../../redux/reducers/post-reducer";
import {AppDispatch, AppState} from "../../redux/store";
import {Post} from "../../services/api-types";


const TableComponent: React.FC = (): React.ReactElement => {
    const posts = useSelector<AppState>(state => state.posts) as Array<Post>;
    const currentPage = useSelector<AppState>(state => state.currentPage) as number;
    console.log("currentPage", currentPage);
    console.log(posts.slice(currentPage * 10, 10));
    const start = currentPage * 10
    const tableTrElement =  posts.slice(start,start+10).map(
        post => {
            return (
                <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                </tr>
            )
        }
    )

    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts())
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>
                    ID
                    <button>
                        <ChevronDown color={"white"}/>
                    </button>
                </th>
                <th>
                    Заголовок
                    <button>
                        <ChevronDown color={"white"}/>
                    </button>
                </th>
                <th>
                    Описание
                    <button>
                        <ChevronDown color={"white"}/>
                    </button>
                </th>
            </tr>
            </thead>
            <tbody>
            {tableTrElement}
            </tbody>
        </Table>
    )
}
export default TableComponent