from fastapi import FastAPI
from model import User
from database import get_db_connection, init_db
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {'data' : 'test'}

@app.on_event('startup')
def startup():
    init_db()


@app.post("/signup")
def signup(user: User):
    connect = get_db_connection()
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ?", (user.username,))
    existing_user = cursor.fetchone()
    if existing_user:
        connect.close()
        return {'message': 'Username already exists'}
    cursor.execute("INSERT INTO users (username, password, name) VALUES (?, ?, ?)", (user.username, user.password, user.name))
    connect.commit()
    return {'message': 'User registered successfully'}
    
@app.post("/login")
def login(user: User):
    connect = get_db_connection()
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (user.username, user.password))
    existing_user = cursor.fetchone()
    connect.close()
    if existing_user:
        return {'message': 'Login successful'}
    else:
        return {'message': 'Invalid username or password'}

@app.get("/users")
def get_users():
    connect = get_db_connection()
    cursor = connect.cursor()
    cursor.execute("SELECT username, name FROM users")
    users = cursor.fetchall()
    connect.close()
    return {'users': [dict(user) for user in users]}