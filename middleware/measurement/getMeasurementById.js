//Loads a measurement from the database which's id matches the :measurementId param
//The result is saved to res.locals.measurement

const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const MeasurementModel = requireOption(objectrepository, "MeasurementModel");
    const ProductModel = requireOption(objectrepository, "ProductModel");

    return function (req, res, next) {
        console.log("Requested ID:" + req.params.measurementid);
        MeasurementModel.findOne({ _id: req.params.measurementid }, (err, measurement) => {
            if (err || !measurement) {
                return next(err);
            }

            res.locals.measurement = measurement;

            return next();
        });
    };
};