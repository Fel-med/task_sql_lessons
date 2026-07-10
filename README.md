# SQL City — SQL for Machine Learning Foundations

**SQL City** is a pixel-art educational web project that teaches SQL fundamentals through a small game-style city.  
Learners enter buildings, discover objects, complete lessons, pass quizzes, collect keys, and finish the first phase of the **SQL for Machine Learning** learning path.

The project is built with plain **HTML**, **CSS**, and **JavaScript**.  
It has no backend, no framework dependency, and can be hosted as a static website.

---

## Live Demo

Play the project here:

```text
https://Fel-med.github.io/task_sql_lessons/
```

---

## Project Goal

The goal of SQL City is to explain relational database concepts and beginner SQL queries in a visual, interactive, and beginner-friendly way.

The project covers:

- What databases are
- Tables, rows, and columns
- Primary keys and foreign keys
- How relational tables connect
- Why SQL is useful before preparing data for machine learning workflows
- Core SQL commands:
  - `SELECT`
  - `FROM`
  - `WHERE`
  - `DISTINCT`
  - `LIMIT`
  - `ORDER BY`

---

## Assignment Requirement Coverage

This project satisfies the SQL Foundations phase requirements by including:

| Requirement | Covered In |
|---|---|
| What is a database? | Data Vault |
| What are tables, rows, and columns? | Table Department |
| Primary key vs foreign key | Key Bridge Hall |
| Why SQL is important in ML workflows | Data Vault and Query Lab |
| Basic SQL queries | Query Lab |
| Visual educational content | City map, buildings, rooms, markers, tables, diagrams |
| Code examples | Lesson cards and query examples |
| Structured HTML content | Building pages, lesson cards, sidebar summaries |
| References section | Homepage menu and README |

---

## Game Concept

The homepage is a pixel-art city map called **SQL City**.

Each building represents one learning area:

| Building | Main Topic | Reward |
|---|---|---|
| **Data Vault** | Databases, SQL basics, and SQL before ML | Table Department Key |
| **Table Department** | Tables, rows, columns, and dataset structure | Key Bridge Hall Key |
| **Key Bridge Hall** | Primary keys, foreign keys, and relationships | Query Lab Key |
| **Query Lab** | SQL queries and SQL-to-ML pipeline | SQL Foundations Badge |

The learner starts with only **Data Vault** unlocked.  
Completing each building unlocks the next one.

---

## Current Features

- Pixel-art city homepage
- Fullscreen game-style layout
- Layered city assets
- Clickable building hotspots
- Building hover glow
- Locked building states
- Pixel-art lock indicators
- LED-style building labels
- Animated random traffic on the homepage road
- Key reward system
- Magic key option to unlock everything
- Reset Everything option
- Burger menu with references
- Four separate building pages
- Room-by-room navigation
- Left sidebar learning path
- Active lesson glow
- Sidebar summary screen
- Welcome-room object markers
- Marker discovery requirement before entering Room 1
- Hover/focus tooltips for marker explanations
- Quiz room before each recap
- Recap room locked until the quiz is answered correctly
- Final SQL Foundations badge after Query Lab
- Progress saved in browser `localStorage`
- Static deployment support through GitHub Pages

---

## Learning Roadmap

### 1. Data Vault

Introduces databases, SQL, and why organized data matters.

Rooms:

0. Welcoming Room  
1. What is a database?  
2. What is SQL?  
3. Why organize data?  
4. Databases before Machine Learning  
5. Quiz Room  
6. Data Vault Recap  

Welcome markers:

- Organized Data
- Database Storage
- SQL Language
- SQL for ML

Reward: **Table Department Key**

---

### 2. Table Department

Explains how relational data is structured in tables.

Rooms:

0. Welcoming Room  
1. What is a table?  
2. What is a row?  
3. What is a column?  
4. Example: students table  
5. Rows and columns in ML datasets  
6. Quiz Room  
7. Table Department Recap  

Welcome markers:

- Table Grid
- Row
- Column
- Dataset Example

Reward: **Key Bridge Hall Key**

---

### 3. Key Bridge Hall

Explains how tables connect using primary keys and foreign keys.

Rooms:

0. Welcoming Room  
1. What is a primary key?  
2. Why IDs must be unique  
3. What is a foreign key?  
4. How tables connect  
5. Example: students and enrollments  
6. Quiz Room  
7. Key Bridge Recap  

Welcome markers:

- Primary Key Board
- Primary Key
- Bridge Connection
- Foreign Key Board

Reward: **Query Lab Key**

---

### 4. Query Lab

Teaches practical SQL commands used to retrieve, filter, sort, and prepare data.

Rooms:

0. Welcoming Room  
1. SELECT and FROM  
2. WHERE  
3. DISTINCT  
4. LIMIT  
5. ORDER BY  
6. Query examples  
7. SQL to ML pipeline  
8. Quiz Room  
9. Final recap  

Welcome markers:

- WHERE Filter
- Query Console
- ORDER BY
- LIMIT
- SQL to ML

Reward: **SQL Foundations Badge**

---

## SQL Examples Included

The lessons include beginner-friendly SQL examples such as:

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

The sample data uses internationally familiar example names and cities, such as:

- Alex
- Emma
- John
- Maria
- London
- Paris
- Berlin

---

## How the Progress System Works

SQL City saves progress in the browser using `localStorage`.

Storage key:

```js
sqlCityProgress
```

Saved progress includes:

- Which buildings are unlocked
- Which buildings are completed
- Whether a building is newly unlocked
- Whether a building has been entered
- Highest unlocked room per building
- Quiz completion per building
- Discovered welcome-room markers per building
- Whether Unlock Everything was used
- Final SQL Foundations badge state

To manually reset progress, open browser DevTools and run:

```js
localStorage.removeItem("sqlCityProgress");
location.reload();
```

The homepage also includes a **Reset Everything** option.

---

## Project Structure

```text
task_html/
|-- index.html
|-- README.md
|-- city_1/
|   |-- index_city_1.html
|   |-- data-vault.html
|   |-- table-department.html
|   |-- key-bridge-hall.html
|   `-- query-lab.html
|-- city_2/
|   |-- index_city_2.html
|   |-- filter-factory.html
|   |-- summary-tower.html
|   |-- join-junction.html
|   |-- subquery-mines.html
|   `-- cleaning-clinic.html
|-- shared_files/
|   |-- shared menu, progress, reset, and magic key files
|   |-- shared room layout/component styles
|   `-- shared city board, hover, and lively animation files
`-- res/
    |-- w3schools.webp
    |-- geeksforgeeks.webp
    |-- magic-master-key.webp
    |-- kingdom/
    |-- city_1/
    |   |-- city_elements/
    |   |-- item/
    |   |-- rooms_background/
    |   `-- png_images_(not_used)/
    `-- city_2/
        |-- city_elements/
        |-- item/
        |-- rooms_background/
        `-- png_images_(not_used)/
```

---
## How to Run Locally

Because this is a static website, no backend is required.

### Option 1: Open Directly

Open this file in a browser:

```text
index.html
```

### Option 2: Run a Local Server

From the project folder, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## GitHub Pages Deployment

This project can be hosted with GitHub Pages.

Recommended settings:

```text
Source: Deploy from a branch
Branch: main
Folder: / root
```

Example live URL:

```text
https://Fel-med.github.io/task_sql_lessons/
```

---

## Technologies Used

- HTML
- CSS
- JavaScript
- Browser `localStorage`
- Pixel-art PNG assets
- GitHub Pages for deployment

---

## Design Style

The project uses a retro educational game style:

- 16-bit pixel-art visuals
- Dark UI panels
- Cyan glow effects
- Cream pixel borders
- Building unlock progression
- Game-like rewards
- Room exploration through object markers

---

## References

1. **W3Schools SQL Tutorial**  
   https://www.w3schools.com/sql/default.asp

2. **GeeksforGeeks SQL Tutorial**  
   https://www.geeksforgeeks.org/sql/sql-tutorial/

---

## Author

Created by **Fel-med** as a creative educational HTML project for learning SQL fundamentals.
