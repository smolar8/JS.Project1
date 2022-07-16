const incomeForm = document.getElementById("income-form");
const incomeName = document.getElementById("income-name");
const incomeAmount = document.getElementById("income-amount");
const incomeBtn = document.getElementById("income-btn");
const incomeList = document.getElementById("income-list");

const displayedSumIncome = document.getElementById("sumincome");
const displayedSumOutlay = document.getElementById("sumoutlay");

const msg = document.getElementById("msg");
let sum = 0;

let sumIncome = 0;
let sumOutlay = 0;
const income = [];
const expenses = [];

function calculations() {
  const sumDisbursement = expenses.reduce(
    (acc, currentValue) => acc + Number(currentValue.amount),
    0
  );
  displayedSumOutlay.innerHTML = sumDisbursement;
  const sumProfit = income.reduce(
    (acc, currentValue) => acc + Number(currentValue.amount),
    0
  );
  displayedSumIncome.innerHTML = sumProfit;
  const sum = sumProfit - sumDisbursement;

  if (sum > 0) {
    msg.innerHTML = `Możesz jeszcze wydać ${sum} złotych`;
  } else if (sum < 0) {
    msg.innerHTML = `Bilans jest ujemny. Jesteś na minusie ${sum} złotych`;
  } else {
    msg.innerHTML = `Bilans wynosi zero`;
  }
}
function summationIncome(income) {
  sumIncome += Number(income);
  displayedSumIncome.innerHTML = sumIncome;
}

function summationOutlay(income) {
  sumOutlay += Number(income);
  displayedSumOutlay.innerHTML = sumOutlay;
}

incomeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const item = {
    name: incomeName.value,
    amount: incomeAmount.value,
    id: Math.random(),
  };
  income.push(item);

  calculations();
  getIncomeList();
});

function getIncomeList() {
  incomeList.innerHTML = "";
  income.forEach((element) => {
    const item = document.createElement("li");
    item.id = element.id;
    const content = document.createElement("span");
    content.textContent = `${element.name} - ${element.amount}zł`;

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "edytuj";
    editBtn.addEventListener("click", () => {
      item.removeChild(content);
      item.removeChild(editBtn);

      const nameInput = document.createElement("input");
      const amountInput = document.createElement("input");
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "zapisz";

      nameInput.value = element.name;
      amountInput.value = element.amount;
      item.insertAdjacentElement(`afterbegin`, saveBtn);
      item.insertAdjacentElement(`afterbegin`, amountInput);
      item.insertAdjacentElement(`afterbegin`, nameInput);
      saveBtn.addEventListener("click", () => {
        const name = nameInput.value;
        const amount = amountInput.value;

        const itemToChange = income.find((income) => income.id === element.id);
        itemToChange.name = name;
        itemToChange.amount = amount;

        calculations();
        getIncomeList();
      });
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "usuń";

    removeBtn.classList.add("delete-btn");

    removeBtn.addEventListener("click", () => {
      const indexToRemove = income.indexOf(element);
      income.splice(indexToRemove, 1);

      calculations();
      getIncomeList();
    });

    item.appendChild(content);
    item.appendChild(editBtn);
    item.appendChild(removeBtn);
    incomeList.appendChild(item);
  });
}
const expensesForm = document.getElementById("expenses-form");
const expensesName = document.getElementById("expenses-name");
const expensesAmount = document.getElementById("expenses-amount");
const expensesBtn = document.getElementById("expenses-btn");
const expensesList = document.getElementById("expenses-list");

expensesForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const item = {
    name: expensesName.value,
    amount: expensesAmount.value,
    id: Math.random(),
  };
  expenses.push(item);

  calculations();
  getExpensesList();
});
function getExpensesList() {
  expensesList.innerHTML = "";
  expenses.forEach((element) => {
    const item = document.createElement("li");
    item.id = element.id;
    const content = document.createElement("span");
    content.textContent = `${element.name} - ${element.amount}zł`;

    const editBtn = document.createElement("button");

    editBtn.textContent = "edytuj";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => {
      item.removeChild(content);
      item.removeChild(editBtn);

      const nameInput = document.createElement("input");
      const amountInput = document.createElement("input");
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "zapisz";

      nameInput.value = element.name;
      amountInput.value = element.amount;
      item.insertAdjacentElement(`afterbegin`, saveBtn);
      item.insertAdjacentElement(`afterbegin`, amountInput);
      item.insertAdjacentElement(`afterbegin`, nameInput);
      saveBtn.addEventListener("click", () => {
        const name = nameInput.value;
        const amount = amountInput.value;

        const itemToChange = expenses.find(
          (income) => income.id === element.id
        );
        itemToChange.name = name;
        itemToChange.amount = amount;
        calculations();
        getExpensesList();
      });
    });

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("delete-btn");

    removeBtn.textContent = "usuń";

    removeBtn.addEventListener("click", () => {
      const indexToRemove = expenses.indexOf(element);
      expenses.splice(indexToRemove, 1);

      calculations();
      getExpensesList();
    });
    item.appendChild(content);
    item.appendChild(editBtn);
    item.appendChild(removeBtn);
    expensesList.appendChild(item);
  });
}
