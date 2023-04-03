import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation } from '../store/Services';

const AddCategoryForm = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { data:categories, isLoading:CategoryLoading } = useGetCategoriesQuery();
    const [editedCategory, setEditedCategory] = useState(categories?.find((v)=> v._id === params.id));
    const [updateCategory] = useUpdateCategoryMutation();
    const [addCategory] = useCreateCategoryMutation();
    
    const CategoryFormValidationSchema = Yup.object().shape({
        category: Yup.string().required("Must select category"),
    });

    return (
        <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Formik
                initialValues={{ category: editedCategory?.category || "", manufacturer: editedCategory?.manufacturer || "", }}
                validationSchema={CategoryFormValidationSchema}
                onSubmit={async (values, { setSubmitting, resetForm  }) => {
                    if(editedCategory){
                        const objectToUpdate = {id: params.id, values}
                        updateCategory(objectToUpdate);
                    }else{
                        addCategory(values);
                    }
                    setSubmitting(false);
                    navigate("/table-data?category=true");
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
                        <Grid sx={{ display: "flex", flexDirection: "column", rowGap: "10px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px", borderRadius: "10px" }}>
                            <Grid sx={{ display: "flex", flexDirection: "column", rowGap: "10px", padding: "20px" }}>
                                <FormLabel>Manufacturer Name</FormLabel>
                                <TextField
                                    required
                                    name='manufacturer'
                                    id="manufacturer"
                                    label="Manufacturer Name"
                                    defaultValue={values.manufacturer}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid sx={{ display: "flex", flexDirection: "column", rowGap: "10px", padding: "20px" }}>
                            <FormLabel>Vehicle Category</FormLabel>
                                <TextField
                                    required
                                    name='category'
                                    id="category"
                                    label="Add Category"
                                    defaultValue={values.category}
                                    onChange={handleChange}
                                />
                                {<span style={{ color: "red" }}>
                                    *{errors.category && errors.category && errors.category}
                                </span>}
                            </Grid>
                            <Grid sx={{padding: "20px"}}>
                            <Button type="submit" variant="contained" onClick={()=>handleSubmit}>
                                {editedCategory? "Update Category" :  "Add Category"}
                            </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Grid >
    )
}

export default AddCategoryForm;