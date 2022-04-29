import {Post} from "./api-types";
import axios, {AxiosResponse} from "axios";

export const getImages = (): Promise<AxiosResponse<Array<Post>>> => {
    return axios.get("https://jsonplaceholder.typicode.com/photos?_start=0&_limit=24")
}
