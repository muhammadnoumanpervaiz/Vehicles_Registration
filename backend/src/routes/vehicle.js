const router = require("express").Router();
const Vehicle = require("../models/Vehicle")

router.post("/addVehicle", async (req, res) => {
    try {
      // Lets get the payload from the request body
      const { vehiclename, regNo, category,model,color,type,price } = req.body;

      // Lets create a new Vehicle
      const newVehicle = new Vehicle({
        vehicle_name: vehiclename,
        registration_number: regNo,
        category,
        model,
        color,
        type,
        price,
      });
      await newVehicle.save();
      res.send("New Vehicle Added successfully");
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/allvehicle", async (req, res) => {
    try {
      const vehicles = await Vehicle.find({});
     
      res.send(vehicles);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const vehicle = await Vehicle.findById({_id: req.params.id});
     
      res.send(vehicle);
    } catch (error) {
      res.json(error);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const deleteItem = await Vehicle.findByIdAndDelete(req.params.id);
      res.status(200).json("Vehicle Deleted");
    } catch (err) {
      res.json(err);
    }
  });

  router.put("/updateVehicle", async (req, res) => {
    try {
      const { vehiclename, regNo, category,model,color,type,price } = req.body.values;

      const updatedObject = {
        vehicle_name: vehiclename,
        registration_number: regNo,
        category,
        model,
        color,
        type,
        price,
      }
      const updatedItem = await Vehicle.findByIdAndUpdate(req.body.id, updatedObject);
      res.status(200).json({updatedItem});
    } catch (err) {
      res.json(err);
    }
  });
  
  module.exports = router;
