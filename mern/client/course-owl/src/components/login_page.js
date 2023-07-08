import { Button, Divider, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput } from '@mui/material';
import { CssBaseline, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { color, Container, Stack } from "@mui/system";
import logo from '../assets/owl.png'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import * as React from 'react';
import { FormControl } from '@mui/base';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
        // height : 600
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
    const [showPassword, setShowPassword] = React.useState(false);
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [validEmail,setValidEmail] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleLogin = () => {
        setValidEmail(/^\S+@\S+$/.test(email) ? true : false)
        if (validEmail) {
            console.log(email,password)
        };
        
    };
    
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
                        <TextField  placeholder='courseowl@gmail.com' id="outlined-basic" variant="outlined" size = "small" 
                            onChange={(event) => {
                            setEmail(event.target.value);
                            setValidEmail(true);
                        }}>
                        </TextField>
                        {!validEmail && email!="" && <Typography sx = {{color:"#1e88e5" }}>Invalid email</Typography>}
                    </Stack>
                    <Stack paddingTop={3} sx = {styles.stack}>
                        <Typography  >
                            Password <span style ={{fontWeight:"bold", color:"#1e88e5"}}>*</span>
                        </Typography>
                        <FormControl variant="outlined" sx ={{m:30}}>
                            <OutlinedInput placeholder='Your password' size="small" fullWidth id="outlined-adornment-password" 
                                type={showPassword ? 'text' : 'password'} 
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} 
                                            onMouseDown={handleMouseDownPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange = {(event) => {setPassword(event.target.value);
                            }}/>
                        </FormControl>
                        <Link href="#" underline="hover" paddingBottom={3} sx = {{color:"#1e88e5" }}>
                        Forgot Password?
                        </Link>
                        <Link href="#" underline="none">
                        <Button sx = {{backgroundColor:"#1e88e5", fontWeight:"bold"}} fullWidth variant="contained" onClick={handleLogin}>Login</Button>
                        </Link>
                    </Stack>
                    <Grid paddingTop={3} paddingBottom={2} sx = {styles.stack} container direction="column" justifyContent="center" alignItems="center">
                            <Link color="#1e88e5" href="/register" underline="hover">
                                Need an account? Register!
                            </Link>
                            <Link color="#1e88e5" href="#" underline="hover">
                                Continue as Guest
                            </Link>
                    </Grid>
                    <Divider sx={styles.stack}> <Typography fontWeight={'bold'} variant="subtitle2">OR</Typography></Divider>
                    {/* <Typography sx={styles.stack} color="#1e88e5" >Sign in using...</Typography> */}
                    {/* <Grid paddingTop={3} paddingBottom={2} sx = {styles.stack} container direction="column" justifyContent="center" alignItems="center">
                            <Link href="#" underline="hover">
                                <Button size= "large" sx={{background:"white", color:"black"}} variant="outlined"><GoogleIcon color="black" paddingRight={3}/><span paddingLeft={3}>Google</span></Button>
                            </Link>
                            <Link  href="#" underline="hover">
                                Continue as Guest
                            </Link>
                    </Grid> */}
                   
                </Box>
            </Box>
        </CssBaseline >

    );
};