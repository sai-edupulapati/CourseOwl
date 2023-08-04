import { Autocomplete, TextField } from "@mui/material";
import { useCollection } from "../hooks/useCollection";
import React from 'react'
import { Button } from "@mui/base";




const  Review=()=>{
  const [allInfoList, setAllInfoList] = React.useState([])
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [rev, setRev] = React.useState('');
     const handleAutocompleteChange = (event, value) => {
         setSelectedOption(value);
       };
     const collection = useCollection({cluser: "mongodb-atlas",db:"Professors",collection:"Info"})
     
     const ExtractProfNames = async() => {
         const needed = await (collection.find())
       
         setAllInfoList(needed)
     }
  function AddReview() {
   
    console.log("rev before ",rev)
      return(
      <>
      <div>
      <TextField 
            style={{paddingTop:100}}
            id="outlined-multiline-static"
            multiline
            rows={4}
            placeholder="Write a review"
            value={rev}
          onChange={(event) => {
            setRev(event.target.value);
          }}
          />
          </div>
      <Button
    
      onClick={() => {
          handleAdd()
        }}
      >Add a review</Button>
      </>)
  }
  async function handleAdd(props) {
    console.log("rev" , rev)
      if (inputValue == null || inputValue==="") {
          console.log("Enter name")
      } else {
          await collection.findOneAndReplace({Name : selectedOption.Name},({Name : selectedOption.Name},{" Department" : selectedOption[" Department"]},{" Email" : selectedOption[" Email"]},{" Photo" : selectedOption[" Photo"]},{Review:rev}))
      }
  }
  var photo
  var title
  var email
   
    React.useEffect(() => {
        ExtractProfNames()
      }, []);
    const defaultProps = {
        options: allInfoList,
        getOptionLabel: (option) => option.Name,
      };
      
      try {
      photo = (selectedOption[" Photo"])
      
      } catch {
        photo = ("")
      }
      try {
        title = selectedOption[" Department"]
      } catch {
        title = "No title"
      }
      try {
        email = selectedOption[" Email"]
      } catch {
        email = "No email"
      }
  console.log(selectedOption)
    return (   
        <>
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
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Name" />} />
  { <img src = {photo} alt="No photo available" ></img> }
  <div>{title}</div>
  <div></div>
  <div>{email}</div>
  <AddReview></AddReview>
  </>
    

    )  
}
export default Review