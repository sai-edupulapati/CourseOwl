import { Stack } from '@mui/material';
import logo from '../assets/owl.png';
import "./chat_styles.css"

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