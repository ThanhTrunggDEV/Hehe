from fastapi import FastAPI
from model import UserSignUp, User
app = FastAPI()

@app.get("/")
def read_root():
    return {'data' : 'test'}

@app.post("/signup")
def signup(user: UserSignUp):
    pass