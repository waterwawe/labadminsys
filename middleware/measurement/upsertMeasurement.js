//Adds or Edits a measurement entity using the POST params
//If res.locals.measurement already exists in the database it updates the entity, otherwise it creates it.
//This will only be successfull if the productid contained by the measurement actually exists in the database.
//Redirects / after success

const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const MeasurementModel = requireOption(objectrepository, "MeasurementModel");

    return function (req, res, next) {
        if ((typeof req.body.result === "undefined") ||
            (typeof req.body.sample === "undefined") ||
            (typeof req.body.productid === "undefined") ||
            (typeof req.body.operator === "undefined")) {
            console.log("Something was undefined");
            console.log(req.body.result);
            console.log(req.body.sample);
            console.log(req.body.productid);
            console.log(req.body.operator);
            return next();
        }

        if (typeof res.locals.measurement === "undefined") {
            res.locals.measurement = new MeasurementModel();
            res.locals.measurement.time = new Date();
        }

        res.locals.measurement.result = req.body.result;
        res.locals.measurement.sample = req.body.sample;
        res.locals.measurement._measuredProduct = req.body.productid;
        res.locals.measurement.operator = req.body.operator;

        res.locals.measurement.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });

    };
}