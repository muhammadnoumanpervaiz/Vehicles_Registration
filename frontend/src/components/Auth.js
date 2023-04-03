import React from 'react'
import {Grid, Button, Typography} from '@mui/material';

const Auth = () => {
  return (
    <Grid container sx={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center", height:"100vh",}}>
        <Grid item xs={6} sx={{display:"flex",borderRadius:"10px" ,boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;", rowGap:"30px", flexDirection:"column",justifyContent:"center", width:"100%"}}>
            <Grid >
                <Button href='/auth-signup' sx={{width:"50%"}} variant="contained">Signup</Button>
            </Grid>
            <Grid>
                <Typography sx={{fontSize:"12px", mb:1, color:"blue"}}>
                Do you have Already Account?
                </Typography>
                <Button href='/auth-login' sx={{width:"50%"}} variant="outlined">
                Login
                </Button>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default Auth;