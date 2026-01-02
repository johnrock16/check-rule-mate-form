import { myValidator } from './dataValidator/validators.js';
import { FormManager } from "../../src/main.js";
import MY_RULES from './dataValidator/rules/validators/myValidatorRules.json';
import CONTACT_US from './dataValidator/rules/data/contactUs.json';
import MY_VALIDATION_ERROR_MESSAGES from './i18n/en_US/errors/myValidatorRules.json';

document.addEventListener('DOMContentLoaded', function() {
  const formElement = document.getElementById('form');
  const formInputs = formElement.querySelectorAll('input, select, textarea');
  const formManager = new FormManager(formElement, { schema: CONTACT_US, rules: MY_RULES, validationHelpers: myValidator, errorMessages: MY_VALIDATION_ERROR_MESSAGES, options: { abortEarly: false, propertiesMustMatch: false }} );
  formManager.addAttributes();

  formInputs.forEach((formInput) => formInput.addEventListener('change', formManager.handleInputChange));
  formElement.addEventListener('reset', formManager.handleFormReset);
  formElement.addEventListener('submit', async (e) => {
    const formValidated = await formManager.handleFormSubmit(e);
    console.log(formValidated);
    if (formValidated.error) {
      alert('form is invalid, open the console');
    } else if (formValidated.ok) {
      alert('form is valid, open the console');
    }
  });
});
