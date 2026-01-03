import { createValidator } from "check-rule-mate";

export function FormManager(formElement, { schema, rules, validationHelpers, errorMessages, options }) {
  const formValidator = createValidator(getFormData(formElement), { validationHelpers: validationHelpers, rules: rules, schema: schema, errorMessages: errorMessages, options: options});
  const state = {
    onceError: false
  }

  async function handleInputChange(e) {
    if (!state.onceError || !schema[e.target.name]) return;
    const formData = getFormData(formElement);

    formValidator.setData({...formData, [e.target.name]:e.target.value});

    const inputValidated = await formValidator.validateField(e.target.name);

    toogleErrorMessage(e.target, inputValidated?.errors);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    return new Promise(async (resolve, reject) => {
      const formData = getFormData(formElement);
      formValidator.setData(formData)

      const formValidated = await formValidator.validate()

      if (formValidated.error) {
        state.onceError = true;
        formElement.querySelectorAll('input, select, textarea').forEach((inputElement) => {
          toogleErrorMessage(inputElement, formValidated?.errors?.[inputElement.name]);
        });
        resolve({...formValidated, formData});
      } else if (formValidated.ok) {
        resolve({...formValidated, formData});
      }
      reject({error: true});
    });
  }

  function handleFormReset() {
    formElement.querySelectorAll('input, select, textarea').forEach((inputElement) => {
      const fieldElement = inputElement.parentElement;
      const errorElement = fieldElement.querySelector('.check-rule-mate-error');

      inputElement.value = '';
      fieldElement.classList.remove('field-error');
      if (errorElement) {
        fieldElement.removeChild(errorElement);
      }
    });
    state.onceError = false;
  }

  function getFormData(formElement) {
    const elements = formElement.querySelectorAll('input, textarea, select');
    const formData = {};

    elements.forEach(element => {
      const { name, type, value, checked } = element;
      if (name) {
        if (type === 'checkbox' || type === 'radio') {
          if (checked) {
            formData[name] = value;
          }
        } else {
          formData[name] = value;
        }
      }
    });
    return formData;
  }

  function addAttributes() {
    Object.keys(schema).forEach((key) => {
      if (rules[schema[key].rule]?.attributes) {
        Object.keys(rules[schema[key].rule]?.attributes).forEach((attributeKey) => {
          if (rules[schema[key].rule]?.attributes?.[attributeKey]) {
            const inputElement = formElement.querySelector(`input[name=${key}]`);
            inputElement[attributeKey] = rules[schema[key].rule]?.attributes[attributeKey];
          }
        });
      }
      if (schema[key].attributes) {
        Object.keys(schema[key].attributes).forEach((attributeKey) => {
          if (attributeKey === 'label') {
            const labelElement = formElement.querySelector(`label[for=${key}]`);
            labelElement.textContent = schema[key].attributes[attributeKey];
          } else {
            const inputElement = formElement.querySelector(`input[name=${key}]`);
            inputElement[attributeKey] = schema[key].attributes[attributeKey];
          }
        });
      }
    });
  }

  function toogleErrorMessage(inputElement, dataError) {
    const fieldElement = inputElement.parentElement;
    const fieldErrorElement = fieldElement.querySelector('.check-rule-mate-error');
    fieldElement.classList.add('field-error');
    if (dataError) {
      if (fieldErrorElement) {
        fieldErrorElement.textContent = dataError.message;
      } else {
        const newFieldErrorElement = window.document.createElement('span');
        newFieldErrorElement.classList.add('check-rule-mate-error');
        newFieldErrorElement.innerHTML = dataError.message;
        fieldElement.appendChild(newFieldErrorElement);
      }
    } else {
      fieldElement.classList.remove('field-error');
      if (fieldErrorElement) {
        fieldElement.removeChild(fieldErrorElement);
      }
    }
  }

  return {
    handleFormSubmit,
    handleFormReset,
    handleInputChange,
    addAttributes,
    getFormData
  }
}
