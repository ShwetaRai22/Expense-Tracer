lucide.createIcons();
const expenses = [];
const expenseForm = document.getElementById("expenseForm");
const addButton = document.getElementById("addbutton");
const tbody = document.querySelector("#expenseTable tbody");
const editButtons = document.querySelector(".editButton");
const deleteButtons = document.querySelector(".deleteButton");
const filterItem=document.getElementById("filterCategory");

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

function displayExpenses(expenses) {
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
    displayExpenses(expenses);
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
        console.log(amount);
        createExpense(description, parseFloat(amount), category, date);
        displayExpenses(expenses);
        displaytotalExpense();
        displayBalance();
        dailyAvg();
        monthly();
    }
    else {
        displayUpdatedExpense(editingIndex);
        displaytotalExpense();
        displayBalance();
        dailyAvg();
        monthly();
    }
    
})

tbody.addEventListener('click', (e) => {
    if (e.target.closest(".deleteButton")) {
        const button = e.target.closest(".deleteButton");
        const row = button.closest("tr");
        const index = parseInt(row.getAttribute("data-index"));
        expenses.splice(index, 1);
        displayExpenses(expenses);
        displaytotalExpense();
        displayBalance();
        dailyAvg();
        monthly();
    }
    if (e.target.closest(".editButton")) {
        const button = e.target.closest(".editButton");
        const row = button.closest("tr");
        const index = parseInt(row.getAttribute("data-index"));
        isediting = true;
        editingIndex = index;
        updateExpense(index);
        expenseForm.scrollIntoView({
    behavior: "smooth",
    block: "center"
});
    }
});

filterItem.addEventListener('change',()=>{
    const categoryName= filterItem.value;
    
    if(filterItem.value==""){
        displayExpenses(expenses);
    }
    else{
        const filteredExpense= expenses.filter((expense)=>{
        return expense.category===categoryName;
    })
    // filteredExpense is an array of match category;
    displayExpenses(filteredExpense);
    }
})

const inputIncome=document.getElementById("totalincome");
const totalIncome = document.getElementById("sh1");
const totalExpense = document.getElementById("sh2");
const totalBalance = document.getElementById("sh3");
const totalSpent= document.getElementById("s2h1");
const thisMonth= document.getElementById("s2h2");
const totalAvg= document.getElementById("s2h3");

inputIncome.addEventListener('input',()=>{
    totalIncome.textContent=inputIncome.value;
    totalSpent.textContent=inputIncome.value;
    displayBalance();
})

function displayBalance(){
    let totalexpns=parseFloat(totalExpense.textContent);
    totalBalance.textContent= parseFloat(inputIncome.value)-totalexpns;
}
function displaytotalExpense(){
   const total= expenses.reduce((total, expense) => {
    total=total + expense.amount;
    return total;
}, 0);
totalExpense.textContent= total;
}

function dailyAvg(){
    const uniqueDates=new Set();
    expenses.forEach((expense)=>{
        uniqueDates.add(expense.date);
    });
    const totalDate=uniqueDates.size;

    const avg=parseFloat(totalExpense.textContent)/totalDate;
    totalAvg.textContent=avg;
}
function monthly(){
    const uniqueMonths=new Set();
    expenses.forEach((expense)=>{
    const months=expense.date.slice(0,7);//to get only year and month
    uniqueMonths.add(months);
  })
    const totalMonths=uniqueMonths.size;
    const avg=parseFloat(totalExpense.textContent)/totalMonths;
    thisMonth.textContent=avg;
}

