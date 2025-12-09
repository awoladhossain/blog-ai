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

``
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

-- If everything is successful, commit the changes
COMMIT;

-- If something goes wrong, undo all changes
ROLLBACK;
``

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


