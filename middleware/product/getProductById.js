//Loads a product from the database which's id matches the :productId param
//The result is saved to res.locals.product
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const ProductModel = requireOption(objectrepository,"ProductModel");

    return function (req, res, next) {
        console.log("Requested ID:" + req.params.productid);
        ProductModel.findOne({_id:req.params.productid}, (err, product) => {
            if (err || ! product) {
                return next(err);
            }

            res.locals.product = product;
            return next();
        });
    };
};