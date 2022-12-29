export default function clearFormTask(selector) {
  const inputs = document.querySelectorAll(`#${selector} input`);

  inputs.forEach(input => {
    if (input.type === 'text' || input.type === 'checkbox') {
      input.value = '';
    }

    if (input.type === 'date' || input.type === 'time') {
      input.removeAttribute('value');
      input.removeAttribute('min');
    }
  });
}