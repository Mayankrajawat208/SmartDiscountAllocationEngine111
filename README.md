# Smart Discount Allocation CLI — Simple & Fair Distribution Model

---

## 🧠 Project Summary: Smart Discount Allocation Engine (CLI)

This project implements a basic yet fair and explainable discount allocation system. It distributes a given budget (called the **discount kitty**) among sales agents using a performance-based approach that ensures fairness and transparency.

---

## 🔧 Approach

The allocation engine uses a **Normalized Scoring** strategy:

### 1. Normalization

- Each agent's score is calculated based on 4 metrics:
  - `performanceScore` (reliability)
  - `targetAchievedPercent` (sales impact)
  - `activeClients` (current workload)
  - `seniorityMonths` (loyalty)
- All metrics are normalized to bring them on the same scale (0 to 1).

### 2. Weighted Scoring

- Each metric contributes differently to the final score:
  - `performanceScore`: 40%
  - `targetAchievedPercent`: 30%
  - `activeClients`: 10%
  - `seniorityMonths`: 20%

### 3. Proportional Allocation

- The total discount kitty is divided among agents **proportionally** based on their final score.
- Handles rounding errors to ensure the full budget is used.

### 4. Justifications

- Each agent receives a short **explanation** for why they received their allocation  
  (e.g., "high performance", "long-term contribution").

---

## ✅ Benefits of This Approach

- Ensures **data-driven and explainable** allocation
- Works even when agents have **identical or zero scores**
- Simple and easy to understand
- Can be extended with config-based logic in future

---

## 🎯 Objective

Distribute a fixed discount kitty among sales agents such that:

- Discounts are **fairly distributed**
- High-performing agents get rewarded more
- Transparent logic and justification are provided
- All budget is utilized without waste

---

## ⚙️ Features

- ✅ Performance-based proportional allocation
- ✅ Normalization of agent attributes
- ✅ Justifications for each allocation
- ✅ Handles rounding edge cases
- ✅ Tested with various scenarios

---

## 📂 Folder Structure

```
smart_discount_engine_js/
├── main.js              # Entry point to run allocation
├── allocator.js         # Core allocation logic
├── tests.js             # Unit tests
├── sample_input.json    # Example input
├── README.md            # Project documentation
```

---

## ▶️ How to Run

1. Make sure you have **Node.js** installed
2. Open terminal inside the project folder

Run the main program:

```bash
node main.js
```

Run unit tests:

```bash
node tests.js
```

---

## 🧪 Test Cases

Test cases are included inside `tests.js` and cover:

### ✅ Test Case 1: Normal scenario

- Agents with different performance and attributes
- Proper proportional allocation done

### ⚠️ Test Case 2: All agents same

- Equal scores
- Equal allocation to all

### 🚫 Test Case 3: Rounding case

- Total = 100
- Rounding correction logic ensures exact match

---

## 📤 Output Structure

Example output from `main.js`:

```json
{
  "allocations": [
    {
      "id": "A1",
      "assignedDiscount": 6000,
      "justification": "high performance and long-term contribution and strong target achievement and high active client load"
    },
    {
      "id": "A2",
      "assignedDiscount": 4000,
      "justification": "consistent performance"
    }
  ]
}
```

---

## 🧠 Customization

This version uses hardcoded weights:

```js
performanceScore: 0.4
targetAchievedPercent: 0.3
activeClients: 0.1
seniorityMonths: 0.2
```

You can edit the weights directly inside `allocator.js` to customize behavior.

---

## 🔁 Notes

- This is a simple and modular version.
- Can be extended with CLI arguments, min/max config, or external weight files.
- Ideal for demo, proof of concept, or light production use.
