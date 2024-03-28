import { useSelector } from "react-redux";
import Dashboard from "../components/dashboard";
import Landing from "../components/landing";
import { Routes,Route, useNavigate, Navigate } from "react-router-dom";
import Signup from "../components/Signup";
import { Login } from "../components/login";
import Coming from "../components/coming";
import Features from "../components/features";
import AddTodo from "../components/newTodo";
import EditTodo from "../components/editTodo"
export default function AllRoutes(){
    let auth=localStorage.getItem("token")
    return (
        <Routes>
            <Route path={"/"} element={<Landing/>}/>
            <Route path={"/dashboard"} element={auth?<Dashboard/>:<Navigate to = {"/login"}/>}/>
            <Route path={"/login"} element={auth?<Navigate to ={"/dashboard"}/>:<Login/>}/>
            <Route path={"/signup"} element={<Signup/>}/>
            <Route path={"/coming"} element={<Coming/>}/>
            <Route path={"/features"} element={<Features/>}/>
            <Route path={"/newtodo"} element={<AddTodo/>}/>
            <Route path={"/edittodo/:id"} element={<editTodo/>}/>
        </Routes>
    )
}