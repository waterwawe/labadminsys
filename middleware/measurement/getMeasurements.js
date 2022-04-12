//Loads 10 measurements from the database, depending on the page param.
//For example if the pages is 5, it skips the first 4 * 10 elements and returns the next 10 measurements
//If there is no page param it returns the first 10 measurements
//The result is saved to res.locals.measurements

const requireOption = require("../requireOption");

module.exports = function (objectrepository, pageNumber) {
    const MeasurementModel = requireOption(objectrepository, "MeasurementModel");

    return function (req, res, next) {
        MeasurementModel.find({}, (err, measurements) => {
            if (err) {
                return next(err);
            }

            res.locals.measurements = measurements;
            console.log(req.query);
            res.locals.currentPage = pageNumber;
            res.locals.totalPages = 5;
            return next();
        });
    };
};