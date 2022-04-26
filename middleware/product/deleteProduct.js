//Checks if a products's id in the database matches with :productId, If the product doesn't have any measurement's then deletes it.
//Redirects to / after removal
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const MeasurementModel = requireOption(objectrepository, "MeasurementModel");

    return function (req, res, next) {
        console.log("Requested ID:" + req.params.productid);
        if (typeof res.locals.product === "undefined") {
            return next();
        }

        MeasurementModel.count({ _measuredProduct: { _id: res.locals.product._id } }, function (err, count) {

            if (err) {
                return next(err);
            }

            if (count < 1) {
                res.locals.product.remove((err) => {
                    if (err) {
                        return next(err);
                    }
                });
            }
            return res.redirect("/products");
        });
    }
};