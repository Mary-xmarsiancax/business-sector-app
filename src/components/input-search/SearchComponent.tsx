import React, {useState} from "react";
import "./search.scss"
import {Search} from "react-bootstrap-icons";

const SearchComponent: React.FC = (): React.ReactElement => {
    const [inputsText, setInputsText] = useState("")

    const onChangeTasksInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputsText(e.target.value)
        console.log("inputsText",e.target.value);
    }

    return (
        <div className="search">
            <form>
                <input type="text" placeholder="Поиск" onChange={onChangeTasksInput} value={inputsText}/>
                <button type="submit">
                    <Search color={"white"}/>
                </button>
            </form>
        </div>
    )
}
export default SearchComponent