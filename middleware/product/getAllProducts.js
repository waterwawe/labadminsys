//Loads all the products from the database
//The result is saved to res.locals.products
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    
    const ProductModel = requireOption(objectrepository,"ProductModel");

    return function (req, res, next) {
        ProductModel.find({}, (err, products) => {
            if (err) {
                return next(err);
            }

            res.locals.products = products;
            return next();
        });
    };
};