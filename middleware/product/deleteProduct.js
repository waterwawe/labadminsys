//Checks if a products's id in the database matches with :productId, If the product doesn't have any measurement's then deletes it.
//Redirects to / after removal
module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log("Requested ID:" + req.params.productid);
        if(typeof res.locals.product === "undefined"){
            return next();
        }
        res.locals.product.remove((err) => {
            if(err){
                return next(err);
            }
        })
        return res.redirect("/products");
    };
};