from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# ✅ Predefined Categories
CATEGORIES = ["Food", "Rent", "Shopping", "Bills", "Entertainment", "Other"]

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "date": self.date,
            "description": self.description,
            "category": self.category
        }

# ✅ Budget Model
class Budget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), unique=True, nullable=False)
    amount = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {"category": self.category, "amount": self.amount}
