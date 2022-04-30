import {Post} from "../../services/api-types";
import {AppState, InferActionsTypes} from "../store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action, ActionCreator, AnyAction, Dispatch} from "redux";
import {getPostsApi} from "../../services/api";


export const actions = {
    setPosts: (posts: Array<Post>) => ({type: "SET_POSTS", posts} as const)
}

export type ImgActionsType = InferActionsTypes<typeof actions>


type Posts = { posts: Array<Post> }
type PostState = Posts

const initialState: PostState = {
    posts: [],
}

const postReducer = (state = initialState, action: ImgActionsType) => {
    switch (action.type) {
        case "SET_POSTS": {
            let copyState = {...state}
            let postsCopy= [...copyState.posts]
            postsCopy = action.posts
            copyState.posts = postsCopy
            console.log("copyState",copyState);
            return copyState
        }

        default:
            return state;
    }
}

//thunks

export const getPosts: ActionCreator<ThunkAction<void, AppState, {}, AnyAction>> = () => (dispatch) => {
    console.log("я в санке");
    getPostsApi()
        .then((resp) => {
            dispatch(actions.setPosts(resp.data))
        });
}

export default postReducer