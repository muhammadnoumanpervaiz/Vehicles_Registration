import { Route, Routes } from "react-router-dom";
import Auth from './components/Auth';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import AddVehicleForm from './forms/AddVehicleForm';
import ProtectedRoute from './auth/ProtectedRoute';
import MaterialTableData from './components/MaterialTableData';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Grid } from '@mui/material';
import AddCategoryForm from './forms/AddCategoryForm';
import { useEffect, useState } from "react";

function App() {
  const [userToken, setUserToken] = useState();

  useEffect(()=>{
    setUserToken(localStorage.getItem("token"));
  },[])

  return (
    <Grid>
        <Grid item sx={{display:"flex", flexDirection:"column"}}>
          {/* Navbar section cannot be access without login */}
          <Grid sx={{position:"fixed", width:"100%"}} >
            {userToken && 
              <ProtectedRoute>
                <Navbar/>
              </ProtectedRoute>
            }
          </Grid>
            {/* under navbar cannot be access without login  */}
            <Grid container xs={12} sx={{display:"flex", flexWrap:"nowrap"}}>
              {/* sidebar section */}
              <Grid xs={2}>
                {userToken && 
                  <ProtectedRoute>
                    <Sidebar/>
                 </ProtectedRoute>
                }
              </Grid>
              {/* Main Content */}
              <Grid xs={8} sx={{display:"flex",ml:20, flexDirection:"column", justifyContent:"center"}}>
                <Routes>
                  {/* unAuth Route that can accessable without Login */}
                  <Route path="/" element={<Auth />} />
                  <Route path="/auth-login" element={<LogIn />} />
                  <Route path="/auth-signup" element={<SignUp />} />

                {/* Protected Routes that couldn't be access without LogIn */}
                  {/* 1. Route us to Dashboard after Login */}
                  <Route
                    path="/Dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard/>
                      </ProtectedRoute>
                    }
                  />

                  {/* 2. Route us to Vehicle Form to add vehicle */}
                  <Route
                    path="/form-addVehicle"
                    element={
                      <ProtectedRoute>
                        <AddVehicleForm/>
                      </ProtectedRoute>
                    }
                  />

                  {/* 3. Route us to Vehicle Form to edit vehicle */}
                  <Route
                    path="/form-addVehicle/:id"
                    element={
                      <ProtectedRoute>
                        <AddVehicleForm/>
                      </ProtectedRoute>
                    }
                  />

                  {/* 4. Route us to Data Table to View All added content */}
                  <Route
                    path="/table-data"
                    element={
                      <ProtectedRoute>
                        <MaterialTableData/>
                      </ProtectedRoute>
                    }
                  />

                  {/* 5. Route us to Category Form to add new Category */}
                  <Route
                    path="/form-addCategory"
                    element={
                      <ProtectedRoute>
                        <AddCategoryForm/>
                      </ProtectedRoute>
                    }
                  />

                  {/* 5. Route us to Category Form to edit Category */}
                  <Route
                    path="/form-addCategory/:id"
                    element={
                      <ProtectedRoute>
                        <AddCategoryForm/>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Grid>
            </Grid>
        </Grid>
    </Grid>
  );
}

export default App;
