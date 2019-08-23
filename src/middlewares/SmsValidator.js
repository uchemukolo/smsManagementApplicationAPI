import CustomError from '../helpers/errorHandler';

export default class SmsValidator {

  /**
     * Check message fields
     *
     * @static
     * @param  {object} request - request object
     * @param  {object} response - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof SmsValidator     *
     */
  static checkMessageFields(request, response, next) {
    const { message } = request.body;
    if (!message || !message.replace(/\s/g, '').length) {
      CustomError.handleError('Invalid Message Payload', 400, response);
    }
    else {
      next();
    }

  }

  /**
      * Check message route params
      *
      * @static
      * @param  {object} request - request object
      * @param  {object} response - response object
      * @param  {object} next - next object
      * @returns {object} response object
      * @memberof SmsValidator     *
      */
  static checkParam(request, response, next) {
    const { messageId } = request.params;
    if (!Number(messageId)) {
      CustomError.handleError('Invalid message id parameter', 400, response);
    }
    else {
      next();
    }
  }

  /**
    * Check message creation params
    *
    * @static
    * @param  {object} request - request object
    * @param  {object} response - response object
    * @param  {object} next - next object
    * @returns {object} response object
    * @memberof SmsValidator     *
    */
  static checkReceiver(request, response, next) {
    const { receiverId } = request.params;
    if (!Number(receiverId)) {
      CustomError.handleError('Invalid receiver id parameter', 400, response);
    }
    else {
      next();
    }
  }
}
