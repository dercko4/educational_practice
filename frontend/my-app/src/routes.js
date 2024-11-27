import Auth from "./pages/auth"
//import Admin from "./pages/admin"
import {LOGIN_ROUTE} from "./utils/consts"

export const authRoutes = [
   
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]