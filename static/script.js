// ✅ Fetch Transactions from API and Update UI
async function loadTransactions() {
    const response = await fetch("/api/transactions");
    const transactions = await response.json();

    // ✅ Populate Transaction Table
    document.getElementById("transactions").innerHTML = transactions
        .map(t => `
            <tr>
                <td>$${t.amount}</td>
                <td>${t.date}</td>
                <td>${t.description}</td>
                <td>${t.category}</td>
                <td><button onclick="deleteTransaction(${t.id})">Delete</button></td>
            </tr>
        `).join("");

    updateChart(transactions);
    updateDashboard(transactions);
    loadBudgetChart();
    loadSpendingInsights();
    loadMonthlyExpensesChart();
}

// ✅ Add Transaction with Validation
async function addTransaction() {
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    // Validation
    if (!amount || !date || !description || !category) {
        alert("Please fill in all fields!");
        return;
    }

    const data = { amount, date, description, category };

    await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    // Clear input fields after submission
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";

    loadTransactions();
}

// ✅ Delete Transaction
async function deleteTransaction(id) {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    loadTransactions();
}

// ✅ Set Budget for a Category
async function setBudget() {
    const category = document.getElementById("budget-category").value;
    const amount = document.getElementById("budget-amount").value;

    if (!amount) {
        alert("Please enter a budget amount!");
        return;
    }

    await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, amount })
    });

    alert("Budget set successfully!");
    loadBudgetChart();
}

// ✅ Load Budget vs Actual Spending Chart
async function loadBudgetChart() {
    const transactions = await (await fetch("/api/transactions")).json();
    const budgets = await (await fetch("/api/budget")).json();

    const actualSpending = {};
    const budgetLimits = {};

    transactions.forEach(t => {
        actualSpending[t.category] = (actualSpending[t.category] || 0) + t.amount;
    });

    budgets.forEach(b => {
        budgetLimits[b.category] = b.amount;
    });

    const categories = Array.from(new Set([...Object.keys(actualSpending), ...Object.keys(budgetLimits)]));
    const actualData = categories.map(cat => actualSpending[cat] || 0);
    const budgetData = categories.map(cat => budgetLimits[cat] || 0);

    const ctx = document.getElementById('budgetChart').getContext('2d');

    if (window.budgetChartInstance) {
        window.budgetChartInstance.destroy();
    }

    window.budgetChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                { label: "Actual Spending", data: actualData, backgroundColor: "red" },
                { label: "Budget Limit", data: budgetData, backgroundColor: "green" }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ✅ Load Monthly Expenses Bar Chart
async function loadMonthlyExpensesChart() {
    const transactions = await (await fetch("/api/transactions")).json();

    const monthlyTotals = {};

    transactions.forEach(t => {
        const month = t.date.substring(0, 7);
        monthlyTotals[month] = (monthlyTotals[month] || 0) + t.amount;
    });

    const months = Object.keys(monthlyTotals).sort();
    const monthlyData = months.map(month => monthlyTotals[month]);

    const ctx = document.getElementById('monthlyExpensesChart').getContext('2d');

    if (window.monthlyChartInstance) {
        window.monthlyChartInstance.destroy();
    }

    window.monthlyChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: "Monthly Expenses",
                    data: monthlyData,
                    backgroundColor: "#007BFF"
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ✅ Load Spending Insights
async function loadSpendingInsights() {
    const response = await fetch("/api/spending-insights");
    const insights = await response.json();

    let insightsText = "";
    for (const [category, message] of Object.entries(insights)) {
        insightsText += `<p>${category}: ${message}</p>`;
    }

    document.getElementById("spendingInsights").innerHTML = insightsText;
}

// ✅ Update Pie Chart for Category-wise Spending
let expenseChart;

function updateChart(transactions) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const categoryTotals = transactions.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9F40", "#9966FF"]
            }]
        }
    });
}

// ✅ Update Dashboard Summary (Total Expenses, Top Category, Recent Transaction)
function updateDashboard(transactions) {
    let totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
    let categoryTotals = transactions.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

    let topCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b, "None");
    let recentTransaction = transactions.length > 0 ? transactions[transactions.length - 1].description : "None";

    document.getElementById("totalExpenses").innerText = `$${totalExpenses.toFixed(2)}`;
    document.getElementById("topCategory").innerText = topCategory;
    document.getElementById("recentTransaction").innerText = recentTransaction;
}

// ✅ Load All Data on Page Load
window.onload = function () {
    loadTransactions();
    loadBudgetChart();
    loadSpendingInsights();
    loadMonthlyExpensesChart();
};