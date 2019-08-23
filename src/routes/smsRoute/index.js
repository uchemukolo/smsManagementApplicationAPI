import express from 'express';
import SmsController from '../../controllers/SmsController/SmsController';
import SmsValidator from '../../middlewares/SmsValidator';
import auth from '../../middlewares/Authentication';

const Router = express.Router();

Router.get(
  '/messages/sent',
  auth.verifyUserToken,
  SmsController.getSentMessages
);

Router.get(
  '/messages/received',
  auth.verifyUserToken,
  SmsController.getReceivedMessages
);

Router.get(
  '/messages/:messageId',
  auth.verifyUserToken,
  SmsValidator.checkParam,
  SmsController.getMessage
);

Router.post(
  '/messages/:phoneNumber',
  auth.verifyUserToken,
  SmsValidator.checkMessageFields,
  SmsController.sendMessage
);

export default Router;
