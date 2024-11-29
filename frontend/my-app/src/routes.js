import Auth from "./pages/auth"
import Registration from "./pages/registration"
import MakeRequest from "./pages/makeRequest"
import Request from "./pages/request"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, MAKE_REQUEST_ROUTE, REQUEST_ROUTE, ADMIN_ROUTE } from "./utils/consts"
import Admin from "./pages/admin"

export const authRoutes = [

]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: MAKE_REQUEST_ROUTE,
        Component: MakeRequest
    },
    {
        path: REQUEST_ROUTE,
        Component: Request
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]
