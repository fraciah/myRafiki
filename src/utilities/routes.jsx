import Home from "../pages/web/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import MyPosts from "../pages/web/MyPosts";
import NewPost from "../pages/web/NewPost";
import Posts from "../pages/web/Posts";
import Videos from "../pages/web/Videos";
import Articles from "../pages/web/Articles";
import Error404 from "../pages/error/Error404";

export default [
    {
        path: "/",
        page: Home,
    },
    {
        path: "/register",
        page: Register,
    },
    {
        path: "/login",
        page: Login,
    },
    {
        path: "/posts",
        page: Posts,
    },
    {
        path: "/myposts",
        page: MyPosts,
    },
    {
        path: "/newpost",
        page: NewPost,
    },
    {
        path: "/articles",
        page: Articles,
    },
    {
        path: "/videos",
        page: Videos,
    },
    {
        path: "*",
        page: Error404,
    },
];