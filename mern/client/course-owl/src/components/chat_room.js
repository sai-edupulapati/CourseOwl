import { useEffect } from "react";
import { useApp } from "./RealmApp";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import "./chat_styles.css"
import { Box, Stack, TextField } from "@mui/material";

export default function Chat() {
    const app = useApp()
    const navigate = useNavigate()

    useEffect(() => {
        if (!app.currentUser) {
            navigate("/login")
        }
    }, [app.currentUser])

    return (
        <Box sx={{ flexGrow: 1 }} bgcolor={'rgb(219, 227, 236)'} minHeight={'100vh'}>
            <NavBar></NavBar>
            <Stack direction={'row'}>
                <Box>
                    <TextField></TextField>
                </Box>
                <Box></Box>
            </Stack>
        </Box>
    )
}