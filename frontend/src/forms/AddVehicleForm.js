import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateVahicleMutation,useGetCategoriesQuery, useGetVehiclesQuery, useUpdateVehicleMutation } from '../store/Services';

const colors = ["Red", "Black", "White", "Yellow", "Green"];

const vehicleFormValidationSchema = Yup.object().shape({
    vehiclename: Yup.string().required("Vehicle Name Required").min(5),
    regNo: Yup.string().required("Registration number is Required"),
    category: Yup.string().required("Category is Required"),
    model: Yup.number().required("Enter Model"),
    color: Yup.string().required("Select a Color"),
    type: Yup.string().required("Select Type Please"),
    price: Yup.number().required("Enter your vehicle value")
});

const AddVehicleForm = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [createVehicle] = useCreateVahicleMutation();
    const { data:vehicles, isLoading:VahicleLoading } = useGetVehiclesQuery();
    const { data:categories, isLoading:CategoryLoading } = useGetCategoriesQuery();
    const [editedVehicle, setEditedVehicle] = useState(vehicles?.find((v)=> v._id === params.id));
    const [updateVehicle] = useUpdateVehicleMutation();

      return (
        <Grid container sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Formik
           initialValues={
                { vehiclename: editedVehicle?.vehicle_name || "" ,regNo:editedVehicle?.registration_number || "", 
                category:editedVehicle?.category || "", model: editedVehicle?.model || 0, color:editedVehicle?.color || "", 
                type:editedVehicle?.type || "", price:editedVehicle?.price || 0, }
            }
           validationSchema={vehicleFormValidationSchema}
           onSubmit={async (values, { setSubmitting, resetForm  }) => {
            if(editedVehicle){
                const objectToUpdate = {id: params.id, values}
                updateVehicle(objectToUpdate);
            }else{
                createVehicle(values);
            }
            setSubmitting(false);
            navigate("/table-data?vehicle=true");
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
             resetForm
           }) => (
            
             <form onSubmit={handleSubmit}>
                    <Grid sx={{display:"flex",height:"75vh", flexDirection:"column", alignItems:"center", 
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px", borderRadius:"10px"}}>
                   <Grid sx={{padding:"20px"}}> 
                    <Grid>
                        <h1>
                            Register your Vehicle
                        </h1>
                    </Grid>
                    <Grid sx={{display:"flex", columnGap:"10px"}}>
                        <Grid sx={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                            <FormLabel>Vehicle Name</FormLabel>
                            <TextField
                            required
                            name='vehiclename'
                            id="vehiclename"
                            label="vehicle Name"
                            defaultValue={values.vehiclename}
                            onChange={handleChange}
                            />
                            { <span style={{color:"red"}}>
                                *{errors.vehiclename && errors.vehiclename && errors.vehiclename}
                            </span> }
                        </Grid>
                        <Grid sx={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                            <FormLabel>Vehicle Registration Number</FormLabel>
                            <TextField
                            required
                            name='regNo'
                            id="regNo"
                            label="Registration No"
                            defaultValue={values.regNo}
                            onChange={handleChange}
                            />
                            {<span style={{color:"red"}}>
                                *{errors.regNo && errors.regNo && errors.regNo}
                            </span> }
                        </Grid>
                        <Grid sx={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                            <FormLabel>Category</FormLabel>
                            <Select
                            labelId="category"
                            name="category"
                            id="category"
                            value={values.category}
                            label="Select vehicle Category"
                            onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories?.map((item)=>(
                                <MenuItem value={item.category}>{item.category}</MenuItem>
                            ))}
                            </Select>
                            {<span style={{color:"red"}}>
                                *{errors.category && errors.category && errors.category}
                            </span> }
                        </Grid>
                    </Grid>
                    <Grid sx={{display:"flex", flexDirection:"row", columnGap:"10px"}}>
                        <Grid sx={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                            <FormLabel>Vehicle Model</FormLabel>
                            <TextField
                            required
                            type="number"
                            name='model'
                            id="model"
                            label="Enter Model"
                            defaultValue={values.model}
                            onChange={handleChange}
                            />
                            {<span style={{color:"red"}}>
                                *{errors.model && errors.model && errors.model}
                            </span> }
                        </Grid>

                        <Grid sx={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                            <FormLabel>Vehicle Color</FormLabel>
                            <Select
                            labelId="color"
                            name="color"
                            id="color"
                            value={values.color}
                            label="Select vehicle Color"
                            onChange={handleChange}
                            >
                            {colors.map((item)=>(
                                <MenuItem value={item}>{item}</MenuItem>
                            ))}
                            </Select>
                            {<span style={{color:"red"}}>
                                *{errors.color && errors.color && errors.color}
                            </span> }
                        </Grid>
                        <Grid sx={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                            <FormLabel>Vehicle Price</FormLabel>
                            <TextField
                            required
                            type="number"
                            name='price'
                            id="price"
                            label="Enter Price"
                            defaultValue={values.price}
                            onChange={handleChange}
                            />
                            {<span style={{color:"red"}}>
                                *{errors.price && errors.price && errors.price}
                            </span> }
                        </Grid>
                        </Grid>
                        <Grid sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <Grid sx={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                            <FormLabel>Vehicle Type</FormLabel>
                            <RadioGroup
                            sx={{display:"flex", flexDirection:"row"}}
                                id="type"
                                aria-labelledby="type"
                                defaultValue={values.type}
                                name="type"
                                onChange={handleChange}
                            >
                                <FormControlLabel value="new" control={<Radio />} label="New" />
                                <FormControlLabel value="used" control={<Radio />} label="Used" />
                            </RadioGroup>
                            {<span style={{color:"red"}}>
                                *{errors.type && errors.type && errors.type}
                            </span> }
                        </Grid>
                        <Grid sx={{mt:3}}>
                        <Button type="submit" variant="contained" onClick={() => handleSubmit} endIcon={<SendIcon />}>
                            {editedVehicle? "Update Vehicle" :  "Register Vehicle"}
                        </Button>
                        </Grid>
                        </Grid>
                        
                        </Grid>
                    </Grid>
            </form>
           )}
         </Formik>
        </Grid>
      )
}

export default AddVehicleForm;