# syncHer Backend

This is the backend for **syncHer**, an AI chatbot designed to assist women with menstruation-related questions.  
The backend is built with **FastAPI**, using **Poetry** for dependency management and **Uvicorn** as the ASGI server.

---

## **1. New tools**

    ### **Poetry**

[Poetry](https://python-poetry.org/) is a **Python dependency manager and project tool** that helps us:

- Install and manage project dependencies in an isolated virtual environment  
- Avoid version conflicts between Python packages  
- Automatically handle virtual environments, so you don’t need to manually create `venv` folders  
- Install the project itself as a package so modules (like `app/`) are importable across the project  

Using Poetry ensures **everyone in the team has the same development environment**, regardless of operating system.

**Installation:**
- Linux / macOS:

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

- Windows:

```bash
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -
```

For windows users, make sure that **Poetry** is available in path after installation by running:

```bash
poetry --version
```

    ### **Uvicorn** 

-Uvicorn is a fast ASGI server for Python, used to run FastAPI applications.

-It handles incoming HTTP requests and serves your FastAPI app

-Supports asynchronous endpoints for high-performance APIs

-With the --reload flag, it automatically reloads when code changes during development


---

## **2. Prerequisites**

Make sure you have the following installed:

- **Python 3.12** or later  
- **Poetry** ([Installation guide](https://python-poetry.org/docs/#installation))  
- **Git**  
- Optional (Windows): WSL2 is recommended for a Linux-like environment  

---

## **3. Clone the repository**

```bash
git clone <your-repo-url>
cd SyncHer/backend
```

---

## **4. Install dependencies**
-Poetry automatically creates a virtual environment for the project and installs all dependencies, including the app/ package:

```bash
poetry install
```
This step must be done once after cloning, or whenever new dependencies are added to pyproject.toml, or just to be safe,after every pull.

---

## **5. Run the backend**
From the backend/ directory, run

```bash
poetry run uvicorn app.main:app --reload
```
Note: It is the backend/ directory, not  the app/ directory, when starting the backend.
---

## **6. Folder structure**

```bash
backend/
├── app/
│   ├── __pycache__/
│   ├── routers/
│   ├── __init__.py
│   └── main.py
├── poetry.lock
├── pyproject.toml
└── README.md

```

## **7. Tips**

-All Python imports should use the app package (e.g., from app.routers import chatbot)

-Keep __init__.py in app/ — otherwise Python will not recognize it as a package

-For development, --reload lets Uvicorn restart automatically when you edit files

-Add new routes in app/routers/ and include them in main.py using app.include_router(...)