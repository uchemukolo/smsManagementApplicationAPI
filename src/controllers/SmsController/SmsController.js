import models from '../../models';
import CustomError from '../../helpers/errorHandler';

/**
 * Handles operations on sms routes
 *
 * @exports
 * @class SmsController
 */
export default class SmsController {

  /**
     * Creats a message
     *
     * @static
     * @param  {object} request - request object
     * @param  {object} response - response object
     * @returns {object} response object
     * @memberof SmsController     *
     */
  static async sendMessage(request, response) {
    try {
      const { phoneNumber } = request.params;
      const { message } = request.body;
      const { id } = request.user;

      const foundReceiver = await models.Contact.findOne({
        where: { phone_number: phoneNumber }
      });

      if (!foundReceiver) {
        CustomError.handleError('Receiver does not exist', 404, response);
        return;
      }

      const createdMessage = await models.SMS.create({
        sender_id: id,
        message,
        receiver_id: foundReceiver.id,
        status: 1
      });

      if (createdMessage) {
        return response.status(201).json({
          success: true,
          message: 'Message sent successfully',
          sentMessage: createdMessage
        });
      }
    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }

  /**
     * Gets a user's sent messages
     *
     * @static
     * @param  {object} request - request object
     * @param  {object} response - response object
     * @returns {object} response object
     * @memberof SmsController     *
     */

  static async getSentMessages(request, response) {
    try {
      const { id } = request.user;
      const messages = await models.SMS.findAll({
        where: { sender_id: id }
      });

      if (messages.length < 1) {
        CustomError.handleError('No messages found', 404, response);
      }

      return response.status(200).json({
        success: true,
        message: 'messages found',
        messages,
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }

  /**
       * Gets a user's received messages
       *
       * @static
       * @param  {object} request - request object
       * @param  {object} response - response object
       * @returns {object} response object
       * @memberof SmsController     *
       */
  static async getReceivedMessages(request, response) {
    try {
      const { id } = request.user;
      const messages = await models.SMS.findAll({
        where: { receiver_id: id }
      });

      if (messages.length < 1) {
        CustomError.handleError('No messages found', 404, response);
      }

      return response.status(200).json({
        success: true,
        message: 'messages found',
        messages,
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }

  /**
     * Gets a particular user's message
     *
     * @static
     * @param  {object} request - request object
     * @param  {object} response - response object
     * @returns {object} response object
     * @memberof SmsController     *
     */

  static async getMessage(request, response) {
    try {
      const { id } = request.user;
      const { messageId } = request.body;
      const message = await models.SMS.findOne({
        where: {
          id: messageId,
          receiver_id: id
        }
      });

      if (message.length < 1) {
        CustomError.handleError('Message not found', 404, response);
      }

      const status = await message.update({
        status: 0,
      });

      return response.status(200).json({
        success: true,
        message: 'message found',
        message,
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }

}