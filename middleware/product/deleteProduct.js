//Checks if a products's id in the database matches with :productId, If the product doesn't have any measurement's then deletes it.
//Redirects to / after removal
module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};