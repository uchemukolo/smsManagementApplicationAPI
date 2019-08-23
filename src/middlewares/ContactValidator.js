import CustomError from '../helpers/errorHandler';

/**
 * Handles sms validations
 *
 * @exports
 * @class SmsValidator
 */
export default class ContactValidator {
  /**
     * Check contact fields
     *
     * @static
     * @param  {object} request - request object
     * @param  {object} response - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof ContactValidator     *
     */
  static checkContactFields(request, response, next) {
    const { name, password, phoneNumber } = request.body;
    if ((!name || !name.replace(/\s/g, '').length) || (!password || !password.replace(/\s/g, '').length) || (!phoneNumber || !phoneNumber.replace(/\s/g, '').length)) {
      CustomError.handleError('Invalid Payloads', 400, response);
    }
    else {
      next();
    }

  }

  /**
    * Check Login fields
    *
    * @static
    * @param  {object} request - request object
    * @param  {object} response - response object
    * @param  {object} next - next object
    * @returns {object} response object
    * @memberof ContactValidator     *
    */
  static checkLoginFields(request, response, next) {
    const { password, phoneNumber } = request.body;
    if (!password.replace(/\s/g, '').length || !phoneNumber.replace(/\s/g, '').length) {
      CustomError.handleError('Invalid Payloads', 400, response);
    }
    else {
      next();
    }

  }

  /**
    * Check contact route params
    *
    * @static
    * @param  {object} request - request object
    * @param  {object} response - response object
    * @param  {object} next - next object
    * @returns {object} response object
    * @memberof ContactValidator     *
    */
  static checkParam(request, response, next) {
    const { contactId } = request.params;
    if (!Number(contactId)) {
      CustomError.handleError('Invalid contact id parameter', 400, response);
    }
    else {
      next();
    }
  }
}
