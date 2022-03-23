//Loads 10 products from the database, depending on the page param.
//For example if the pages is 5, it skips the first 4 * 10 elements and returns the next 10 products
//If there is no page param it returns the first 10 products
//The result is saved to res.locals.products
module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};