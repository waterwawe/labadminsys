//Loads 10 products from the database, depending on the page param.
//For example if the pages is 5, it skips the first 4 * 10 elements and returns the next 10 products
//If there is no page param it returns the first 10 products
//The result is saved to res.locals.products

const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const ProductModel = requireOption(objectrepository, "ProductModel");

    return function (req, res, next) {

        res.locals.currentPage = parseInt(req.query.page);
        const pageSize = 10

        if (typeof req.query.page === "undefined")
            res.locals.currentPage = 1

        const conditions = {}

        if (req.query.productname) {
            conditions.name = { "$regex": "" + req.query.productname + "", "$options": "i" }
        }

        ProductModel.count({ ...conditions }, function (err, count) {
            if (err) {
                return next(err);
            }
            res.locals.totalPages = count % pageSize == 0 ? count / pageSize : (count / pageSize) + 1;

            ProductModel.find({ ...conditions }, { name: 1, minValidResult: 1, maxValidResult: 1, _id: 1 }, { skip: (res.locals.currentPage - 1) * pageSize, limit: pageSize }, (err, products) => {
                if (err) {
                    return next(err);
                }

                res.locals.products = products;
                console.log(req.query);
                return next();
            });
        });
    };
};