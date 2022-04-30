import {Post} from "../../services/api-types";
import {AppState, InferActionsTypes} from "../store";
import {ThunkAction} from "redux-thunk";
import {ActionCreator, AnyAction} from "redux";
import {getPostsApi} from "../../services/api";


export const actions = {
    setAllPosts: (posts: Array<Post>) => ({type: "SET_All_POSTS", posts} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const),
    setPosts:(inputsPosts: string) => ({type: "SET_POSTS", inputsPosts} as const),
}

export type ImgActionsType = InferActionsTypes<typeof actions>


type Posts = { posts: Array<Post> }
type AllPosts = { allPosts: Array<Post> }
type CurrentPage = { currentPage:  number }
type PostState = Posts & CurrentPage &AllPosts

const initialState: PostState = {
    allPosts: [],
    posts: [],
    currentPage: 0
}

const postReducer = (state = initialState, action: ImgActionsType) => {
    switch (action.type) {
        case "SET_All_POSTS": {
            let copyState = {...state}
            let allPostsCopy = [...copyState.allPosts]
            let postsCopy = [...copyState.posts]
            allPostsCopy=action.posts
            postsCopy = action.posts
            copyState.allPosts = allPostsCopy
            copyState.posts = postsCopy
            return copyState
        }
        case "SET_POSTS": {
            let copyState = {...state}
            let allPostsCopy = [...copyState.allPosts]
            let postsCopy = [...copyState.posts]
            postsCopy= allPostsCopy.filter((post) => {
                return post.title.toLowerCase().includes(action.inputsPosts.toLowerCase()) || post.body.toLowerCase().includes(action.inputsPosts.toLowerCase())
            })
            copyState.posts = postsCopy
            return copyState
        }
        case "SET_CURRENT_PAGE": {
            let copyState = {...state}
            copyState.currentPage = action.currentPage
            return copyState
        }

        default:
            return state;
    }
}

//thunks

export const getPosts: ActionCreator<ThunkAction<void, AppState, {}, AnyAction>> = () => (dispatch) => {
    getPostsApi()
        .then((resp) => {
            dispatch(actions.setAllPosts(resp.data))
        });
}

export default postReducer