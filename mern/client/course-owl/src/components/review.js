import { Autocomplete, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import { useCollection } from "../hooks/useCollection";
import React from 'react'
import { Button } from "@mui/base";
import { FixedSizeList } from 'react-window';

const  Review=()=>{
  const [allInfoList, setAllInfoList] = React.useState([])
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [rev, setRev] = React.useState('');
 
  function renderRowWithAdditional(reviews) {
    return function renderRow({ index, style }) {
      const review = reviews[index]
      return (
        <ListItem style={style} key={index} component="div" disablePadding>
          <ListItemButton>
            <ListItemText primary={review} />
          </ListItemButton>
        </ListItem>
      );
    };
  }
  
  const ShowReviews = () => {
    if ( selectedOption == undefined || selectedOption==null || selectedOption["Reviews"] == null || selectedOption["Reviews"] == undefined) {
      return(<></>)
    } 
    console.log("showing reviews")
    const reviewText = selectedOption["Reviews"] 
   console.log(reviewText)
    const number = reviewText.length
    return (
      <FixedSizeList
        height={400}
        width={'100%'}
        itemSize={50}
        itemCount={number}
        overscanCount={5}
      >
        {renderRowWithAdditional(reviewText)}
      </FixedSizeList>
   
    )
  }
     const handleAutocompleteChange = (event, value) => {
         setSelectedOption(value);
       };
     const collection = useCollection({cluser: "mongodb-atlas",db:"Professors",collection:"Info"})
     
     const ExtractProfNames = async() => {
         const needed = await (collection.find())
       
         setAllInfoList(needed)
     }
  
  async function handleAdd() {
    console.log("rev" , rev)
      if (inputValue == null || inputValue==="") {
          console.log("Enter name")
      } else {
        console.log("id",selectedOption._id)
          const filter = {_id : selectedOption._id}
          const options = { upsert: false };
          console.log("review",selectedOption["Reviews"])
          const temp = {
            _id : selectedOption._id,
            Name : selectedOption.Name,
            " Department" : selectedOption[" Department"],
            " Email" : selectedOption[" Email"],
            " Photo" : selectedOption[" Photo"],
            Reviews: [...(selectedOption["Reviews"] || []), rev]
          }
         
          const update = {
            $set: temp
          }
          const result2 = await collection.updateOne(filter,update,options)
          setSelectedOption(temp)
           console.log("end",result2)
           setRev('')

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
      console.log("now")
     
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
    
      onClick={handleAdd}
      >Add a review</Button>
  {<ShowReviews></ShowReviews> }
  </>
  

    )  
}
export default Review