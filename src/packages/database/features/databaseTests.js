import { dealershipsService, logService, vehiclesService } from "../index";

const tests = {
    testDealerships : async () => {
        //insert a new dealership
        console.log("insertDealership");
        await dealershipsService.insertDealership([1, "Dealership 1", "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"]);
        await dealershipsService.insertDealership([2, "Dealership 2", "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"]);
        //get all dealerships
        const dealerships = await dealershipsService.getAllDealerships();
        console.log(dealerships, "ALL dealerships");
        //get a dealership by id
        const dealership = await dealershipsService.getDealershipById([1]);
        console.log(dealership, "DEALERSHIP 1");
        //delete a dealership
        console.log("deleteDealership");
        await dealershipsService.deleteDealership([1]);
        //get all dealerships
        const dealerships2 = await dealershipsService.getAllDealerships();
        console.log(dealerships2, "ALL dealerships");
        //update a dealership
        await dealershipsService.updateDealership([2, "Dealership 333", "xxxx"]);
        //get a dealership by id
        const dealership2 = await dealershipsService.getDealershipById([2]);
        console.log(dealership2, "DEALERSHIP 2");
    },
    testLogs : async () => {
        //insert a new log
        console.log("insertLog");
        await logService.insertLog([new Date().getTime(), 1, "new test log"]);
        //get all logs
        const logs = await logService.getAllLogs();
        console.log(logs, "ALL logs");
        //get a log by id
        const log = await logService.getLogById([1]);
        console.log(log, "LOG 1");
        //delete a log
        console.log("deleteLog");
        await logService.deleteLog([1]);
        //get all logs
        const logs2 = await logService.getAllLogs();
        console.log(logs2, "ALL logs");
        //get last 50 logs
        const logs3 = await logService.getLast50Logs();
        console.log(logs3, "LAST 50 logs");
    },
    testVehicles : async () => {
        //insert a new vehicle
        console.log("insertVehicle");
        await vehiclesService.insertVehicle([1, "vin_abc", 'vehicle_stock', "vehicle_date", "vehicle_make", "vehicle_model", "vehicle_trim", "vehicle_interior", "vehicle_exterior", "vehicle_hotspots"]);
        await vehiclesService.insertVehicle([1, "vin_abd", 'vehicle_stock', "vehicle_date", "vehicle_make", "vehicle_model", "vehicle_trim", "vehicle_interior", "vehicle_exterior", "vehicle_hotspots"]);
        await vehiclesService.insertVehicle([1, "vin_abe", 'vehicle_stock', "vehicle_date", "vehicle_make", "vehicle_model", "vehicle_trim", "vehicle_interior", "vehicle_exterior", "vehicle_hotspots"]);
        await vehiclesService.insertVehicle([1, "vin_bc", 'vehicle_stock', "vehicle_date", "vehicle_make", "vehicle_model", "vehicle_trim", "vehicle_interior", "vehicle_exterior", "vehicle_hotspots"]);

        //get all vehicles
        const vehicles = await vehiclesService.getAllVehicles();
        console.log(vehicles, "ALL vehicles");
        //get all vehicles by vin
        const vehicles2 = await vehiclesService.getAllVehiclesByVin(['vin']);
        console.log(vehicles2, "ALL vehicles by vin");
        //get all vehicles by vin
        const vehicles3 = await vehiclesService.getAllVehiclesByVin(['a']);
        console.log(vehicles3, "ALL vehicles by a");
        //get all vehicles by vin
        const vehicles4 = await vehiclesService.getAllVehiclesByVin(['bc']);
        console.log(vehicles4, "ALL vehicles by bc");

        //get all vehicles by vin
        const vehicles5 = await vehiclesService.getAllVehiclesByVin(['e']);
        console.log(vehicles5, "ALL vehicles by e");

        //get all vehicles by vin
        const vehicles6 = await vehiclesService.getAllVehiclesByVin(["ab"]);
        console.log(vehicles6, "ALL vehicles by ab");

    },
}

export { tests };