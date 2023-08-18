import { borderRadius, Stack } from "@mui/system"
import NavBar from "./navbar"
import { Paper, createTheme, Typography, Autocomplete, TextField, CircularProgress, Box, InputAdornment } from '@mui/material'
import {ThemeProvider } from '@emotion/react'
import { useCollection } from "../hooks/useCollection"
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

const font = "'Belanosima', sans-serif"
const theme = createTheme({
    typography: {
        fontFamily: font,
        button: {textTransform: "none"}
    }
})

const styles = {
    load : {
        zIndex: 9999, 
        position:'fixed',
        top:'40%',
        left:'47%',
        color:"#1e88e5"
    }
}

const Reviews = () => {
    const [allInfoList, setAllInfoList] = React.useState(null)
    const [inputValue, setInputValue] = React.useState('')
    const [selectedOption, setSelectedOption] = React.useState(null)
    const [loaded, setLoaded] = React.useState(false)

    const collection = useCollection({cluser: "mongodb-atlas",db:"Professors",collection:"Info"})
    let photo, title, email
    //let loaded = false

    React.useEffect(() => {
        ExtractProfNames()
    }, [])
    
    const ExtractProfNames = async() => {
        const needed = await (collection.find())
        setAllInfoList(needed)
        setLoaded(true)
    }

    const handleAutocompleteChange = (event, value) => {
        setSelectedOption(value);
    }

    const defaultProps = {
        options: allInfoList,
        getOptionLabel: (option) => option.Name,
    }
    
    try {
        photo = (selectedOption[" Photo"])
    } catch {
        photo = ""
    }
    try {
        title = selectedOption[" Department"]
    } catch {
        title = ""
    }
    try {
        email = selectedOption[" Email"]
    } catch {
        email = ""
    }
    
    return (
    <>
        {loaded && 
        <Box>
            <Paper>
                <NavBar />
                
                <ThemeProvider theme={theme}>
                    <Stack paddingTop={10} alignItems="center">
                        <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={45} fontWeight={'bold'}>
                            Review your Professors !
                        </Typography>
                        <Autocomplete
                            
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            value={selectedOption} 
                            onChange={handleAutocompleteChange}
                            {...defaultProps}
                            disablePortal
                            id="combo-box-demo"
                            options={allInfoList}
                            sx={{ width: 400 }}
                            renderInput={(params) => 
                                <TextField {...params}
                                    placeholder= "Professor Name" 
                                    style={{paddingTop:20}}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 10
                                        },
                                    }}
                                    InputProps={{
                                        style:{fontSize:30},
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            } 
                        />
                    </Stack>
                </ThemeProvider> 
            </Paper>
        </Box>
        }
        {!loaded &&
            <>
                <NavBar></NavBar>
                <CircularProgress size={100} thickness={6} sx={styles.load} />
            </>
        }
   </>
    )}
export default Reviews