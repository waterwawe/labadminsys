//Checks if a measurement's id in the database matches with :measurementId, If so, deletes it
//Redirects to / after removal
module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};