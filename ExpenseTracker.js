lucide.createIcons();
const expenses = [];
const expenseForm = document.getElementById("expenseForm");
const addButton = document.getElementById("addbutton");
const tbody = document.querySelector("#expenseTable tbody");
const editButtons = document.querySelector(".editButton");
const deleteButtons = document.querySelector(".deleteButton");

let isediting = false;
let editingIndex = null;

function createExpense(description, amount, category, date) {
    const newExpense = {
        description: description,
        amount: amount,
        category: category,
        date: date
    };
    expenses.push(newExpense);
}

let rowIndex = 0;

function displayExpenses() {
    tbody.innerHTML = "";
    expenses.forEach((expense, rowIndex) => {
        const row = document.createElement("tr");
        row.setAttribute("data-index", rowIndex);
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td><button class="editButton"><i data-lucide="pencil"></i></button></td>
            <td><button class="deleteButton"><i data-lucide="trash-2"></i></button></td>
        `;
        tbody.append(row);
    })
    lucide.createIcons();
    expenseForm.reset();
}
function updateExpense(index) { 
    const expense = expenses[index];
    document.getElementById("description").value = expense.description;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("category").value = expense.category;
    document.getElementById("date").value = expense.date;
    addButton.textContent = "Update Expense";
    }

function displayUpdatedExpense(index) {
    const expense = expenses[index];
    expense.description = document.getElementById("description").value;
    expense.amount = parseFloat(document.getElementById("amount").value);
    expense.category = document.getElementById("category").value;
    expense.date = document.getElementById("date").value;
    displayExpenses();
    addButton.textContent = "+Add Expense";
    isediting = false;
}

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isediting) {
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    createExpense(description, parseFloat(amount), category, date);
    displayExpenses();
}
else{
    displayUpdatedExpense(editingIndex);
}
})

tbody.addEventListener('click', (e) => {
    if (e.target.closest(".deleteButton")) {
        const button = e.target.closest(".deleteButton");
        const row = button.closest("tr");
        const index = parseInt(row.getAttribute("data-index"));
        expenses.splice(index, 1);
        displayExpenses();
    }
        if (e.target.closest(".editButton")) {
            const button = e.target.closest(".editButton");
            const row = button.closest("tr");
            const index = parseInt(row.getAttribute("data-index"));
            isediting = true;
            editingIndex = index;
            updateExpense(index);
        }
});

