import { useEffect } from "react";
import { useApp } from "./RealmApp";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";

export default function Chat() {
    const app = useApp()
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (app.currentUser) {
    //       console.log(app.currentUser.id)
    //       setButtonText("Log Out")
    //     } else {
    //       setButtonText("Log In")
    //     }
    //   }, [app.currentUser])

    useEffect(() => {
        if (!app.currentUser) {
            navigate("/login")
        }
    }, [app.currentUser])

    return (
        <div>
            <NavBar></NavBar>
        </div>
    )
}