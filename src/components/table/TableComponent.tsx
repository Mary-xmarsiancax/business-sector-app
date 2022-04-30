import {Table} from "react-bootstrap"
import "./table.scss"
import {useDispatch} from "react-redux";
import {ChevronDown} from "react-bootstrap-icons";
import React, {useEffect} from "react";
import {getPosts} from "../../redux/reducers/post-reducer";
import {AppDispatch} from "../../redux/store";


const TableComponent: React.FC = (): React.ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts())
    },[])

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>
                    ID
                    <button>
                        <ChevronDown color={"white"} />
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
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
            </tr>
            </tbody>
        </Table>
    )
}
export default TableComponent