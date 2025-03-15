from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from database.models import db, Transaction, Budget

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

# ✅ Configure SQLite Database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///finance.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# ✅ Create tables on startup
with app.app_context():
    db.create_all()

# ✅ Route for Serving Frontend
@app.route("/")
def home():
    return render_template("index.html")  # Loads frontend

# ✅ API to Add Transaction
@app.route("/api/transactions", methods=["POST"])
def add_transaction():
    data = request.json
    new_transaction = Transaction(
        amount=data["amount"],
        date=data["date"],
        description=data["description"],
        category=data["category"]
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify(new_transaction.to_dict()), 201

# ✅ API to Get Transactions
@app.route("/api/transactions", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()
    return jsonify([t.to_dict() for t in transactions])

# ✅ API to Delete a Transaction
@app.route("/api/transactions/<int:id>", methods=["DELETE"])
def delete_transaction(id):
    transaction = Transaction.query.get(id)
    if transaction:
        db.session.delete(transaction)
        db.session.commit()
        return jsonify({"message": "Transaction deleted"}), 200
    return jsonify({"error": "Transaction not found"}), 404

# ✅ API to Set Budget for a Category
@app.route("/api/budget", methods=["POST"])
def set_budget():
    data = request.json
    category = data["category"]
    amount = data["amount"]

    budget = Budget.query.filter_by(category=category).first()
    if budget:
        budget.amount = amount  # Update existing budget
    else:
        budget = Budget(category=category, amount=amount)
        db.session.add(budget)

    db.session.commit()
    return jsonify({"message": "Budget set successfully"}), 200

# ✅ API to Get All Budgets
@app.route("/api/budget", methods=["GET"])
def get_budgets():
    budgets = Budget.query.all()
    return jsonify([b.to_dict() for b in budgets])

# ✅ API to Get Spending Insights
@app.route("/api/spending-insights", methods=["GET"])
def spending_insights():
    transactions = Transaction.query.all()
    budgets = {b.category: b.amount for b in Budget.query.all()}

    category_spending = {}
    insights = {}

    for t in transactions:
        category_spending[t.category] = category_spending.get(t.category, 0) + t.amount

    for category, spent in category_spending.items():
        budget = budgets.get(category, 0)
        if spent > budget:
            insights[category] = f"⚠️ Over budget by ${spent - budget:.2f}"
        else:
            insights[category] = f"✅ Under budget by ${budget - spent:.2f}"

    return jsonify(insights)

if __name__ == "__main__":
    app.run(debug=True)