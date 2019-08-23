import models from '../../models';
import CustomError from '../../helpers/errorHandler';
import bcrypt from 'bcrypt';
import auth from '../../middlewares/Authentication';

/**
 * Handles operations on contact routes
 *
 * @exports
 * @class ContactController
 */
export default class ContactController {
  /**
    * Creates a user
    *
    * @static
    * @param  {object} request - request object
    * @param  {object} response - response object
    * @returns {object} response object
    * @memberof ContactController     *
    */
  static async createUser(request, response) {
    try {
      const { name, password, phoneNumber } = request.body;

      const foundUser = await models.Contact.findOne({
        where: { name }
      });

      if (foundUser) {
        CustomError.handleError('User already exists', 409, response);
        return;
      }

      const foundNumber = await models.Contact.findOne({
        where: { phone_number: phoneNumber }
      });

      if (foundNumber) {
        CustomError.handleError('Phone Number already exists', 409, response);
        return;
      }

      const hash = bcrypt.hashSync(password, 10);

      const createdUser = await models.Contact.create({
        name,
        phone_number: phoneNumber,
        password: hash,
      });

      if (createdUser) {
        return response.status(201).json({
          success: true,
          message: 'User created successfully',
          user: createdUser
        });
      }
    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }

  /**
    * Logs in a user
    *
    * @static
    * @param  {object} request - request object
    * @param  {object} response - response object
    * @returns {object} response object
    * @memberof ContactController     *
    */
  static async loginUser(request, response) {
    try {
      const { password, phoneNumber } = request.body;

      const foundUser = await models.Contact.findOne({
        where: {
          phone_number: phoneNumber,
        }
      });

      if (!foundUser) {
        CustomError.handleError('Invalid phone number', 400, response);
        return;
      }

      const check = bcrypt.compareSync(password, foundUser.password);

      if (!check) {
        CustomError.handleError('Invalid password', 400, response);
        return;
      }

      const token = auth.authenticate(foundUser);

      return response.status(200).json({
        success: true,
        message: 'User Logged in successfully',
        token
      });

    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }

  /**
    * Deletes a user
    *
    * @static
    * @param  {object} request - request object
    * @param  {object} response - response object
    * @returns {object} response object
    * @memberof ContactController     *
    */
  static async deleteUser(request, response) {
    try {
      const { contactId } = request.params;
      const foundContact = await models.Contact.findOne({
        where: { id: contactId }
      });

      if (!foundContact) {
        return response.status(400).json({
          success: false,
          message: 'The User does not exist'
        });
      }

      await foundContact.destroy();

      return response.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }

  /**
      * Gets a user
      *
      * @static
      * @param  {object} request - request object
      * @param  {object} response - response object
      * @returns {object} response object
      * @memberof ContactController     *
      */

  static async getUser(request, response) {
    try {
      const { contactId } = request.params;

      const User = await models.Contact.findOne({
        where: {
          id: contactId,
        }
      });
      if (User.length < 1) {
        CustomError.handleError('User not found', 404, response);
      }

      return response.status(200).json({
        success: true,
        message: 'user found',
        user: User,
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }

}