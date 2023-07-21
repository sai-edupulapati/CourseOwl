import { useEffect } from "react";
import { useApp } from "./RealmApp";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import "./chat_styles.css"
import { Box, Stack, TextField, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import ChatRoom from "./course_chat_room";
import Message from "./message";

const font = "'Belanosima', sans-serif"
const theme = createTheme({
    typography: {
        fontFamily: font,
        button: {textTransform: "none"}
    }
})

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
            <Box paddingTop={'20px'}>
                <Stack direction={'row'}>
                    <Box paddingLeft={'25px'} paddingRight={'25px'} minHeight={'100vh'} width={'33vw'}>
                        <ThemeProvider theme={theme}>
                            <TextField label="Enter Course" variant="standard" fullWidth/>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>
                            <ChatRoom></ChatRoom>   
                        </ThemeProvider>
                    </Box>
                    <Box>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}