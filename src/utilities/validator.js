const joi = require('joi').extend(require('@joi/date'))

const passwordResponse = {'string.pattern.base': ` "Password should be minimum 8 and maximum 15 character.It contains atleast--> 1 Uppercase letter, 1 Lowercase letter, 1 Number, 1 Special character"`}
const errors = (check) => {
    let messages = {"string.base": `${check} should be a type of 'String'.`,"string.empty": `${check} cannot be an empty field.`,"any.required": `${check} is a required field.`}
    return messages
}        
const numberError = (check) => {
   let messages = {"number.base": `${check} should be a type of 'number'.`,"number.empty": `${check} cannot be an empty field.`,"any.required": `${check} is a required field.`}
    return messages
}
module.exports = {
    //SCHEMA VALIDATION FOR USERMODEL
    userModel: joi.object({
     userType: joi.string().trim().regex(/^(User|Admin)+$\b/).messages({'string.pattern.base': `User Type should be either 'User' or 'Admin'`}).default('User').messages(errors("User type")),
        title: joi.string().trim().regex(/^(Mr|Mrs|Miss)+$\b/).messages({'string.pattern.base': `Title should be among [Mr,Mrs,Miss]`}).required().messages(errors("Title")),
         name: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid name.`}).required().messages(errors("Username")),
        phone: joi.string().trim().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits only.`}).required().messages(errors("Mobile number")),
        email: joi.string().trim().regex(/.+\@.+\..+/).messages({'string.pattern.base': `Plz enter a valid emailId`}).required().messages(errors("emailId")),
     password: joi.string().trim().min(8).messages({'string.min': 'password should be minimum 8 characters'}).max(15).messages({'string.max': 'password should be maximum 15 characters'})
     .regex(/^\S{8,24}$/).messages(passwordResponse).required().messages(errors("Password")),
          dob: joi.date().format('DD/MM/YYYY').required().messages({"date.base": 'DOB should be a type of string as well as date format',"any.required": `DOB is a required field.`})
    }),
    updateUserModel: joi.object({
     userType: joi.string().trim().regex(/^(User|Admin)+$\b/).messages({'string.pattern.base': `User Type should be either 'User' or 'Admin'`}).messages(errors("User type")),
        title: joi.string().trim().regex(/^(Mr|Mrs|Miss)+$\b/).messages({'string.pattern.base': `Title should be among [Mr,Mrs,Miss]`}).messages(errors("Title")),
         name: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid name.`}).messages(errors("Username")),
        phone: joi.string().trim().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits only.`}).messages(errors("Mobile number")),
        email: joi.string().trim().regex(/.+\@.+\..+/).messages({'string.pattern.base': `Plz enter a valid emailId`}).messages(errors("emailId")),
     password: joi.string().trim().min(8).messages({'string.min': 'password should be minimum 8 characters'}).max(15).messages({'string.max': 'password should be maximum 15 characters'})
     .regex(/^\S{8,24}$/).messages(passwordResponse).messages(errors("Password")),
     dob: joi.date().format('DD/MM/YYYY').messages({"date.base": 'DOB should be a type of string as well as date format'})
    }),
     //LOGIN VALIDATION
     loginValidation: joi.object({
        email: joi.string().trim().regex(/.+\@.+\..+/).messages({'string.pattern.base': `emailId is in inValid format`}).required().messages(errors("emailId")),
     password: joi.string().trim().min(8).messages({'string.min': 'password should be minimum 8 characters'}).max(15).messages({'string.max': 'password should be maximum 15 characters'})
                  .regex(/^\S{8,24}$/).messages(passwordResponse).required().messages(errors("Password"))
              }),
    // FLIGHT MODEL
    flightValidation: joi.object({
       airline: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid airline.`}).required().messages(errors("Air line")),
        number: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid flight number.`}).required().messages(errors("flight number")),
        origin: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid origin name.`}).required().messages(errors("Origin")),
   destination: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid destination name.`}).required().messages(errors("Destination")),
 departureDate: joi.date().format('DD/MM/YYYY').messages({"date.base": 'Departure date should be a type of string as well as date format'}),
   arrivalDate: joi.date().format('DD/MM/YYYY').messages({"date.base": 'Arrival date should be a type of string as well as date format'}),
      duration: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid duration.`}).required().messages(errors("Duration")),
       stopage: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid stopage.`}).required().messages(errors("stopage")),
         price: joi.number().required().messages(numberError('Price')),
         seats: joi.number().required().messages(numberError('Seats'))
      }),
      updateFlightValidation: joi.object({
         airline: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid airline.`}).messages(errors("Air line")),
          number: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid flight number.`}).messages(errors("flight number")),
          origin: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid origin name.`}).messages(errors("Origin")),
     destination: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid destination name.`}).messages(errors("Destination")),
   departureDate: joi.date().format('DD/MM/YYYY').messages({"date.base": 'Departure date should be a type of string as well as date format'}),
     arrivalDate: joi.date().format('DD/MM/YYYY').messages({"date.base": 'Arrival date should be a type of string as well as date format'}),
        duration: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid duration.`}).messages(errors("Duration")),
         stopage: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({'string.pattern.base': `Plz enter a valid stopage.`}).messages(errors("stopage")),
           price: joi.number().messages(numberError('Price')),
           seats: joi.number().messages(numberError('Seats'))
      })
}