# SQL City — SQL for Machine Learning Foundations

SQL City is a pixel-art educational web project that teaches the first phase of the **SQL for Machine Learning** track through a small game-like city.  
Instead of a normal tutorial page, the learner enters buildings, explores rooms, unlocks lessons, collects keys, and learns SQL step by step.

---

## Project Goal

The goal of this project is to explain the foundational concepts of relational databases and basic SQL queries in a simple, visual, and interactive way.

This project covers:

- What a database is
- Tables, rows, and columns
- Primary keys and foreign keys
- Why SQL is important in Machine Learning workflows
- Basic SQL data retrieval:
  - `SELECT`
  - `FROM`
  - `WHERE`
  - `DISTINCT`
  - `LIMIT`
  - `ORDER BY`

---

## Concept

The website is designed as a small pixel-art city called **SQL City**.

Each building represents one learning class:

| Building | Topic |
|---|---|
| Data Vault | Databases, SQL basics, and SQL before Machine Learning |
| Table Department | Tables, rows, columns, and dataset structure |
| Key Bridge Hall | Primary keys, foreign keys, and table relationships |
| Query Lab | SQL queries and SQL-to-ML pipeline |

The learner starts with only the first building unlocked.  
After completing a building, they receive a key that unlocks the next building.

---

## Learning Roadmap

### 1. Data Vault

This building introduces the basic idea of databases and SQL.

Lessons:

1. What is a database?
2. What is SQL?
3. Why organize data?
4. Databases before Machine Learning
5. Data Vault Recap

Reward: **Table Department Key**

---

### 2. Table Department

This building explains how data is structured in relational databases.

Lessons:

1. What is a table?
2. What is a row?
3. What is a column?
4. Example: students table
5. Rows and columns in ML datasets
6. Table Department Recap

Reward: **Key Bridge Hall Key**

---

### 3. Key Bridge Hall

This building explains how tables connect using keys.

Lessons:

1. What is a primary key?
2. Why IDs must be unique?
3. What is a foreign key?
4. How tables connect
5. Example: students and enrollments
6. Key Bridge Recap

Reward: **Query Lab Key**

---

### 4. Query Lab

This building teaches practical SQL queries used to retrieve and prepare data.

Lessons:

1. SELECT and FROM
2. WHERE
3. DISTINCT
4. LIMIT
5. ORDER BY
6. Query examples
7. SQL to ML pipeline
8. Final recap

Reward: **SQL Foundations Badge**

---

## SQL Examples Included

The project includes simple SQL examples such as:

```sql
SELECT * FROM students;
```

```sql
SELECT name FROM students WHERE age > 18;
```

```sql
SELECT DISTINCT city FROM customers;
```

```sql
SELECT * FROM orders ORDER BY price DESC;
```

Additional examples show how SQL can be used to prepare clean datasets before Machine Learning.

---

## Main Features

- Pixel-art city homepage
- Fullscreen game-style layout
- Clickable buildings
- Building lock/unlock system
- Key reward system
- Unlock-all option using a magic key
- Animated cars on the city road
- LED-style building labels
- Interactive room markers
- Room-by-room learning path
- Left sidebar room summary
- Main lesson card for explanations
- Local progress saved using `localStorage`
- References menu with learning sources

---

## Project Structure

```text
task_sql_lessons/
│
├── index.html
├── data-vault.html
├── table-department.html
├── key-bridge-hall.html
├── query-lab.html
│
└── res/
    ├── city_elements/
    │   ├── bg.png
    │   ├── red2.png
    │   ├── red1.png
    │   ├── yellow.png
    │   ├── green.png
    │   ├── car1.png
    │   ├── car2.png
    │   └── lock.png
    │
    ├── rooms_background/
    │   ├── Room_1_Data_Vault.png
    │   ├── Room_2_Table_Department.png
    │   ├── Room_3_Key_Bridge_Hall.png
    │   ├── Room_4_Query_Lab.png
    │   ├── 03_Data_Vault_background.png
    │   ├── 02_Table_Department_background.png
    │   ├── 01_Key_Bridge_Hall_background.png
    │   └── 04_Query_Lab_background.png
    │
    ├── keys/
    │   ├── regular-key.png
    │   └── magic-master-key.png
    │
    ├── w3schools.png
    └── geeksforgeeks.png
```

---

## How to Run Locally

Because this is a static website, no backend is required.

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Use a local server

Using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## How Progress Works

The project uses browser `localStorage` to save learning progress.

Saved data includes:

- Which buildings are unlocked
- Which buildings are completed
- Which building was newly unlocked
- Highest unlocked room inside each building
- Final SQL Foundations badge state

To reset progress manually, open browser DevTools and run:

```js
localStorage.removeItem("sqlCityProgress");
location.reload();
```

---

## GitHub Pages Deployment

This project can be hosted using GitHub Pages.

Recommended settings:

```text
Source: Deploy from a branch
Branch: main
Folder: / root
```

The live link will look like:

```text
https://Fel-med.github.io/task_sql_lessons/
```

---

## Technologies Used

- HTML
- CSS
- JavaScript
- LocalStorage
- Pixel-art image assets

No framework and no backend are required.

---

## Educational Purpose

This project was created for the first phase of the **SQL for Machine Learning** track.

It helps learners understand that before using data in Machine Learning, they need to know:

- where data is stored
- how data is structured
- how tables connect
- how SQL retrieves and prepares useful data

The final goal is to understand how SQL supports the creation of clean datasets for ML pipelines.

---

## References

1. **W3Schools SQL Tutorial**  
   https://www.w3schools.com/sql/default.asp

2. **GeeksforGeeks SQL Tutorial**  
   https://www.geeksforgeeks.org/sql/sql-tutorial/

---

## Author

Created by **Fel-med** as a creative educational HTML project for learning SQL fundamentals.
