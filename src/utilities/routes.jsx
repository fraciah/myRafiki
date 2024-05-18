import Home from "../pages/web/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import MyStories from "../pages/web/MyStories";
import NewStory from "../pages/web/NewStory";
import Stories from "../pages/web/Stories";
import ViewStory from "../pages/web/ViewStory";
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
        path: "/stories",
        page: Stories,
    },
    {
        path: "/mystories",
        page: MyStories,
    },
    {
        path: "/newstory",
        page: NewStory,
    },
    {
        path: "/viewstory/:id",
        page: ViewStory,
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