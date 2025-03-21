import { myValidator } from './dataValidator/validators.js';
import { FormManager } from "../../src/main.js";
import MY_RULES from './dataValidator/rules/validators/myValidatorRules.json';
import CONTACT_US from './dataValidator/rules/data/contactUs.json';
import MY_VALIDATION_ERROR_MESSAGES from './i18n/en_US/errors/myValidatorRules.json';

document.addEventListener('DOMContentLoaded', function() {
  const formElement = document.getElementById('form');
  const formInputs = formElement.querySelectorAll('input');
  const formManaager = new FormManager(formElement, CONTACT_US, MY_RULES, myValidator, MY_VALIDATION_ERROR_MESSAGES);
  formManaager.addAttributes();

  formInputs.forEach((formInput) => formInput.addEventListener('change', formManaager.handleInputChange));
  formElement.addEventListener('reset', formManaager.handleFormReset);
  formElement.addEventListener('submit', async (e) => {
    const formValidated = await formManaager.handleFormSubmit(e);
    console.log(formValidated);
    if (formValidated.error) {
      alert('form is invalid')
    } else if (formValidated.ok) {
      alert('form is valid')
    }
  });
});
