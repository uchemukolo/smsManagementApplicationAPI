import fs from 'fs';
import CustomError from '../helpers/errorHandler';
import generateNumber from '../helpers/numberGenerator';
import {
  MAX_LENGTH,
  MIN_LENGTH,
  FILE_NAME,
  FILE_PATH
} from '../helpers/defaultData';

export default class PhoneNumberGeneratorController {
       /**
     * The generate method
     *
     * @static
     * @param  {object} quantity - quantity integer
     * @param  {object} order - order string
     * @returns {object}  object
     * @memberof PhoneNumberGeneratorController     *
     */
    static async generatedNumbers(amountOfNumbers) {
      try {
          const generatedPhoneNumbers = [];

          while (generatedPhoneNumbers.length < amountOfNumbers) {
              const number = generateNumber(MIN_LENGTH, MAX_LENGTH);
              if (!generatedPhoneNumbers.includes(number)) {
                 generatedPhoneNumbers.push(number);
              }
          }
          return generatedPhoneNumbers;
        } catch (error) {
            CustomError.handleError(error, 500, response);
        }
    }

      /**
     * The generatePhoneNumbers route
     *
     * @static
     * @param  {object} request - request object
     * @param  {object} response - response object
     * @returns {object} response object
     * @memberof PhoneNumberGeneratorController     *
     */
    static async generatePhoneNumbers(request, response) {
      try {
        const { quantity, order } = request.query;
        const amountOfNumbers = parseInt(quantity, 10);

        const generatedPhoneNumbers = await PhoneNumberGeneratorController.generatedNumbers(amountOfNumbers);

        if(order === 'ascending'){
          generatedPhoneNumbers.sort();
        } else {
          generatedPhoneNumbers.sort().reverse();
        }

        if (!fs.existsSync(FILE_PATH)){
            fs.mkdirSync(FILE_PATH);
        }

        fs.writeFile(FILE_NAME,generatedPhoneNumbers.toString(), error => console.log(error));

        return response.status(201).json({
          success: true,
          message: 'Phone numbers generated successfully!!!',
          phoneNumbers: generatedPhoneNumbers
        });

      } catch (error) {
        CustomError.handleError(error, 500, response);
      }
    }

    static async getPhoneNumbers(request, response) {
      try {
        const { quantity, order } = request.query;
          if (!fs.existsSync(FILE_PATH)) {
            return response.status(404).json({
              success: true,
              message: 'No phone numbers generated!!!',
              totalGeneratedPhoneNumbers: 0
            });
          }
          const generatedPhoneNumbers = fs.readFileSync(FILE_NAME).toString();
          let generatedPhoneNumbersList;
          let totalGeneratedPhoneNumbers;

          if(!generatedPhoneNumbers.replace(/\s/g, '').length){
            generatedPhoneNumbersList = [];
            totalGeneratedPhoneNumbers = 0;
          } else{
            generatedPhoneNumbersList = await generatedPhoneNumbers.split(',');
            totalGeneratedPhoneNumbers = generatedPhoneNumbersList.length;
          }

          if (quantity) {
            generatedPhoneNumbersList.splice(quantity);
          }

          if(order === 'ascending'){
            generatedPhoneNumbersList.sort();
          } else {
            generatedPhoneNumbersList.sort().reverse();
          }

          return response.status(200).json({
            success: true,
            message: 'Phone numbers retrieved successfully!!!',
            generatedPhoneNumbersList,
            totalGeneratedPhoneNumbers
          });
      } catch (error) {
        CustomError.handleError(error, 500, response);
      }
  }
  static async getMinMaxPhoneNumbers(request, response) {
    try {
      const generatedPhoneNumbers = fs.readFileSync(FILE_NAME).toString();

      let generatedPhoneNumbersList;

      if(!generatedPhoneNumbers.replace(/\s/g, '').length){
        CustomError.handleError('No phone numbers generated yet', 404, response);
      } else{
        generatedPhoneNumbersList = await generatedPhoneNumbers.split(',');
      }

        const MIN_PHONE_NUMBER = `0${Math.min(...generatedPhoneNumbersList)}`;
        const MAX_PHONE_NUMBER = `0${Math.max(...generatedPhoneNumbersList)}`;

        return response.status(200).json({
            success: true,
            message: 'Minimum and Maximum phone numbers retrieved sucessfully',
            minimum_phone_number: MIN_PHONE_NUMBER,
            maximum_phone_number: MAX_PHONE_NUMBER
        });
    } catch (error) {
      CustomError.handleError(error, 500, response);
    }
}
}