import React from 'react';
import MaterialTable from "@material-table/core";
import {  useLocation, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetVehiclesQuery, useGetCategoriesQuery, 
    useDeleteCategoryMutation, useDeletVehicleMutation } from '../store/Services';
import { Grid } from '@mui/material';

const vehicleColumns = [
    { title: "Vehicle Name", field: "vehicle_name" },
    { title: "Registration No", field: "registration_number" },
    { title: "Category", field: "category" },
    {
        title: "Model",
        field: "model",
        type: "numeric",
    },{ title: "Color", field: "color" },
    { title: "Type", field: "type" },
    { title: "Price", field: "price", type: "numeric" },
];

const categoryColumn = [
    {title:"Category", field:"category"}, 
    {title: "Manufacturer", field:"manufacturer"}
]

const MaterialTableData = () => {
    const navigate = useNavigate();
    const vehicleQuery = new URLSearchParams(useLocation().search).get("vehicle");
    const { data:vehicles, isLoading:VahicleLoading } = useGetVehiclesQuery();
    const { data:categories, isLoading:CategoryLoading } = useGetCategoriesQuery();
    const [deleteVehicle] = useDeletVehicleMutation();
    const [deleteCategory] = useDeleteCategoryMutation();


    const editItem = (data) => {
        if(vehicleQuery){
            navigate(`/form-addVehicle/${data._id}`);

        }else{
            navigate(`/form-addCategory/${data._id}`);
        }
    }

    const deleteItem = (data)=>{
        if(vehicleQuery){
            deleteVehicle(data._id);
        }else{
            deleteCategory(data._id);
        }
    }

    if (VahicleLoading || CategoryLoading) {
        return <div>loading...</div>;
      }

    return (
        <Grid item xs={12} sx={{padding:"20px", mt:8}}>
        <MaterialTable
            columns={vehicleQuery ? vehicleColumns : categoryColumn}
            data={vehicleQuery ? vehicles : categories}
            title= {vehicleQuery ? "Vehicles Data Table" : "Categories Data Table"}
            actions={[
                {
                  icon: EditIcon,
                  tooltip: 'edit vehicle',
                  onClick: (event, rowData) => {
                    editItem(rowData)
                  }
                },
                {
                    icon: DeleteIcon,
                    tooltip: 'delete vehicle',
                    onClick: (event, rowData) => deleteItem(rowData)}
              ]}
        />
        </Grid>       
    );
}

export default MaterialTableData;