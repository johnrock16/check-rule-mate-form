import{dataValidate as p}from"check-rule-mate";function x(c,o,i,u,m){let s={onceError:!1};async function E(e){if(!s.onceError||!o[e.target.name])return;let t=f(c),r=q(t),a=await p({...t,[e.target.name]:e.target.value},{validationHelpers:u,rules:i,dataRule:{...r,[e.target.name]:o[e.target.name]},dataErrorMessages:m});d(e.target,a?.dataErrors?.[e.target.name])}async function g(e,{onSuccess:t,onError:r}={onSuccess:null,onError:null}){e.preventDefault();let a=f(c),n=await p(a,{validationHelpers:u,rules:i,dataRule:o,dataErrorMessages:m});n.error?(s.onceError=!0,c.querySelectorAll("input").forEach(l=>{d(l,n?.dataErrors?.[l.name])}),r&&typeof r=="function"&&r(n)):n.ok&&t&&typeof t=="function"&&t({...n,formData:a})}function b(){c.querySelectorAll("input").forEach(e=>{let t=e.parentElement,r=t.querySelector(".check-rule-mate-error");e.value="",t.classList.remove("field-error"),r&&t.removeChild(r)}),s.onceError=!1}function f(e){let t=e.querySelectorAll("input, textarea, select"),r={};return t.forEach(a=>{let{name:n,type:l,value:h,checked:v}=a;n&&(l==="checkbox"||l==="radio"?v&&(r[n]=h):r[n]=h)}),r}function q(e){let t={};return Object.keys(e).forEach(r=>{t[r]={rule:"hasText",required:!1}}),t}function S(){Object.keys(o).forEach(e=>{i[o[e].rule]?.attributes&&Object.keys(i[o[e].rule]?.attributes).forEach(t=>{if(i[o[e].rule]?.attributes?.[t]){let r=c.querySelector(`input[name=${e}]`);r[t]=i[o[e].rule]?.attributes[t]}}),o[e].attributes&&Object.keys(o[e].attributes).forEach(t=>{if(t==="label"){let r=c.querySelector(`label[for=${e}]`);r.textContent=o[e].attributes[t]}else{let r=c.querySelector(`input[name=${e}]`);r[t]=o[e].attributes[t]}})})}function d(e,t){let r=e.parentElement,a=r.querySelector(".check-rule-mate-error");if(r.classList.add("field-error"),t)if(a)a.textContent=t.errorMessage;else{let n=window.document.createElement("span");n.classList.add("check-rule-mate-error"),n.innerHTML=t.errorMessage,r.appendChild(n)}else r.classList.remove("field-error"),a&&r.removeChild(a)}return{handleFormSubmit:g,handleFormReset:b,handleInputChange:E,addAttributes:S,getFormData:f}}var C=x;export{C as FormManager};
