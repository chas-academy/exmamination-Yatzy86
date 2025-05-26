// Arrays för att lagra inkomster och utgifter
const income = [];
const expenses = [];

// Hämta element från DOM
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const incomeBtn = document.getElementById('incomeBtn');
const expenseBtn = document.getElementById('expenseBtn');
const incomeList = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');
const transactionList = document.getElementById('transactionList');
const balanceDisplay = document.getElementById('balance');

// Funktion för att uppdatera saldo
function updateBalance() {
  const incomeTotal = income.reduce((sum, item) => sum + item.amount, 0);
  const expenseTotal = expenses.reduce((sum, item) => sum + item.amount, 0);
  const total = incomeTotal - expenseTotal;
  balanceDisplay.textContent = total.toString();
}

// Funktion för att skapa och visa en transaktion
function addTransaction(type) {
  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description === '' || isNaN(amount) || amount <= 0) {
    alert('Fyll i en giltig beskrivning och ett belopp större än 0.');
    return;
  }

  const transaction = { description, amount, type };

  if (type === 'income') {
    income.push(transaction);
    displayTransaction(transaction, incomeList, 'income');
  } else {
    expenses.push(transaction);
    displayTransaction(transaction, expenseList, 'expense');
  }

  displayTransaction(transaction, transactionList, type);
  updateBalance();
  clearInputs();
}

// Funktion för att visa en transaktion i en lista
function displayTransaction(transaction, listElement, cssClass) {
  const li = document.createElement('li');
  li.className = cssClass;
  
    const typeText = transaction.type === 'income' ? 'Inkomst' : 'Utgift';
    const formattedAmount = transaction.type === 'expense' ? `-${transaction.amount}` : transaction.amount;

  li.textContent = `${transaction.description} - ${formattedAmount} kr (${typeText})`;
  listElement.appendChild(li);
}

// Funktion för att rensa input-fälten
function clearInputs() {
  descInput.value = '';
  amountInput.value = '';
}

// Eventlyssnare för knappar
incomeBtn.addEventListener('click', () => addTransaction('income'));
expenseBtn.addEventListener('click', () => addTransaction('expense'));

if (typeof module !== 'undefined') {
  module.exports = {
    addTransaction,
    updateBalance,
    income,
    expenses
  };
}