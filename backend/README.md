# Setup instructions

- Install uv using pip

```bash
pip install uv
```

- Run uv sync to update all python dependencies

```bash
uv sync
```

- Ensure all credentials needed are contained in your .env file in the base of the directory
- Have a service account JSON file with your agent credentials
- To run the server use the following command

```bash
uvicorn app.main:app --reload
```

## Table creation

- Install your desired database platform and set up a database (prefarrably postgresql)
- Get your connection URL and place your connection URL in the .env file
- Run the db_engine.py file in the db directory to create your tables in the database
