import Home from "../pages/web/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Chat from "../pages/web/Chats";
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
        path: "/chats",
        page: Chat,
    },
    {
        path: "*",
        page: Error404,
    },
];