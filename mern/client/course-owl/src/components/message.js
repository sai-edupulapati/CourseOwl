import { Stack } from '@mui/material';
import logo from '../assets/owl.png';
import { createTheme } from '@mui/material';
import "./chat_styles.css"
import { ThemeProvider } from '@emotion/react';

const font = "'Belanosima', sans-serif"
const theme = createTheme({
    typography: {
        fontFamily: font,
        button: {textTransform: "none"}
    }
})

export default function Message() {
    return (
        <div className="message">
            <div className="messageTop">
                <Stack direction={'row'} alignItems={'center'}>
                        <img src={logo} className='messageImage'></img>
                        <p className="messageText">Hello this is a message</p>
                </Stack>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}