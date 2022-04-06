//Loads 10 measurements from the database, depending on the page param.
//For example if the pages is 5, it skips the first 4 * 10 elements and returns the next 10 measurements
//If there is no page param it returns the first 10 measurements
//The result is saved to res.locals.measurements
module.exports = function (objectrepository, pageNumber) {
    return function (req, res, next) {
        res.locals.measurements = [
            {
            id:1,
            time: "2022.04.05 21:03",
            sample: "1234",
            result: 0.005,
            productName: "Almalekvár",
            operator: "Marika néni"
            },
            {            
                id:2,
                time: "2022.04.05 21:10",
                sample: "5678",
                result: 9.999,
                productName: "Öblítő",
                operator: "Iván"
            }
        ];
        console.log(req.query);
        res.locals.currentPage = pageNumber;
        res.locals.totalPages = 5;
        next();
    };
};