//Loads a measurement from the database which's id matches the :measurementId param
//The result is saved to res.locals.measurement
module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.measurement = {
            id: 1,
            time: "2022.04.05 21:03",
            sample: "1234",
            result: 0.005,
            productName: "Almalekvár",
            operator: "Marika néni"
        }
        console.log("Requested ID:" + req.params.measurementid);
        next();
    };
};