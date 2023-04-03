import React from 'react'
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const sideBarContent = [
  {typography:"All Categories", pathname:"/table-data?category=true"}, {typography:"All Vehicles", pathname:"/table-data?vehicle=true"},
  {typography:"Add Category", pathname:"/form-addCategory"}, {typography:"Add vehicle", pathname:"/form-addVehicle"}
]

const Sidebar = () => {
  const navigate  = useNavigate();
  return (
    <Grid sx={{display:"flex", width:"100%", mt:8.5, flexDirection: "Column", 
    height:"88vh", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px"}}>
      {sideBarContent.map((content)=>(
        <Grid sx={{display:"flex", flexDirection: "Column",padding:"20px"}}>
           <Typography sx={{cursor:"pointer"}} onClick={()=> navigate(content.pathname)}>
          {content.typography}
          </Typography>
        </Grid>
       
      ))}
    </Grid>
  )
}

export default Sidebar;