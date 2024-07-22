const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const LaptopHelper = require('../helpers/LaptopHelper');

const getListLaptop = async (req, res) => {
  try {
    const data = await LaptopHelper.getListLaptop();
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Laptop', 'getListLaptop', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
const addLaptop = async (req, res) => {
  try {
    ValidationHelper.laptopValidation(req.body);
    const data = await LaptopHelper.addLaptop(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Laptop', 'addLaptop', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
const deleteLaptop = async (req, res) => {
  try {
    ValidationHelper.deleteLaptopValidation(req.params);
    const data = await LaptopHelper.deleteLaptop(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Laptop', 'deleteLaptop', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
const editLaptop = async (req, res) => {
  try {
    ValidationHelper.laptopValidation(req.body);
    const data = await LaptopHelper.editLaptop(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Laptop', 'editLaptop', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
const getListLaptopV2 = async (req, res) => {
  try {
    const data = await LaptopHelper.getListLaptopV2();
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Laptop', 'getListLaptopV2', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
const addLaptopV2 = async (req, res) => {
  try {
    ValidationHelper.laptopValidation(req.body);
    const data = await LaptopHelper.addLaptopV2(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Laptop', 'addLaptopV2', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
const editLaptopV2 = async (req, res) => {
  try {
    ValidationHelper.laptopValidation(req.body);
    const data = await LaptopHelper.editLaptopV2(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Laptop', 'editLaptopV2', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const deleteLaptopV2 = async (req, res) => {
  try {
    ValidationHelper.deleteLaptopValidation(req.params);
    const data = await LaptopHelper.deleteLaptopV2(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Laptop', 'deleteLaptopV2', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

router.get('/v1/laptop', CommonHelper.preHandler, getListLaptop);
router.post('/v1/laptop', CommonHelper.preHandler, addLaptop);
router.delete('/v1/laptop/:id', CommonHelper.preHandler, deleteLaptop);
router.put('/v1/laptop/:id', CommonHelper.preHandler, editLaptop);

router.get('/v2/laptop', CommonHelper.preHandler, getListLaptopV2);
router.post('/v2/laptop', CommonHelper.preHandler, addLaptopV2);
router.put('/v2/laptop/:id', CommonHelper.preHandler, editLaptopV2);
router.delete('/v2/laptop/:id', CommonHelper.preHandler, deleteLaptopV2);
module.exports = router;
