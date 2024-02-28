import { Router,Routes,Route } from "react-router-dom";
import LogIn from "../../pages/LogIn/LogIn";
import SignUp from "../../pages/SignUp/SignUp";
import App from "../../App";

// this component in routing to the entry point in the application
export default function RoutingComponent() {




    return(
    <Routes>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signin" element={<SignUp/>}/>
        <Route path="*" element={<App/>}/>
    </Routes>
    )
}