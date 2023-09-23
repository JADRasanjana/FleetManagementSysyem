const router = require("express").Router();
let FuelEntry = require("../models/fuel/fuel_entry");

//ALL FUEL ENTRY CRUD OPERATION

//CREATE PART
/*http://Localhost:8411/fuel/fuel_entry/add*/

router.route("/fuel_entry/add").post((req, res) => {
    
    const vehicle_id = req.body.vehicle_id;
    const fuel_date = new Date(req.body.fuel_date);
    const fuel_type = req.body.fuel_type;
    const fuel_quantity = req.body.fuel_quantity;
    const fuel_cost = new Number(req.body.fuel_cost);
    const vehicle_milage = new Number(req.body.vehicle_milage);
    

    const newFuelEntry = new FuelEntry({
        
        vehicle_id,
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage
    })

    newFuelEntry.save().then(() => {
        res.json("New Fuel details are successfully added ")
    }).catch((err) => {
        console.log(err)
    })
   
})

//READ PART
/*http://Localhost:8411/fuel/fuel_entry*/

router.route("/fuel_entry").get((req,res) => {
    
    FuelEntry.find().then((fuel_entries) => {
        res.json(fuel_entries)
    }).catch((err) => {
        console.log(err)
    })
})


//UPDATE PART
/*http://Localhost:8411/fuel/update/id*/ 
router.route("/fuel_entry/update/:id").put(async(req, res) => {
    let vehicleId = req.params.id;
    const { 
        vehicle_id,
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage
        } = req.body;
    
        const updateFuelEntry = {
            vehicle_id,
            fuel_date,
            fuel_type,
            fuel_quantity,
            fuel_cost,
            vehicle_milage
        }

        const update = await FuelEntry.findByIdAndUpdate(vehicleId, updateFuelEntry)
        .then(() => {
            res.status(200).send({status: "Fuel Data updated successfully!!!!!!!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not updated. Error in the Update!!!!", error: err.message});
    })       
})

//DELETE PART
/*http://Localhost:8411/fuel/delete/id*/ 
router.route("fuel_entry/delete/:id").delete(async(req,res) =>{
    let vehicleId = req.params.id;

    await FuelEntry.findByIdAndDelete(vehicleId)
    .then(() =>{
        res.status(200).send({status :"Fuel Data Deleted Successfully!!!!!!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not deleted. Error in the delete!!!!", error: err.message});
    })
})

//UNIQUE FUEL DATA
router.route("fuel_entry/get/:id").get(async(req,res) =>{
    let vehicleId = req.params.id;

    const vehicle = await FuelEntry.findByIdAndDelete(vehicleId) 
    .then((fuel_entry) =>{
        res.status(200).send({status :"Fuel Data Successfully Fetched!!!!!!", fuel_entry});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not Fetched. Error in the fuel data Fetched!!!!", error: err.message});
    })
})

module.exports = router;