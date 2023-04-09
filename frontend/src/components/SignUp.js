import React from 'react'
import {Grid, Button, TextField} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {useNavigate, Link} from 'react-router-dom';
import { useCreateUserAccountMutation } from '../store/Services';

const SignUp = () => {
  const navigate = useNavigate();
  const [createAccount] = useCreateUserAccountMutation();

  // validation schema for fields, handling through yup
  const SignUpValidationSchema = Yup.object().shape({
    email: Yup.string().required("Please enter your email").email("Enter valid email"),
    username: Yup.string().required("Please enter your password"),
  });

  return (
    <Grid container xs={8} sx={{display:"flex",mt:8, flexDirection:"column", alignItems:"center", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"}}>
      <Grid>
        <h1>Sign Up Form</h1>
      </Grid>
    <Formik
       initialValues={{ username:"", email:""}}
       validationSchema={SignUpValidationSchema}
       onSubmit={async(values, { setSubmitting, resetForm  }) => {
        createAccount(values).then(()=> {navigate('/auth-login')});
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         resetForm,
         isSubmitting,
       }) => (
         <form onSubmit={handleSubmit}>
          <Grid sx={{display:"flex", flexDirection:"column", rowGap:"10px", width:"100%"}}>
          <Grid sx={{display:"flex", flexDirection:"column", }}>
             <TextField
              required
              name='username'
              id="username"
              label="Enter username"
              defaultValue={values.username}
              onChange={handleChange}
            />
             { <span style={{color:"red"}}>
                *{errors.username && errors.username && errors.username}
            </span> }
          </Grid>
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
          <Grid sx={{display:"flex", flexDirection:"column", alignItems:"center",mb:1, rowGap:"5px"}}>
            <Button sx={{width:"50%"}} type="submit" onClick={handleSubmit} variant="contained">
                SignUp
            </Button>
            <Link to={"/auth-login"}>Login?</Link>
          </Grid>
          </Grid>
         </form>
       )}
     </Formik>
    </Grid>
  )
}

export default SignUp;
