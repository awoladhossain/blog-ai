# Database Learning

## Indexes

An index is a data structure (usually a B‑tree) that lets the database find rows faster than scanning the whole table. When you create an index on a column (or set of columns), the DB maintains a sorted copy of those values plus pointers to the corresponding rows.

## Views

A view is a virtual table basically a saved SELECT statement you can query like a table.You can query it just like a regular table, but the data stays in the underlying tables.

## Transactions

A transaction groups one or more SQL statements into a single unit of work. Either all of them succeed (COMMIT) or none of them do (ROLLBACK), which keeps the data consistent even if something goes wrong. Most databases support the ACID properties (Atomicity, Consistency, Isolation, Durability) for transactions

## ACID: Atomicity, Consistency, Isolation, Durability

ACID is the set of properties that guarantee reliable processing of database transactions:

- Atomicity ("All or Nothing") – a transaction is an all‑or‑nothing unit. If any part fails, the whole thing is rolled back.

- Consistency ("Valid State") – The database must always move from one valid state to another.
  Example: If a rule says "balance cannot be negative," the transaction must respect that. After execution, the database should still follow all rules and constraints

- Isolation ("No Interference") – Transactions should not affect each other while running.
  Example: If two people buy the last ticket at the same time, isolation ensures only one succeeds, preventing double booking.

- Durability ("It Stays Saved") – Once a transaction is committed, the changes are permanent—even if the system crashes.
  Example: After transferring money, the new balances remain stored safely in the database

```
-- Start the transaction
BEGIN TRANSACTION;

-- Step 1: Deduct $100 from Account A
UPDATE Accounts
SET balance = balance - 100
WHERE account_id = 'A';

-- Step 2: Add $100 to Account B
UPDATE Accounts
SET balance = balance + 100
WHERE account_id = 'B';

-- Commit or rollback
COMMIT;
ROLLBACK;
```

- Atomicity: Both updates (deduct from A, add to B) must succeed together. If one fails, ROLLBACK ensures neither change is saved.

- Consistency: The total money in the system remains the same. Rules like "balance cannot be negative" are enforced.

- Isolation: If two transfers happen at the same time, each runs independently. SQL ensures they don’t interfere (e.g., no double spending).

- Durability: Once COMMIT is executed, the changes are permanently stored—even if the server crashes right after.

## 📌 Why It Matters

- Without ACID, databases could:
- Lose money in transactions,
- End up with corrupted or incomplete data,
- Allow conflicting operations,
- Forget committed changes after a crash.

That’s why most SQL databases (MySQL, PostgreSQL, SQL Server, Oracle) are ACID-compliant by design

## Normalization

Normalization in SQL is the process of organizing tables to reduce redundancy and improve data integrity. The main types are 1NF, 2NF, 3NF (and beyond). Each step makes the database cleaner and more efficient.

- Normalization = breaking large, messy tables into smaller, logical ones.
- Goal: avoid duplicate data, prevent anomalies (update, insert, delete problems), and ensure consistency.
- Common forms: 1NF → 2NF → 3NF → BCNF (Boyce-Codd Normal Form).

## 1️⃣ First Normal Form (1NF) – No Repeating Groups

- Rule: Each column must hold atomic (indivisible) values.

## ❌ What NOT to Do in 1NF

- Don’t store multiple values in one column. Example: putting several phone numbers in a single field separated by commas.
- Don’t use repeating groups of columns. Example: phone1, phone2, phone3 columns in the same table.
- Don’t keep non-atomic (non-divisible) data. Example: storing full address in one column like "House 12, Road 5, Dhaka" instead of splitting into street, city, etc.

```
-- Bad design: multiple values in one column
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(50),
    phone_numbers VARCHAR(100) -- "12345, 67890"
);
```

## ✅ What TO Do in 1NF

- Each column should hold atomic values (single, indivisible).
- Each row should be unique.
- Break repeating groups into separate rows or tables.

```
-- Good design: atomic values, no repeating groups
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE CustomerPhones (
    customer_id INT,
    phone_number VARCHAR(20),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
```

**Here**:

- Each phone number is stored in its own row.
- Data is atomic (one value per cell).
- No repeating groups or multi-valued columns.

## 🧩 Easy Analogy

- Think of 1NF like a school attendance sheet:
- ❌ Wrong: writing “Rahim, Karim, Salma” in one cell.
- ✅ Right: each student gets their own row.

## 2️⃣ Second Normal Form (2NF) – Remove Partial Dependencies

**Rule: Every non-key column must depend on the whole primary key**

**_❌ What NOT to Do in 2NF_**

- Don’t keep attributes that depend only on part of a composite primary key.
- This happens when a table has a composite key (two or more columns as the primary key), but some non-key columns depend only on one part of that key.

Example: A table tracking which student takes which course:

```

-- Bad design: partial dependency
CREATE TABLE StudentCourses (
    student_id INT,
    course_id INT,
    course_name VARCHAR(50), -- depends only on course_id
    PRIMARY KEY (student_id, course_id)
);
```

**Here**

- The primary key is (student_id, course_id).
- But course_name depends only on course_id, not on the whole key.
- This violates 2NF.

**_✅ What TO Do in 2NF_**

- Separate data into different tables so that every non-key column depends on the whole primary key.
- Create one table for courses, and another for the student-course relationship.

```
-- Courses table (course_id → course_name)
CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50)
);

-- StudentCourses table (linking students to courses)
CREATE TABLE StudentCourses (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);
```

- course_name is stored in the Courses table, where it depends only on course_id.
- The StudentCourses table only stores relationships, with no partial dependency.
- Every non-key attribute depends on the whole key.

## 3️⃣ Third Normal Form (3NF) – Remove Transitive Dependencies

**Rule: Non-key columns should not depend on other non-key columns.**

**_❌ What NOT to Do in 3NF_**

- Don’t keep attributes that depend on other non-key attributes.
- This is called a transitive dependency.
- Example: storing city based on zip_code inside the Students table.

```
-- Bad design: transitive dependency
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50),
    zip_code VARCHAR(10),
    city VARCHAR(50) -- depends on zip_code, not directly on student_id
);
```

**Here:**

- student_id is the primary key.
- city does not depend on student_id directly; it depends on zip_code.
- That violates 3NF.

**_✅ What TO Do in 3NF_**

- Separate attributes that depend on other non-key attributes into their own table.
- Keep only direct dependencies on the primary key.

```
-- ZipCodes table (zip_code → city)
CREATE TABLE ZipCodes (
    zip_code VARCHAR(10) PRIMARY KEY,
    city VARCHAR(50)
);

-- Students table (student_id → name, zip_code)
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50),
    zip_code VARCHAR(10),
    FOREIGN KEY (zip_code) REFERENCES ZipCodes(zip_code)
);
```

**Now:**

- city depends only on zip_code in the ZipCodes table.
- Students table has no transitive dependency — every column depends directly on student_id.
- ✅ This is proper 3NF.
