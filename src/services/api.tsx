import {Post} from "./api-types";
import axios, {AxiosResponse} from "axios";

export const getPostsApi = (): Promise<AxiosResponse<Array<Post>>> => {
    return axios.get("https://jsonplaceholder.typicode.com/posts")
}
