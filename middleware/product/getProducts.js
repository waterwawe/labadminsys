//Loads 10 products from the database, depending on the page param.
//For example if the pages is 5, it skips the first 4 * 10 elements and returns the next 10 products
//If there is no page param it returns the first 10 products
//The result is saved to res.locals.products

const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const ProductModel = requireOption(objectrepository,"ProductModel");

    //TODO: Make the legit getProducts MW, this doesn't do the paging and query
    return function (req, res, next) {
        ProductModel.find({}, (err, products) => {
            if (err) {
                return next(err);
            }

            res.locals.products = products;
            console.log(req.query);
            res.locals.currentPage = 2;
            res.locals.totalPages = 5;
            return next();
        });
    };
};