//Loads all the products from the database
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
            }];
        next();
    };
};