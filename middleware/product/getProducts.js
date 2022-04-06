//Loads 10 products from the database, depending on the page param.
//For example if the pages is 5, it skips the first 4 * 10 elements and returns the next 10 products
//If there is no page param it returns the first 10 products
//The result is saved to res.locals.products
module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.products = [
            {
                id: 1,
                name: "Öblítő",
                minValidResult: 0.001,
                maxValidResult: 0.005,
            },
            {
                id: 2,
                name: "Almalekvár",
                minValidResult: 100,
                maxValidResult: 200,
            },
        ];
        console.log(req.query);
        res.locals.currentPage = 2;
        res.locals.totalPages = 5;
        next();
    };
};