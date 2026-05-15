# TaskControl

A full-stack, Trello-style task management application. Organize work into
**boards**, group cards into **lists**, track **tasks**, and collaborate through
**comments** — all behind JWT-secured authentication.

Built as a showcase of end-to-end product engineering: a layered REST API on the
backend and a state-driven, modular single-page application on the front end.

<p>
  <img alt="Angular" src="https://img.shields.io/badge/Angular-14-DD0031?logo=angular&logoColor=white">
  <img alt="NgRx" src="https://img.shields.io/badge/NgRx-State%20Management-BA2BD2?logo=reactivex&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-4.7-3178C6?logo=typescript&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white">
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white">
  <img alt="JWT" src="https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white">
</p>

---

## Highlights

- **Custom drag-and-drop engine.** Cards and lists are reordered with hand-written
  Angular directives (`draggable`, `droppable`, `dropzone`, `resize`) — no
  third-party drag-and-drop library — demonstrating low-level DOM and pointer-event
  work.
- **Predictable state with NgRx.** Every domain (boards, lists, tasks, comments,
  modals, toolbar, user) has its own actions / reducer / effects / selectors slice,
  keeping side effects isolated and the UI a pure function of state.
- **Layered backend.** Each resource flows through a clean
  `router → controller → service → model` pipeline, with a shared `asyncWrapper`
  for centralized async error handling.
- **Secure by default.** Passwords are hashed with bcrypt; protected routes are
  gated by JWT verification middleware and an HTTP interceptor attaches the token
  to every outgoing request.
- **Tested.** Components, services, effects, reducers, selectors and directives
  ship with Jasmine/Karma specs and code-coverage reporting.

---

## Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| **Frontend** | Angular 14, NgRx (Store, Effects, DevTools), RxJS, TypeScript, SCSS, Angular CDK |
| **Backend**  | Node.js, Express, Mongoose |
| **Database** | MongoDB |
| **Auth**     | JSON Web Tokens, bcryptjs |
| **Tooling**  | Angular CLI, Karma + Jasmine, ESLint (Airbnb), Nodemon |

---

## Architecture

```
task-control-app/
├── backend/                     # Express REST API
│   └── src/
│       ├── routers/             # Route definitions per resource
│       ├── controllers/         # Request/response handling
│       ├── services/            # Business logic & data access
│       ├── models/              # Mongoose schemas
│       ├── middlewares/         # JWT auth, password handling
│       ├── asyncWrapper.js      # Centralized async error handling
│       └── index.js             # App entry point
│
└── frontend/                    # Angular single-page application
    └── src/app/
        ├── core/                # App-wide singletons, NgRx state slices
        │   └── states/          # boards | lists | tasks | comments | modals | user | toolbar
        ├── features/            # Lazy-loaded feature modules
        │   ├── login/           # Auth, route guard, HTTP interceptor
        │   ├── dashboard/       # Boards overview
        │   └── board/           # Lists, tasks, comments, task modal
        └── shared/              # Reusable components & directives (drag-and-drop, resize…)
```

**Frontend conventions**

- Feature modules (`dashboard`, `board`, `login`) are **lazy-loaded** and protected
  by an `AuthGuard` (`CanLoad`).
- Path aliases (`@core/*`, `@shared/*`, `@features/*`) keep imports flat and
  refactor-friendly.
- The unidirectional NgRx data flow: components dispatch **actions** → **effects**
  call the API → **reducers** update state → **selectors** feed the templates.

**Backend conventions**

- All `/api/*` resource routes (except auth) sit behind JWT `authMiddleware`.
- Controllers stay thin; services own the business logic and Mongoose queries.

---

## REST API

Base path: `/api`

### Auth — `/auth`
| Method | Endpoint     | Description                |
|--------|--------------|----------------------------|
| POST   | `/register`  | Create a new user account  |
| POST   | `/login`     | Authenticate, return a JWT |

### Boards — `/boards` 🔒
| Method | Endpoint  | Description          |
|--------|-----------|----------------------|
| GET    | `/`       | List the user's boards |
| GET    | `/:id`    | Get a single board   |
| POST   | `/`       | Create a board       |
| PUT    | `/:id`    | Update a board       |
| DELETE | `/:id`    | Delete a board       |

### Lists — `/lists` 🔒
| Method | Endpoint  | Description    |
|--------|-----------|----------------|
| GET    | `/`       | List lists     |
| GET    | `/:id`    | Get a list     |
| POST   | `/`       | Create a list  |
| PUT    | `/:id`    | Update a list  |
| DELETE | `/:id`    | Delete a list  |

### Tasks — `/tasks` 🔒
| Method | Endpoint                      | Description                |
|--------|-------------------------------|----------------------------|
| GET    | `/`                           | List all tasks             |
| GET    | `/board`                      | List tasks for a board     |
| GET    | `/:id`                        | Get a single task          |
| POST   | `/`                           | Create a task              |
| PUT    | `/:id`                        | Update a task              |
| PUT    | `/:id/comment`                | Add a comment to a task    |
| DELETE | `/:id/comment/:commentId`     | Remove a comment from a task |
| DELETE | `/:id`                        | Delete a task              |

### Comments — `/comments` 🔒
| Method | Endpoint  | Description           |
|--------|-----------|-----------------------|
| GET    | `/`       | List comments by board |
| POST   | `/:id`    | Create a comment      |
| PUT    | `/:id`    | Update a comment      |
| DELETE | `/:id`    | Delete a comment      |

### User — `/user` 🔒
| Method | Endpoint  | Description              |
|--------|-----------|--------------------------|
| GET    | `/`       | Get the current user     |

🔒 = requires `Authorization: Bearer <token>` header.

---

## Getting Started

### Prerequisites

- Node.js 16+
- A MongoDB database (local or hosted, e.g. MongoDB Atlas)

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGODB_URI=<your-mongodb-connection-string>
SECRET_JWT_KEY=<your-jwt-secret>
PORT=8080
```

Run the API:

```bash
npm run development   # auto-reload with nodemon
# or
npm start             # plain node
```

The API is served at `http://localhost:8080/api`.

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

The app runs at `http://localhost:4200`.

> The API base URL is configured in
> [`frontend/src/environments/environment.ts`](frontend/src/environments/environment.ts).
> Point `baseUrl` at your backend (e.g. `http://localhost:8080/api`) for local
> development.

---

## Scripts

**Backend** (`backend/`)
| Command               | Description                          |
|-----------------------|--------------------------------------|
| `npm start`           | Start the API                        |
| `npm run development` | Start with hot-reload (nodemon)      |
| `npm run lint`        | Lint and auto-fix with ESLint        |

**Frontend** (`frontend/`)
| Command         | Description                              |
|-----------------|------------------------------------------|
| `npm start`     | Dev server at `localhost:4200`           |
| `npm run build` | Production build                         |
| `npm test`      | Run unit tests with code-coverage report |

---

## Testing

The Angular app is covered by Jasmine specs run through Karma, including dedicated
tests for NgRx reducers, selectors and effects, custom directives, and service
mocks:

```bash
cd frontend
npm test
```

---

## Author

**Roman Zvir** — [rmzvr@proton.me](mailto:rmzvr@proton.me)
