import Home from "../pages/web/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import About from "../pages/web/About";
import Stories from "../pages/web/Stories/Stories";
import MyStories from "../pages/web/Stories/MyStories";
import NewStory from "../pages/web/Stories/NewStory";
import ViewStory from "../pages/web/Stories/ViewStory";
import EditStory from "../pages/web/Stories/EditStory";
import WellnessVideos from "../pages/web/WellnessVideos";
import WellnessInsights from "../pages/web/WellnessInsights";
import ResetPassword from "../pages/auth/ResetPassword";
import Error404 from "../pages/error/Error404";

export default [
    {
        path: "/",
        element: Home,
    },
    {
        path: "/register",
        element: Register,
    },
    {
        path: "/login",
        element: Login,
    },
    {
        path: "/about",
        element: About,
    },
    {
        path: "/stories",
        element: Stories,
    },
    {
        path: "/mystories",
        element: MyStories,
    },
    {
        path: "/newstory",
        element: NewStory,
    },
    {
        path: "/viewstory/:id",
        element: ViewStory,
    },
    {
        path: "/editstory/:id",
        element: EditStory,
    },
    {
        path: "/wellness-insights",
        element: WellnessInsights,
    },
    {
        path: "/wellness-videos",
        element: WellnessVideos,
    },
    {
        path: "/reset-password",
        element: ResetPassword,
    },
    {
        path: "*",
        element: Error404,
    },
];