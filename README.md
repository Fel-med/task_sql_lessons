# SQL Kingdom — Interactive SQL Learning Game

**SQL Kingdom** is a pixel-art educational web project that teaches SQL through a multi-city game world.
Learners explore islands, enter themed cities, complete building lessons, pass quizzes, collect keys and badges, and unlock the next learning area step by step.

The project is built with plain **HTML**, **CSS**, and **JavaScript**.
It has no backend, no framework dependency, no build step, and can be hosted as a static website with GitHub Pages.

---

## Live Demo

Play the project here:

```text
https://Fel-med.github.io/task_sql_lessons/
```

---

## Project Goal

The goal of SQL Kingdom is to make SQL learning more visual, interactive, and beginner-friendly.
Instead of reading lessons as plain text, learners move through a game-style world where each city represents a learning phase and each building represents a SQL topic.

The current learning path contains two completed playable cities:

1. **Foundation City** — SQL foundations and basic queries.
2. **Data Prep City** — filtering, aggregation, joins, subqueries, and cleaning data before analysis or machine learning.

Future islands are displayed as unavailable areas and remain hidden until future phases are created.

---

## Technologies Used

- HTML
- CSS
- JavaScript
- Browser `localStorage`
- Pixel-art image assets
- GitHub Pages

No framework is used:

- no React
- no Vue
- no Angular
- no Node.js backend
- no database server

---

## Main Game Concept

The root page is the **SQL Kingdom** world map.

From the Kingdom page, the learner can choose unlocked islands:

| Island | Status | Topic |
|---|---|---|
| **Foundation City** | Playable | SQL foundations |
| **Data Prep City** | Playable after Foundation City completion | Data preparation with SQL |
| **Future Islands** | Coming soon | Hidden future content |

Only unlocked playable islands can be entered.
Locked playable islands appear as mystery islands, and future islands appear as coming-soon islands.

---

## Current Features

- SQL Kingdom world selection page
- Floating island carousel
- Locked, unlocked, and coming-soon island states
- Foundation City and Data Prep City progression
- Fullscreen pixel-art city homepages
- Clickable building hotspots
- Building hover glow effects
- Shared building board style
- Shared building hover/effect system
- Shared lively animation system
- Animated cars, tracks, and drones
- Shared burger menu on homepage/map pages only
- References section with W3Schools and GeeksforGeeks links
- Magic Master Key system
- Global reset on Kingdom page
- Local city reset on city pages
- City access guards for locked islands/buildings
- Room-by-room lesson pages
- Shared room layout and components
- Left sidebar learning path
- Welcome-room pointer markers
- Tooltip/object discovery system
- Quiz tabs showing one question at a time
- Randomized quiz answer options
- Recap rooms locked until quiz completion
- Keys and badges as rewards
- Progress saved in browser `localStorage`
- Static deployment support through GitHub Pages

---

## Learning Roadmap

## City 1 — Foundation City

**Foundation City** teaches SQL and relational database foundations.

The learner starts here first. Completing the final building awards the **SQL Foundations Badge** and unlocks **Data Prep City**.

### Foundation City Buildings

| Building | Main Topic | Reward |
|---|---|---|
| **Data Vault** | Databases, SQL basics, and SQL before ML | Table Department Key |
| **Table Department** | Tables, rows, columns, and dataset structure | Key Bridge Hall Key |
| **Key Bridge Hall** | Primary keys, foreign keys, and table relationships | Query Lab Key |
| **Query Lab** | SELECT, FROM, WHERE, DISTINCT, LIMIT, ORDER BY | SQL Foundations Badge |

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

Reward: **Table Department Key**

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

Reward: **Key Bridge Hall Key**

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

Reward: **Query Lab Key**

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

Reward: **SQL Foundations Badge**

---

## City 2 — Data Prep City

**Data Prep City** teaches SQL skills used to prepare data for analysis and machine learning.

It unlocks after completing Foundation City or by using the Magic Master Key.

### Data Prep City Buildings

| Building | Main Topic | Reward |
|---|---|---|
| **Filter Factory** | AND, OR, NOT, IN, BETWEEN, LIKE | Summary Tower Key |
| **Summary Tower** | COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING | Join Junction Key |
| **Join Junction** | INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN | Subquery Mines Key |
| **Subquery Mines** | Subqueries in WHERE, IN, SELECT, correlated subqueries | Cleaning Clinic Key |
| **Cleaning Clinic** | NULL, COALESCE, CASE WHEN, CAST, validation | Data Prep City Badge |

### 1. Filter Factory

Teaches advanced filtering conditions.

Rooms:

0. Welcoming Room
1. AND and OR
2. NOT and IN
3. BETWEEN and LIKE
4. Filtering for Data Preparation
5. Quiz Room
6. Recap Room

Reward: **Summary Tower Key**

### 2. Summary Tower

Teaches aggregation and summarization.

Rooms:

0. Welcoming Room
1. COUNT and SUM
2. AVG, MIN, and MAX
3. GROUP BY
4. HAVING
5. Aggregation for Data Preparation
6. Quiz Room
7. Recap Room

Reward: **Join Junction Key**

### 3. Join Junction

Teaches how to combine related tables.

Rooms:

0. Welcoming Room
1. Why JOINs Matter
2. INNER JOIN
3. LEFT JOIN and RIGHT JOIN
4. FULL OUTER JOIN
5. JOINs for Data Preparation
6. Quiz Room
7. Recap Room

Reward: **Subquery Mines Key**

### 4. Subquery Mines

Teaches nested SQL queries.

Rooms:

0. Welcoming Room
1. What is a Subquery?
2. Subqueries in WHERE
3. Subqueries with IN
4. Subqueries in SELECT
5. Correlated Subqueries
6. Subqueries for Data Preparation
7. Quiz Room
8. Recap Room

Reward: **Cleaning Clinic Key**

### 5. Cleaning Clinic

Teaches SQL data cleaning techniques.

Rooms:

0. Welcoming Room
1. Understanding NULL Values
2. COALESCE
3. CASE WHEN
4. Data Type Conversions
5. Basic Data Validation
6. Cleaning for Data Preparation
7. Quiz Room
8. Recap Room

Reward: **Data Prep City Badge**

---

## SQL Topics Covered

### Foundation Topics

- Databases
- SQL basics
- Tables
- Rows
- Columns
- Primary keys
- Foreign keys
- Table relationships
- SELECT
- FROM
- WHERE
- DISTINCT
- LIMIT
- ORDER BY

### Data Preparation Topics

- AND
- OR
- NOT
- IN
- BETWEEN
- LIKE
- COUNT()
- SUM()
- AVG()
- MIN()
- MAX()
- GROUP BY
- HAVING
- INNER JOIN
- LEFT JOIN
- RIGHT JOIN
- FULL OUTER JOIN
- Subqueries
- Correlated subqueries
- NULL values
- COALESCE
- CASE WHEN
- CAST and data type conversions
- Basic data validation

---

## Example SQL Queries

```sql
SELECT *
FROM students;
```

```sql
SELECT name
FROM students
WHERE age > 18;
```

```sql
SELECT DISTINCT city
FROM customers;
```

```sql
SELECT *
FROM orders
ORDER BY price DESC;
```

```sql
SELECT city, COUNT(*) AS total_customers
FROM customers
GROUP BY city;
```

```sql
SELECT customers.name, orders.price
FROM customers
INNER JOIN orders
ON customers.customer_id = orders.customer_id;
```

```sql
SELECT name, price
FROM products
WHERE price > (
  SELECT AVG(price)
  FROM products
);
```

```sql
SELECT name,
       COALESCE(email, 'No email') AS email_status
FROM customers;
```

The sample data uses neutral international examples such as:

- Emma
- Noah
- Sofia
- Liam
- Olivia
- Daniel
- London
- Toronto
- Madrid
- Berlin
- Paris
- Tokyo

---

## Progress System

The project saves progress in the browser using `localStorage`.

Storage key:

```js
sqlCityProgress
```

Saved progress includes:

- unlocked islands
- completed islands
- unlocked buildings
- completed buildings
- earned keys
- earned badges
- highest unlocked room
- quiz completion
- discovered welcome-room markers
- one-time unlock messages
- Magic Master Key unlock state

### Global Reset

The Kingdom page has **Reset Everything**.

This resets the full game:

- Foundation City remains available as the starting city
- Data Prep City becomes locked again
- all building progress is cleared
- keys, badges, quizzes, and markers are reset

### Local City Reset

City homepages use **Reset This City**.

This resets only the current city progress without destroying the entire Kingdom progress.

For example, resetting Data Prep City does not lock the Data Prep island again if it was already unlocked.

### Magic Master Key

The Magic Master Key unlocks all currently playable content.

It does not unlock future coming-soon islands or fake future content.

---

## Project Structure

```text
task_html/
|-- index.html
|-- README.md
|
|-- city_1/
|   |-- index_city_1.html
|   |-- data-vault.html
|   |-- table-department.html
|   |-- key-bridge-hall.html
|   `-- query-lab.html
|
|-- city_2/
|   |-- index_city_2.html
|   |-- filter-factory.html
|   |-- summary-tower.html
|   |-- join-junction.html
|   |-- subquery-mines.html
|   `-- cleaning-clinic.html
|
|-- shared_files/
|   |-- shared-menu.css
|   |-- shared-menu.js
|   |-- shared-progress.js
|   |-- shared-reset-system.js
|   |-- shared-magic-key.js
|   |-- shared-toast.js
|   |-- shared-room-layout.css
|   |-- shared-room-components.css
|   |-- shared-building-boards.css
|   |-- shared-building-effects.css
|   `-- shared-lively-elements.css
|
`-- res/
    |-- w3schools.webp
    |-- geeksforgeeks.webp
    |-- magic-master-key.webp
    |-- kingdom/
    |   |-- kingdom_bg.png
    |   |-- city_1.png
    |   |-- city_2.png
    |   `-- shadow_island.png
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

## Design Style

The project uses a retro educational game style:

- 16-bit pixel-art visuals
- dark UI panels
- cyan glow effects
- cream pixel borders
- floating island world map
- building unlock progression
- animated city elements
- game-like keys and badges
- room exploration through object markers

---

## References

1. **W3Schools SQL Tutorial**
   https://www.w3schools.com/sql/default.asp

2. **GeeksforGeeks SQL Tutorial**
   https://www.geeksforgeeks.org/sql/sql-tutorial/

---

## Author

Created by **Fel-med** as a creative educational HTML project for learning SQL through an interactive pixel-art game world.
