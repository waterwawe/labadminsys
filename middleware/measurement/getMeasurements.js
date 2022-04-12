//Loads 10 measurements from the database, depending on the page param.
//For example if the pages is 5, it skips the first 4 * 10 elements and returns the next 10 measurements
//If there is no page param it returns the first 10 measurements
//The result is saved to res.locals.measurements

const requireOption = require("../requireOption");

module.exports = function (objectrepository, pageNumber) {
    const MeasurementModel = requireOption(objectrepository, "MeasurementModel");

    return function (req, res, next) {
        res.locals.currentPage = parseInt(req.query.page);
        const pageSize = 10

        if (typeof req.query.page === "undefined")
            res.locals.currentPage = 1

        const conditions = {}

        if (req.query.sample) {
            conditions.sample = { "$regex": "" + req.query.sample + "", "$options": "i" }
        }
        if (req.query.operator) {
            conditions.operator = { "$regex": "" + req.query.operator + "", "$options": "i" }
        }

        MeasurementModel.count({ ...conditions }, function (err, count) {
            if (err) {
                return next(err);
            }

            res.locals.totalPages = count % pageSize == 0 ? count / pageSize : (count / pageSize) + 1;

            MeasurementModel.find({ conditions }, { time: 1, sample: 1, result: 1, operator: 1, _id: 1, _measuredproduct: 1 }, { skip: (res.locals.currentPage - 1) * pageSize, limit: pageSize })
                .populate("_measuredProduct").exec((err, measurements) => {
                    if (err) {
                        return next(err);
                    }

                    res.locals.measurements = measurements;
                    console.log(req.query);
                    return next();
                });
        });
    };
};