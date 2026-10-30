# PageTurn — Library Management & Book Circulation Portal

A React + Vite application connected to JSON Server. It manages books, members, book issues, returns and transaction history.

## Requirements
- Node.js (LTS recommended)
- npm

## Run the project
Open a terminal in this project folder and install dependencies:

```bash
npm install
```

Start JSON Server in **Terminal 1**:

```bash
npm run server
```

The API runs at `http://localhost:3000`.

Start React in **Terminal 2**:

```bash
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Main features
- Dashboard with total books, available books, members and active issues.
- Books: list, search, add, edit and delete (GET all/by ID, POST, PUT, DELETE).
- Members: list, search, add, edit and delete.
- Issue book: select an available book and member; the book becomes Issued.
- Return book: close an active transaction; the book becomes Available again.
- Transactions: view circulation history.
- Responsive layout and form validation.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get one book |
| POST | `/books` | Add a book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |
| GET | `/members` | Get all members |
| GET | `/members/:id` | Get one member |
| POST | `/members` | Add a member |
| PUT | `/members/:id` | Update a member |
| DELETE | `/members/:id` | Delete a member |
| GET | `/transactions` | Get transactions |
| POST | `/transactions` | Create an issue transaction |
| PUT | `/transactions/:id` | Update/return transaction |
| DELETE | `/transactions/:id` | Delete a transaction |

## Project structure
```text
src/
  components/   reusable layout and UI
  pages/        Dashboard, Books, Members, Issue, Returns, Transactions
  services/     JSON Server API functions
  App.jsx
  main.jsx
  styles.css
db.json
```

## Notes
- Keep `db.json` in the project root and do not close the JSON Server terminal while using the app.
- The app expects JSON Server at `http://localhost:3000`.
- This is an educational capstone starter. For production, add authentication, role-based access, server-side validation and database backups.
