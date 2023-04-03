import React from 'react'
import {Grid, Button, Typography} from '@mui/material';

const Auth = () => {
  return (
    <Grid container sx={{display:"flex",mt:10,rowGap:"20px", width:"50%", 
      flexDirection:"column",justifyContent:"center", alignItems:"center", 
      height:"60vh",boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"}}>
        <Button href='/auth-signup' sx={{width:"50%"}} variant="contained">Signup</Button>
        <Typography sx={{fontSize:"12px", mb:1, color:"blue"}}>
        Do you have Already Account?
        </Typography>
        <Button href='/auth-login' sx={{width:"50%"}} variant="outlined">
        Login
        </Button>
    </Grid>
  )
}

export default Auth;