const deleteMeasurementMw = require('../middleware/measurement/deleteMeasurement');
const getMeasurementByIdMw = require('../middleware/measurement/getMeasurementById');
const getMeasurementsMw = require('../middleware/measurement/getMeasurements');
const upsertMeasurementMw = require('../middleware/measurement/upsertMeasurement');
const deleteProductMw = require('../middleware/product/deleteProduct');
const getProductByIdMw = require('../middleware/product/getProductById');
const getProductsMw = require('../middleware/product/getProducts');
const upsertProductMw = require('../middleware/product/upsertProduct');
const renderMw = require('../middleware/render');
const upsertMeasurement = require('../middleware/measurement/upsertMeasurement');
const getAllProducts = require('../middleware/product/getAllProducts');
const getProductById = require('../middleware/product/getProductById');

const MeasurementModel = require('../models/measurement')
const ProductModel = require('../models/product')

module.exports = function (app) {
    const objRepo = {
        MeasurementModel: MeasurementModel,
        ProductModel: ProductModel,
    };

    app.get('/',
        getAllProducts(objRepo),
        getMeasurementsMw(objRepo),
        renderMw(objRepo, 'index'));

    app.post('/measurement/add',
        getAllProducts(objRepo),
        getMeasurementByIdMw(objRepo),
        upsertMeasurementMw(objRepo),
        renderMw(objRepo, 'addMeasurement'));
    
    app.get('/measurement/add',
        getAllProducts(objRepo),
        renderMw(objRepo, 'addMeasurement'));

    app.get('/measurement/:measurementid',
        getAllProducts(objRepo),
        getMeasurementByIdMw(objRepo),
        renderMw(objRepo, 'editMeasurement'));

    app.post('/measurement/:measurementid',
        getAllProducts(objRepo),
        getMeasurementByIdMw(objRepo),
        upsertMeasurement(objRepo),
        renderMw(objRepo, 'editMeasurement'));

    app.get('/measurement/:measurementid/delete',
        getMeasurementByIdMw(objRepo),
        deleteMeasurementMw(objRepo));

    app.get('/products',
        getProductsMw(objRepo),
        renderMw(objRepo, 'products'));

    app.get('/product/add',
        getProductByIdMw(objRepo),
        renderMw(objRepo, 'addProduct'));

    app.post('/product/add',
        getProductByIdMw(objRepo),
        upsertProductMw(objRepo),
        renderMw(objRepo, 'addProduct'));

    app.get('/product/:productid',
        getProductByIdMw(objRepo),
        renderMw(objRepo, 'editProduct'));

    app.post('/product/:productid',
        getProductByIdMw(objRepo),
        upsertProductMw(objRepo),
        renderMw(objRepo, 'editProduct'));

    app.get('/product/:productid/delete',
        getProductById(objRepo),
        deleteProductMw(objRepo));
};