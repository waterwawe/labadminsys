var expect = require('chai').expect;
const deleteMeasurement = require('../../../../middleware/measurement/deleteMeasurement');

describe('deleteMeasurement middleware ', function () {

    it('should not throw error when deleting a measurement', function (done) {

        const res = {
            redirect: (where) => {
                expect(where).to.be.eql("/")
                done();
            },
            locals: {
                measurement: {
                    _id: "627644ee7d86421b8b6182ec",
                    result: 1234,
                    sample: "5678",
                    productid: "627655df05efe9db77bb4825",
                    operator: "",
                    remove: (cb) => {
                        cb(null);
                    }
                }
            }
        }

        const mw = deleteMeasurement();

        mw({}, res, (err) => {});
    });

    it('should call next with the error if the delete was not successful', function (done) {
        const res = {
            redirect: (where) => { },
            locals: {
                measurement: {
                    _id: "627644ee7d86421b8b6182ec",
                    result: 1234,
                    sample: "5678",
                    productid: "627655df05efe9db77bb4825",
                    operator: "",
                    remove: (cb) => {
                        cb("There was an error during saving");
                    }
                }
            }
        }

        const mw = deleteMeasurement({});

        mw({}, res, (err) => {
            expect(err).to.be.eql("There was an error during saving");
            done();
        });
    });

    it('should call nextif res.locals.measurement is undefined', function (done) {
        const res = {
            redirect: (where) => { },
            locals: {}
        }

        const mw = deleteMeasurement({});

        mw({}, res, (err) => {
            expect(err).to.be.undefined
            done();
        });
    });
});