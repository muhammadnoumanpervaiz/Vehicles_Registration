import { Grid } from '@mui/material';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useGetVehiclesQuery } from '../store/Services';

const Dashboard = () => {
  const navigate = useNavigate();
  const {data: vehicleData} = useGetVehiclesQuery();
  const {data: categoryData} = useGetCategoriesQuery();

  return (
    <Grid sx={{display:"flex",ml:5, columnGap:"30px", alignItems:"center"}}>
      <Grid onClick={()=>{navigate("/table-data?category=true")} } sx={{justifyContent:"center", width:"300px",height:"300px", alignItems:"center" ,display:"flex", flexDirection:"column",  cursor:"pointer", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"}}>
          <h3>Total Categories</h3>
          <h1 style={{color:"red"}}>{categoryData?.length}</h1>
          <Link>Click to see detail</Link>
      </Grid>
      <Grid onClick={()=>{navigate("/table-data?vehicle=true")} } sx={{justifyContent:"center",width:"300px",height:"300px", alignItems:"center" ,display:"flex", flexDirection:"column",  cursor:"pointer", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"}}>
          <h3>Total Registered Vehicles</h3>
          <h1 style={{color:"red"}}>{vehicleData?.length}</h1>
          <Link>Click to see detail</Link>

      </Grid>
    </Grid>
  )
}

export default Dashboard;