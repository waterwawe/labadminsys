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

        if (req.query.sample && req.query.sample.length > 1) {
            conditions.sample = { $eq: req.query.sample}
        }
        if (req.query.operator && req.query.operator.length > 1) {
            conditions.operator = { "$regex": "" + req.query.operator + "", "$options": "i" }
        }

        if (req.query.productid && req.query.productid.length > 1 ) {
            conditions._measuredProduct = { _id: req.query.productid }
        }

        if (req.query.fromdate) {
            if (req.query.todate) {
                conditions.time = { $gt: req.query.fromdate, $lt: req.query.todate }
            }
            else {
                conditions.time = { $gt: req.query.fromdate }
            }
        }
        else if (req.query.todate) {
            if (req.query.todate) {
                conditions.time = { $lt: req.query.todate }
            }
        }

        MeasurementModel.count({ ...conditions }, function (err, count) {
            if (err) {
                return next(err);
            }

            res.locals.totalPages = count % pageSize == 0 ? count / pageSize : (count / pageSize) + 1;

            MeasurementModel.find({...conditions}, { time: 1, sample: 1, result: 1, operator: 1, _id: 1, _measuredProduct: 1 }, { skip: (res.locals.currentPage - 1) * pageSize, limit: pageSize })
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