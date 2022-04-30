import {Post} from "../../services/api-types";
import {AppState, InferActionsTypes} from "../store";
import {ThunkAction} from "redux-thunk";
import {ActionCreator, AnyAction} from "redux";
import {getPostsApi} from "../../services/api";


export const actions = {
    setPosts: (posts: Array<Post>) => ({type: "SET_POSTS", posts} as const),
    search: (input: string) => ({type: "SEARCH", input} as const),
    sort: (column: string) => ({type: "SORT", column} as const),
}

export type PostsActionType = InferActionsTypes<typeof actions>


export type PostState = { posts: Array<Post>; sortBy?: string; sortDirection: string, search: string }

const initialState: PostState = {
    posts: [],
    sortBy: undefined,
    sortDirection: "asc",
    search: ""
}

const postReducer = (state = initialState, action: PostsActionType) => {
    switch (action.type) {
        case "SET_POSTS": {
            return {...state, posts: action.posts}
        }
        case "SEARCH": {
            return {...state, search: action.input}
        }

        case "SORT": {

            if (state.sortBy === undefined && state.sortBy !== action.column) {
                return {
                    ...state,
                    sortBy: action.column,
                    sortDirection: "asc"
                }
            } else if (state.sortBy === action.column && state.sortDirection === "asc") {
                return {
                    ...state,
                    sortBy: action.column,
                    sortDirection: "desc"
                }
            } else {
                return {
                    ...state,
                    sortBy: undefined,
                    sortDirection: "asc"
                }
            }
        }

        default:
            return state;
    }
}

//thunks

export const getPosts: ActionCreator<ThunkAction<void, AppState, {}, AnyAction>> = () => (dispatch) => {
    getPostsApi()
        .then((resp) => {
            dispatch(actions.setPosts(resp.data))
        });
}

export default postReducer