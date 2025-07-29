 const form = document.getElementById('form');
    const desc = document.getElementById('desc');
    const amount = document.getElementById('amount');
    const type = document.getElementById('type');
    const list = document.getElementById('list');
    const incomeEl = document.getElementById('income');
    const expenseEl = document.getElementById('expense');
    const balanceEl = document.getElementById('balance');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    function updateValues() {
      let income = 0, expense = 0;
      transactions.forEach(t => {
        if (t.type === 'income') income += t.amount;
        else expense += t.amount;
      });
      incomeEl.textContent = income;
      expenseEl.textContent = expense;
      balanceEl.textContent = income - expense;
    }

    function renderList() {
      list.innerHTML = '';
      transactions.forEach((t, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${t.desc} - ₹${t.amount} <button onclick="removeItem(${index})">X</button>
        `;
        list.appendChild(li);
      });
    }

    function removeItem(index) {
      transactions.splice(index, 1);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      renderList();
      updateValues();
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const newTransaction = {
        desc: desc.value,
        amount: +amount.value,
        type: type.value
      };
      transactions.push(newTransaction);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      desc.value = '';
      amount.value = '';
      renderList();
      updateValues();
    });

    // Initialize
    renderList();
    updateValues();