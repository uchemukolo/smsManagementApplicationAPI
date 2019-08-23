import express from 'express';
import ContactController from '../../controllers/ContactController/ContactController';
import ContactValidator from '../../middlewares/ContactValidator';
import auth from '../../middlewares/Authentication';

const Router = express.Router();

Router.post(
  '/contacts/signup',
  ContactValidator.checkContactFields,
  ContactController.createUser,
);

Router.post(
  '/contacts/login',
  ContactValidator.checkLoginFields,
  ContactController.loginUser,
);

Router.delete(
  '/contacts/delete/:contactId',
  ContactValidator.checkParam,
  ContactController.deleteUser,
);

Router.get(
  '/contacts/:contactId',
  auth.verifyUserToken,
  ContactValidator.checkParam,
  ContactController.getUser,
);

export default Router;
