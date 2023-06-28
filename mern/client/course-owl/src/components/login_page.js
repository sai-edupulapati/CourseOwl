import { CssBaseline } from "@mui/material";
import { Box } from "@mui/material";

const styles = {
    box: {
        background: "radial-gradient(white,#e1f5fe)",
        boxShadow: "3px 1px 50px -7px #73CDF4",
        transition: 'box-shadow 0.3s ease',
        '&:hover' : {
            boxShadow: "3px 1px 51px 7px #73CDF4" 
        },
        borderRadius : 4
    },
};
export default function MainLogin() {

    return (
        <CssBaseline>
        <Box display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh">
        <Box sx={{...styles.box, width:400, height:600} }>
            
        </Box>
        </Box>
        
        </CssBaseline >

    );
};