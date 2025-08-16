async function addNumbers() {
  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const resultDiv = document.getElementById('result');

  if (!a || !b) {
    resultDiv.textContent = '⚠️ Please enter both numbers.';
    resultDiv.style.color = 'red';
    return;
  }

  try {
    const res = await fetch('/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a, b })
    });
    const data = await res.json();

    if (data.error) {
      resultDiv.textContent = data.error;
      resultDiv.style.color = 'red';
    } else {
      resultDiv.textContent = `✅ Result: ${data.result}`;
      resultDiv.style.color = 'green';
      loadHistory();
    }
  } catch (err) {
    resultDiv.textContent = '❌ Server error';
    resultDiv.style.color = 'red';
  }
}

async function loadHistory() {
  const res = await fetch('/history');
  const history = await res.json();
  const historyList = document.getElementById('history');
  historyList.innerHTML = '';
  history.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.a} + ${entry.b} = ${entry.result}`;
    historyList.appendChild(li);
  });
}

window.onload = loadHistory;
