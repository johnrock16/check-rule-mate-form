import { dataValidate } from "check-rule-mate";

function FormManager(formElement, dataRule, rules, validationHelpers, dataErrorMessages) {
  const state = {
    onceError: false
  }

  async function handleInputChange(e) {
    if (!state.onceError || !dataRule[e.target.name]) return;
    const formData = getFormData(formElement);
    const formRule = mockInputDataRules(formData);
    const inputValidated = await dataValidate({...formData, [e.target.name]:e.target.value}, {validationHelpers, rules, dataRule: {...formRule, [e.target.name]: dataRule[e.target.name]}, dataErrorMessages});
    toogleErrorMessage(e.target, inputValidated?.dataErrors?.[e.target.name]);
  }

  async function handleFormSubmit(e, {onSuccess, onError} = {onSuccess: null, onError: null}) {
    e.preventDefault();
    const formData = getFormData(formElement);
    const formValidated = await dataValidate(formData, {validationHelpers, rules, dataRule: dataRule, dataErrorMessages});

    if(formValidated.error) {
      state.onceError = true;
      formElement.querySelectorAll('input').forEach((inputElement) => {
        toogleErrorMessage(inputElement, formValidated?.dataErrors?.[inputElement.name]);
      });
      if (onError && typeof onError === 'function') {
        onError(formValidated)
      }
    } else if (formValidated.ok && onSuccess && typeof onSuccess === 'function') {
      onSuccess({...formValidated, formData})
    }
  }

  function handleFormReset() {
    formElement.querySelectorAll('input').forEach((inputElement) => {
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

  function mockInputDataRules(formData) {
    const formRule = {};
    Object.keys(formData).forEach((key) => {
      formRule[key] = {
        rule: "hasText",
        required: false
      }
    });
    return formRule;
  }

  function addAttributes() {
    Object.keys(dataRule).forEach((key) => {
      if (rules[dataRule[key].rule]?.attributes) {
        Object.keys(rules[dataRule[key].rule]?.attributes).forEach((attributeKey) => {
          if (rules[dataRule[key].rule]?.attributes?.[attributeKey]) {
            const inputElement = formElement.querySelector(`input[name=${key}]`);
            inputElement[attributeKey] = rules[dataRule[key].rule]?.attributes[attributeKey];
          }
        });
      }
      if (dataRule[key].attributes) {
        Object.keys(dataRule[key].attributes).forEach((attributeKey) => {
          if (attributeKey === 'label') {
            const labelElement = formElement.querySelector(`label[for=${key}]`);
            labelElement.textContent = dataRule[key].attributes[attributeKey];
          } else {
            const inputElement = formElement.querySelector(`input[name=${key}]`);
            inputElement[attributeKey] = dataRule[key].attributes[attributeKey];
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
        fieldErrorElement.textContent = dataError.errorMessage;
      } else {
        const newFieldErrorElement = window.document.createElement('span');
        newFieldErrorElement.classList.add('check-rule-mate-error');
        newFieldErrorElement.innerHTML = dataError.errorMessage;
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

export default FormManager;