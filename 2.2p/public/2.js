const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const addBtn = document.getElementById('addBtn');
const resultEl = document.getElementById('result');
const historyEl = document.getElementById('history');

addBtn.addEventListener('click', async () => {
  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);

  if (isNaN(num1) || isNaN(num2)) {
    resultEl.textContent = 'Enter the valid number.';
    return;
  }

  const res = await fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ num1, num2 })
  });

  const data = await res.json();

  resultEl.textContent = `Result: ${data.result}`;

  const entry = document.createElement('p');
  entry.textContent = `${data.num1} + ${data.num2} = ${data.result}`;
  historyEl.appendChild(entry);

  num1Input.value = '';
  num2Input.value = '';
  num1Input.focus();
});
