# **📜 Personal Finance Tracker and Visualizer**  

🔥 **A simple and efficient web application for tracking personal finances with transaction management, category-wise spending, and budgeting.**  

---

## **🚀 Features**
✅ **Add, Edit, and Delete Transactions** (Amount, Date, Description, Category)  
✅ **Monthly Expenses Bar Chart** (Visualize total expenses per month)  
✅ **Category-wise Spending Pie Chart** (Track spending by category)  
✅ **Budget vs Actual Spending Chart** (Compare actual spending with set budgets)  
✅ **Spending Insights** (See if you're over or under budget for each category)  
✅ **Dashboard Summary** (Total Expenses, Most Spent Category, Recent Transaction)  

---

## **📂 Project Structure**
```
📦 finance-tracker
│-- 📂 static               # Contains frontend assets (CSS, JS)
│   │-- style.css           # Styles for the application
│   │-- script.js           # Main JavaScript logic
│-- 📂 templates            # HTML templates
│   │-- index.html          # Main frontend page
│-- 📂 database             # Database models
│   │-- models.py           # SQLite database schema
│-- app.py                  # Flask backend server
│-- requirements.txt        # Required Python libraries
│-- README.md               # Project documentation (this file)
```

---

## **🛠️ Tech Stack**
- **Frontend:** HTML, CSS, JavaScript, Chart.js  
- **Backend:** Flask (Python), Flask-SQLAlchemy  
- **Database:** SQLite  
- **Deployment:** GitHub, Render  

---

## **🚀 Installation & Setup**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/Aryan-Rajesh-Python/personal-finance-tracker.git
cd personal-finance-tracker
```

### **2️⃣ Create a Virtual Environment & Install Dependencies**
```bash
python -m venv venv
source venv/bin/activate  # (Mac/Linux)
venv\Scripts\activate     # (Windows)

pip install -r requirements.txt
```

### **3️⃣ Run the Flask Application**
```bash
python app.py
```
🚀 **The app will run on** `http://127.0.0.1:5000/`  

---

## **📊 Usage Guide**
1️⃣ **Add a Transaction**  
- Enter **amount, date, description, and category** → Click **Add Transaction**  

2️⃣ **Edit a Transaction**  
- Click **Edit** next to any transaction → Modify details → Click **Update Transaction**  

3️⃣ **Delete a Transaction**  
- Click **Delete** next to any transaction  

4️⃣ **Set a Budget**  
- Select a **category**, enter **budget amount**, click **Set Budget**  

5️⃣ **Analyze Spending**  
- Check **Monthly Expenses Bar Chart** & **Category-wise Pie Chart**  
- View **Spending Insights** for budget analysis  

---

## **📦 API Endpoints**
| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| **GET**  | `/api/transactions`      | Fetch all transactions |
| **POST** | `/api/transactions`      | Add a new transaction |
| **PUT**  | `/api/transactions/<id>` | Update a transaction |
| **DELETE** | `/api/transactions/<id>` | Delete a transaction |
| **POST** | `/api/budget`            | Set a budget for a category |
| **GET**  | `/api/budget`            | Get all budgets |
| **GET**  | `/api/spending-insights` | Get insights on spending |

---

## **🛠️ Future Enhancements**
✅ **Better UI/UX Design**  
✅ **Download Reports as PDF/CSV**  
✅ **Dark Mode Support**  
✅ **Multi-user Authentication (optional)**  

---

## **📩 Contact & Support**
📧 **Email:** aryanreddy463@gmail.com   

---

🎉 **Thank you for using Personal Finance Tracker and Visualizer! Happy Budgeting!** 🚀🔥
