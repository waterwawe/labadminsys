//Loads a product from the database which's id matches the :productId param
//The result is saved to res.locals.product
module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log("Requested ID:" + req.params.productid);
        res.locals.product =
            {
                id: 1,
                name: "Öblítő",
                minValidResult: 0.001,
                maxValidResult: 0.005,
            }
        next();
    };
};