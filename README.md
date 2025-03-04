# check-rule-mate-form

**check-rule-mate-form** is a lightweight and framework-agnostic form management library that integrates seamlessly with [check-rule-mate](https://www.npmjs.com/package/check-rule-mate) as a validation engine. It allows developers to easily manage data validation and error handling in a structured way.

## 🚀 Features

- ✅ **Framework-agnostic**: Works with vanilla JavaScript and can be easily integrated into React, Vue, Svelte, and others.
- ✅ **Built-in validation**: Uses check-rule-mate for powerful validation.
- ✅ **Async validation support**: Handle real-time API validation.
- ✅ **Automatic attribute management**: Define rules and attributes directly in JSON.
- ✅ **Custom error handling**: Automatically applies errors based on check-rule-mate structure.

## 📦 Installation

You can install it via npm:

```sh
npm install check-rule-mate-form
```

Or via yarn:

```sh
yarn add check-rule-mate-form
```

## 🛠️ Basic Usage

### **1. Define Your Validation Rules**

Create a JSON file with validation rules:

```json
{
  "name": {
    "rule": "name",
    "required": true,
    "attributes": {
      "label": "First Name",
      "maxLength": 32
    }
  },
  "email": {
    "rule": "email",
    "required": true
  },
  "message": {
    "rule": "hasText",
    "required": true
  }
}
```

### **2. Initialize FormManager**

```js
import { myValidator } from './validators.js';
import { FormManager } from 'check-rule-mate-form';
import RULES from './rules.json';
import ERROR_MESSAGES from './errors.json';

document.addEventListener('DOMContentLoaded', () => {
  const formElement = document.getElementById('contact-form');
  const formManager = new FormManager(formElement, RULES, myValidator, ERROR_MESSAGES);

  formManager.addAttributes();

  formElement.addEventListener('submit', async (e) => {
    const formValidated = await formManaager.handleFormSubmit(e);
    console.log(formValidated);
    if (formValidated.error) {
      // error scenario
    } else if (formValidated.ok) {
      // ok scenario
    }
  });
});
```

## 🏗️ Advanced Usage

### **Handling Input Change Events**
```js
const inputs = formElement.querySelectorAll('input');
inputs.forEach(input => input.addEventListener('change', formManager.handleInputChange));
```

### **Handling Form Reset**
```js
formElement.addEventListener('reset', formManager.handleFormReset);
```

## 📖 Documentation
(Coming soon) Full documentation will be available soon.

## 📝 License
MIT License.

