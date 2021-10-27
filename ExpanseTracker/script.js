const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     { id: 1, text: 'exp1', amount: -20 },
//     { id: 2, text: 'sal1', amount: 300 },
//     { id: 3, text: 'exp2', amount: -10 },
//     { id: 4, text: 'sal2', amount: 200 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const addTransaction = (e) => {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('please add a text and amount');
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        addTransactionToDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}

//generate random id
const generateId = () => Math.floor(Math.random() * 1000000);

//add transactions to dom list
const addTransactionToDOM = transaction => {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    //add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class='delete-btn' onclick='removeTranscation(${transaction.id})'>x</button>
        `;
    list.appendChild(item);
}

//update balance income and expance
const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount);
    const totalAmount = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expance = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0).toFixed(2) * -1;

    balance.innerText = `$${totalAmount}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expance}`;
}

//remove transaction by id
const removeTranscation = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

//update localStorage transactions
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//init app
const init = () => {
    list.innerHTML = '';
    transactions.forEach(addTransactionToDOM);
    updateValues();
}

init();

//event listeners
form.addEventListener('submit', addTransaction);