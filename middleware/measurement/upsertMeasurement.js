//Adds or Edits a measurement entity using the POST params
//If res.locals.measurement already exists in the database it updates the entity, otherwise it creates it.
//This will only be successfull if the productid contained by the measurement actually exists in the database.
//Redirects / after success
module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log("Requested ID:" + req.params.measurementid);
        console.log("Posted:" + req.body);
        next();
    };
};