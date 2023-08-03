import { Autocomplete, TextField } from "@mui/material";
import { useCollection } from "../hooks/useCollection";
import React from 'react'
import { Button } from "@mui/base";


function handleAdd() {
    if (selectedOption==null) {
        console.log("Enter name")
    } else {

    }
}
function AddReview() {
    return(
    <>
    <Button
    onClick={() => {
        handleAdd()
      }}
    >Add a review</Button>
    </>)
}
const  Review=()=>{
    const [allInfoList, setAllInfoList] = React.useState([])
 const [selectedOption, setSelectedOption] = React.useState(null);
    const handleAutocompleteChange = (event, value) => {
        setSelectedOption(value);
      };
    const collection = useCollection({cluser: "mongodb-atlas",db:"Professors",collection:"Info"})
    const ExtractProfNames = async() => {
        const needed = await (collection.find())
        console.log(typeof(needed))
        setAllInfoList(needed)
    }
    React.useEffect(() => {
        ExtractProfNames()
      }, []);
    console.log(allInfoList)
    const defaultProps = {
        options: allInfoList,
        getOptionLabel: (option) => option.Name,
      };
      console.log(selectedOption)
    return (   
        <>
    <Autocomplete
    
      value={selectedOption} 
      onChange={handleAutocompleteChange}
    {...defaultProps}
  disablePortal
  id="combo-box-demo"
  options={allInfoList}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Name" />} />
  <AddReview ></AddReview>
  </>
    

    )  
}
export default Review