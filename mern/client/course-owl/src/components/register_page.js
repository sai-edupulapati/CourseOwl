import { Alert, Button, Checkbox, Divider, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Snackbar } from '@mui/material';
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
import { useErrorAlert } from "../hooks/useErrorAlert";
import * as Realm from "realm-web";
import { useApp } from "./RealmApp";
import { useNavigate } from 'react-router-dom';
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
    },
    stack : {
        paddingLeft : 3,
        paddingRight : 3
    }
};

export default function Register() {
    const navigate = useNavigate();
    const app = useApp();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);
    const [password,setPassword] = React.useState("");
    const [password2,setPassword2] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [validEmail,setValidEmail] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    const [checked,setChecked] = React.useState(false);
    const handleCheck = (event) => {
        setChecked(event.target.checked);
    }
    const [text,setText] = React.useState("");
    const [openSnackBar,setOpenSnackBar] = React.useState(false);
    const [severity,setSeverity] = React.useState("info");
  
    async function onSubmit() {
        try {
            await app.emailPasswordAuth.registerUser({ email, password });
            navigate('/login');
        } catch (err) {
            if (err instanceof Realm.MongoDBRealmError){
                setSeverity("error");
                setText(err.error);                
                setOpenSnackBar(true);
            } else {
                setSeverity("error");
                setText("Unkown error, please try again later");                
                setOpenSnackBar(true); 
            }
        }  
    }
    
    React.useEffect(() =>  {
        setValidEmail(((/^\S+@\S+$/.test(email)) || email==="") ? true : false);
    },[email]);
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleRegister = () => {
        if (email!=="") {
            if (validEmail) {
                if (password!=="") {
                    if (password2!=="") {
                        if (password===password2) {
                            onSubmit();
                        } else {

                            setText("Passwords do not match");
                            setSeverity("error")
                            setOpenSnackBar(true);    
                        }

                    } else {
                        setText("Please confirm your password");
                        setSeverity("info")
                        setOpenSnackBar(true);
                    }
                } else {
                    setText("Please set your password");
                    setSeverity("info")
                    setOpenSnackBar(true);
                }

            } else {
                    setText("Invalid email")
                    setSeverity("error")
                    setOpenSnackBar(true);

            }

        } else {
            setSeverity("info")
            setText("Please enter your email id");
            setOpenSnackBar(true);
        }
    };
    
    const handleSnackbarClose = () => {
        setOpenSnackBar(false);
    }

    return (
        <CssBaseline>
            <Snackbar  autoHideDuration={2000} anchorOrigin={{ vertical:"bottom", horizontal:"right" }} open={openSnackBar}
                onClose={handleSnackbarClose}>
                <Alert variant="outlined" severity={severity}>
                    {text}
                </Alert>
            </Snackbar>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Box sx={{...styles.box} }>
                    <Container sx = {{...styles.container, paddingTop:5}} >
                        <img style = {styles.icon} src = {logo} alt = "logo"/>
                        <Typography variant="h4" fontWeight='bold'>CourseOwl</Typography>
                    </Container>
                    <Stack sx={{...styles.container,paddingTop:1}}>
                        <Typography variant="h6" fontWeight='bold' sx = {{color:"#1e88e5"}}>Want to join us?</Typography> 
                        <Typography fontWeight='bold' sx={{color:"#79b8f0"}}>Create an account below!</Typography>
                    </Stack>
                    <Stack paddingTop={1} sx = {styles.stack}>
                        <Typography  >
                            Email address <span style ={{fontWeight:"bold", color:"#1e88e5"}}>*</span>
                        </Typography>
                        <TextField  placeholder='courseowl@gmail.com' id="outlined-basic" variant="outlined" size = "small" 
                            onChange={(event) => {
                            setEmail(event.target.value);
                            //setValidEmail(true);
                        }}>
                        </TextField>
                        {/* {!validEmail && email!=="" && <Typography sx = {{color:"#1e88e5" }}>Invalid email</Typography>} */}
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
                    </Stack>
                    <Stack paddingTop={3} sx = {styles.stack}>
                    <Typography>
                            Confirm Password <span style ={{fontWeight:"bold", color:"#1e88e5"}}>*</span>
                        </Typography>
                        <FormControl variant="outlined" sx ={{m:30}}>
                            <OutlinedInput placeholder='Confirm your password' size="small" fullWidth id="outlined-adornment-password2" 
                                type={showPassword2 ? 'text' : 'password'} 
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword2} 
                                            onMouseDown={handleMouseDownPassword} edge="end">
                                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange = {(event) => {setPassword2(event.target.value);
                            }}/>
                        </FormControl>
                        
                            <Typography fontSize={10} sx = {{color : "#1e88e5", paddingTop:1}}>
                                <Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 16}, paddingLeft:0,paddingRight:1, color:"#79b8f0" }} checked={checked} onChange={handleCheck}/> 
                                    I accept the terms and conditions
                            </Typography>
                        
                        <Link sx = {{paddingTop:3}} href="#" underline="none">
                            <Button disabled={!checked} sx = {{ backgroundColor:"#1e88e5", fontWeight:"bold"}} fullWidth variant="contained" onClick={handleRegister}>
                                Register
                            </Button>
                        </Link>
                    </Stack>
                    
                    <Grid paddingTop={3} paddingBottom={2} sx = {styles.stack} container direction="column" justifyContent="center" alignItems="center">
                            <Link color="#1e88e5" href="login" underline="hover">
                                Have an account? Login!
                            </Link>
                            <Link color="#1e88e5" href="#" underline="hover">
                                Continue as Guest
                            </Link>
                    </Grid>
                    <Divider sx={styles.stack}> <Typography fontWeight={'bold'} variant="subtitle2">OR</Typography></Divider>
                    <Container sx={{...styles.container, paddingBottom:4}} >
                        <Typography textAlign="center">By creating an account, you agree with our <Link color="#1e88e5" href="#" underline="hover">
                            Terms of Service and Private Policy
                        </Link></Typography>
                        
                    </Container>
                </Box>
            </Box>
        </CssBaseline >

    );
};
