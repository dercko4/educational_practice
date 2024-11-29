import React, { useContext } from "react"; 
import {Routes, Route, Navigate} from 'react-router-dom'  
import { publicRoutes } from "../routes"; 
import {LOGIN_ROUTE, REGISTRATION_ROUTE, MAKE_REQUEST_ROUTE, REQUEST_ROUTE, ADMIN_ROUTE} from "../utils/consts"; 
import { Context } from "../index"; 

const AppRouter = () => { 
    const {user} = useContext(Context)
    let isAuth = user.getisAuth()
    
    return( 
    <Routes> 
        {isAuth && publicRoutes.map(({path, Component}) => 
            <Route key = {path} path ={path} element = {<Component/>} exact/> 
    )} 
        {publicRoutes.map(({path, Component}) => 
        <Route key = {path} path ={path} element = {<Component/>} exact/> 
    )} 
    <Route>
        {publicRoutes.map(({path, Component}) =>
        <Route  path="*" element = {<Navigate> to={LOGIN_ROUTE}</Navigate>} replace/>
    )}
    </Route>
    <Route>
        {publicRoutes.map(({path, Component}) =>
        <Route  path="*" element = {<Navigate> to={REGISTRATION_ROUTE}</Navigate>} replace/>
    )}
    </Route>
    <Route>
        {publicRoutes.map(({path, Component}) =>
        <Route  path="*" element = {<Navigate> to={MAKE_REQUEST_ROUTE}</Navigate>} replace/>
    )}
    </Route>
    <Route>
        {publicRoutes.map(({path, Component}) =>
        <Route  path="*" element = {<Navigate> to={REQUEST_ROUTE}</Navigate>} replace/>
    )}
    </Route>
    <Route>
        {publicRoutes.map(({path, Component}) =>
        <Route  path="*" element = {<Navigate> to={ADMIN_ROUTE}</Navigate>} replace/>
    )}
    </Route>
    </Routes> 
    ) 
};
export default AppRouter;