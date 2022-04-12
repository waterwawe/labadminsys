//Adds or Edits a product entity using the POST params
//If res.locals.product already exists in the database it updates the entity, otherwise it creates it.
//Redirects /products after success
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const ProductModel = requireOption(objectrepository, "ProductModel");

    return function (req, res, next) {
        if ((typeof req.body.name === "undefined") ||
            (typeof req.body.minValidResult === "undefined") ||
            (typeof req.body.maxValidResult === "undefined")) {
            console.log("Something was undefined");
            console.log(req.body.name);
            console.log(req.body.minValidResult);
            console.log(req.body.maxValidResult);
            return next();
        }

        if (typeof res.locals.product === "undefined") {
            res.locals.product = new ProductModel();
        }

        res.locals.product.name = req.body.name;
        res.locals.product.minValidResult = req.body.minValidResult;
        res.locals.product.maxValidResult = req.body.maxValidResult;

        res.locals.product.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/products");
        });

    };
};