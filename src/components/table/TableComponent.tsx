import {Table} from "react-bootstrap"
import "./table.scss"
import {useDispatch, useSelector} from "react-redux";
import {ChevronDown, Search} from "react-bootstrap-icons";
import React, {useEffect, useMemo} from "react";
import {actions, getPosts, PostState} from "../../redux/reducers/post-reducer";
import {AppDispatch, AppState} from "../../redux/store";
import {useNavigate, useParams} from "react-router-dom";
import PaginationComponent from "../pagination/PaginationComponent";


const TableComponent: React.FC = (): React.ReactElement => {
    const {posts, search, sortBy, sortDirection} = useSelector<AppState>(state => state) as PostState;
    const {page} = useParams();
    let navigate = useNavigate();

    const onChangeTasksInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.search(e.target.value))
    }

    const start = ((page || 0) as number) * 10

    const elements = useMemo(() => {
        const tmp = [...(search ? posts.filter(value => value.title.includes(search) || value.body.includes(search)) : posts)];
        if (sortBy) {
            // @ts-ignore
            tmp.sort((a, b) => (sortDirection === "desc" ? a[sortBy] > b[sortBy] ? 1 : -1 : b[sortBy] > a[sortBy] ? 1 : -1));
        }
        return tmp;
    }, [posts, search, sortBy, sortDirection])
    const tableTrElement = useMemo(() => {
        return elements.slice(start, start + 10).map(
            post => {
                return (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                    </tr>
                )
            }
        );
    }, [elements, start])

    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts())
    }, [])

    const handlerSort = (column: string) => {
        dispatch(actions.sort(column));
    }

    const onPageChange = (next: number) => {
        if (((page || 0) as number) !== next) {
            navigate("/" + next, {replace: true});
        }
    }

    return (
        <div>
            <div className="search">
                <form>
                    <input type="text" placeholder="Поиск" onChange={onChangeTasksInput} value={search}/>
                    <button type="submit">
                        <Search color={"white"}/>
                    </button>
                </form>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th onClick={() => handlerSort("id")}>
                        ID
                        {sortBy === "id" && <ChevronDown className={sortDirection === "asc" ? "asc" : "desc"} color={"white"}/>}
                    </th>
                    <th onClick={() => handlerSort("title")}>
                        Заголовок
                        {sortBy === "title" && <ChevronDown className={sortDirection === "asc" ? "asc" : "desc"} color={"white"}/>}
                    </th>
                    <th onClick={() => handlerSort("body")}>
                        Описание
                        {sortBy === "body" && <ChevronDown className={sortDirection === "asc" ? "asc" : "desc"} color={"white"}/>}
                    </th>
                </tr>
                </thead>
                <tbody>
                {tableTrElement}
                </tbody>
            </Table>

            <PaginationComponent count={elements.length} max={10} onChange={onPageChange}
                                 page={parseInt(page || "0")}/>
        </div>

    )
}
export default TableComponent