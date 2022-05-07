var expect = require('chai').expect;
const getProductById = require('../../../../middleware/product/getProductById');

describe('getProductById middleware ', function () {

    it('should return product when the productId exists', function (done) {
        const req = {
            params: {
                productid: "627644ee7d86421b8b6182ec"
            }
        };

        const res = {
            locals: {}
        }

        const mw = getProductById({
            ProductModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: "627644ee7d86421b8b6182ec" })
                    cb(null, "mockProduct");
                }
            }
        });

        mw(req, res, (err) => {
            expect(err).to.be.undefined
            expect(res.locals).to.be.eql({ product: "mockProduct" })
            done();
        });
    });

    it('should return error when db returns error', function (done) {
        const req = {
            params: {
                productid: "627644ee7d86421b8b6182ec"
            }
        };

        const res = {
            locals: {}
        }

        const mw = getProductById({
            ProductModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: "627644ee7d86421b8b6182ec" })
                    cb("Cannot access db", null);
                }
            }
        });

        mw(req, res, (err) => {
            expect(err).to.be.eql("Cannot access db")
            done();
        });
    });

    it('should return error when the product is not found in the db', function (done) {
        const req = {
            params: {
                productid: "627644ee7d86421b8b6182ec"
            }
        };

        const res = {
            locals: {}
        }

        const mw = getProductById({
            ProductModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: "627644ee7d86421b8b6182ec" })
                    cb(undefined, null);
                }
            }
        });

        mw(req, res, (err) => {
            expect(err).to.be.undefined
            expect(res.locals).to.be.eql({})
            done();
        });
    });
});