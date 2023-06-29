import { Button, Grid, Link } from '@mui/material';
import { CssBaseline, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { color, Container, Stack } from "@mui/system";
import logo from '../assets/owl.png'

const font = "'Belanosima', sans-serif"
const styles = {
    box: {
        background: "radial-gradient(white,#e1f5fe)",
        boxShadow: "3px 1px 50px -7px #73CDF4",
        transition: 'box-shadow 0.3s ease',
        '&:hover' : {
            boxShadow: "3px 1px 51px 7px #73CDF4" 
        },
        borderRadius : 4,
        width:400, 
        height:600
    },
    icon : {
        width : 50,
        hegiht : 50,
        paddingRight : 5
    },
    container : {
        display:"flex",
        justifyContent:"center" ,
        alignItems:"center",
        paddingTop : 5
    },
    stack : {
        paddingLeft : 3,
        paddingRight : 3
    }
};
export default function MainLogin() {

    return (
        <CssBaseline>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Box sx={{...styles.box} }>
                    <Container sx = {{...styles.container}} >
                        <img style = {styles.icon} src = {logo} alt = "logo"/>
                        <Typography variant="h4" fontWeight='bold'>CourseOwl</Typography>
                    </Container>
                    <Stack paddingTop={5} sx = {styles.stack}>
                        <Typography  >
                            Email address <span style ={{fontWeight:"bold", color:"#1e88e5"}}>*</span>
                        </Typography>
                        <TextField id="outlined-basic" label="courseowl@gmail.com" variant="outlined" size = "small">
                        </TextField>
                    </Stack>
                    <Stack paddingTop={3} sx = {styles.stack}>
                        <Typography  >
                            Password <span style ={{fontWeight:"bold", color:"#1e88e5"}}>*</span>
                        </Typography>
                        <TextField id="outlined-basic" label="Your Password" variant="outlined" size = "small">
                        </TextField>
                        <Link href="#" underline="hover" paddingBottom={3} sx = {{color:"#1e88e5" }}>
                        Forgot Password?
                        </Link>
                        <Link href="#" underline="none">
                        <Button sx = {{backgroundColor:"#1e88e5", fontWeight:"bold"}} fullWidth="true" variant="contained">Login</Button>
                        </Link>
                    </Stack>
                    <Grid paddingTop={3} sx = {styles.stack} container direction="column" justifyContent="center" alignItems="center">
                            <Link href="#" underline="hover">
                                Need an account? Register
                            </Link>
                            <Link href="#" underline="hover">
                                Continue as Guest
                            </Link>
                    </Grid>
                    
                </Box>
            </Box>
        </CssBaseline >

    );
};