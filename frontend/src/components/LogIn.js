import React, { useState } from 'react'
import {Grid, Button, TextField} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {Link, useNavigate} from 'react-router-dom';
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useMakeLoginPossibleMutation } from '../store/Services';

const LogIn = () => {
  const [showPassword, setShowPassword]= useState(false);
  const navigate = useNavigate();
  const [makeLoginPossible] = useMakeLoginPossibleMutation();

  const handleShowPassword = ()=>{
    setShowPassword(!showPassword);
  }
  const SignUpValidationSchema = Yup.object().shape({
    email: Yup.string().required("Please enter your email").email("Enter valid email"),
   password: Yup.string().required("Please enter your password"),
  });
  return (
    <Grid container xs={8} sx={{display:"flex",mt:8, flexDirection:"column", alignItems:"center", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"}}>
      <Grid>
        <h1>Login Form</h1>
      </Grid>
        <Formik
           initialValues={{ email:"", password:""}}
           validationSchema={SignUpValidationSchema}
           onSubmit={async(values, { setSubmitting  }) => {
            // requesting for new user registration

          makeLoginPossible(values)
          .then((res)=>{
            localStorage.setItem("token", res.data.token)
            navigate("/Dashboard");
            window.location.reload();
          });

           }}
         >
           {({
             values,
             errors,
             touched,
             handleChange,
             handleBlur,
             handleSubmit,
             isSubmitting,
           }) => (
             <form onSubmit={handleSubmit}>
              <Grid sx={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
              <Grid sx={{display:"flex", flexDirection:"column", }}>
                <TextField
                  required
                  name='email'
                  id="email"
                  label="Enter Email"
                  defaultValue={values.email}
                  onChange={handleChange}
                />
                { <span style={{color:"red"}}>
                    *{errors.email && errors.email && errors.email}
                </span> }
              </Grid>
              <Grid sx={{display:"flex", flexDirection:"column",}}>
                 <TextField
                  required
                  type={showPassword ? "text" : "password"}
                  name='password'
                  id="password"
                  label="Enter your password"
                  defaultValue={values.password}
                  onChange={handleChange}
                  InputProps = {
                    {
                      endAdornment: ( 
                      <InputAdornment position="end"> {
                          showPassword ? ( 
                          <Visibility 
                            onClick = {
                              handleShowPassword
                            }
                            />
                          ) : ( 
                          <VisibilityOff onClick = {
                            handleShowPassword
                            }
                            />
                          )
                        } 
                        </InputAdornment>
                      ),
                    }
                  }
                />
                 { <span style={{color:"red"}}>
                    *{errors.password && errors.password && errors.password}
                </span> }
              </Grid>
              <Grid sx={{display:"flex",mb:1, flexDirection:"column", alignItems:"center", rowGap:"5px"}}>
                <Button sx={{width:"50%"}} type="submit" onClick={handleSubmit} variant="contained">
                    Login
                </Button>
                <Link to={"/auth-signup"}>Signup?</Link>
              </Grid>
              </Grid>
             </form>
           )}
         </Formik>
        </Grid>
  )
}

export default LogIn;