//Adds or Edits a product entity using the POST params
//If res.locals.product already exists in the database it updates the entity, otherwise it creates it.
//Redirects /products after success
module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};