# User Management App (React Internship Challenge)

A React + Vite app built for a frontend internship challenge to demonstrate **components**, **state management**, **routing**, **forms**, **validation**, and **data fetching**.

## Live Features Implemented

### Core Requirements
- Fetch users from JSONPlaceholder API
- Display users in a responsive card layout (name, email, company)
- Store fetched users in app state (Redux Toolkit)
- Client-side search by **name** or **email**
- User Details page with:
  - address
  - phone
  - website
- Add new user (local only) with validation:
  - name required
  - email required
- New user inserted at the **top** of the list

### Bonus Features
- Sorting (name, email, company)
- Delete user (local state update via Redux)
- Edit / update user (local state update via Redux)
- Redux Toolkit for state management (`fetch`, `add`, `update`, `delete`)
- Basic responsive UI using Bootstrap

---

## Tech Stack

- **React** (Vite)
- **React Router DOM**
- **Redux Toolkit**
- **React Redux**
- **Bootstrap 5**
- **Fetch API**

---

## API Used

- JSONPlaceholder Users API:
  - `https://jsonplaceholder.typicode.com/users`

---
How to Run Locally
1) Install dependencies
npm install
2) Start development server
npm run dev
3) Open in browser

Use the local URL shown in terminal (usually http://localhost:5173).

