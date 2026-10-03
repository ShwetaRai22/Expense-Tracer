lucide.createIcons();
const expenses = [];
const expenseForm=document.getElementById("expenseForm");
const addButton = document.getElementById("addbutton");
const tbody=document.querySelector("#expenseTable tbody");
expenseForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const description=document.getElementById("description").value;
    const amount=document.getElementById("amount").value;
    const category=document.getElementById("category").value;
    const date=document.getElementById("date").value;

    addExpense(description, parseFloat(amount), category, date);
    displayExpenses();
})

function addExpense(description, amount, category, date){
    const newExpense = {
        description: description,
        amount: amount,
        category: category,
        date: date
    };
    expenses.push(newExpense);
}
function displayExpenses(){
 tbody.innerHTML="";
    expenses.forEach((expense)=>
    {
        const row=document.createElement("tr");
        row.innerHTML=`
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
}
