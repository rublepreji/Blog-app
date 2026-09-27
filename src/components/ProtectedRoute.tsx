import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import {type ReactNode } from "react";

interface ProtectedRouteType{
    children:ReactNode
}

function ProtectedRoute({children}:ProtectedRouteType){
    const {user,loading} = useAuth()
    if(loading){
        return <h3>Loading authetication...</h3>
    }

    if(!user){
        <Navigate to='/login' replace/>
    }

    return children
}

export default ProtectedRoute;