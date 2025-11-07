from pydantic import BaseModel

class UserSignUp(BaseModel):
    username: str
    password: str

class User(BaseModel):
    username: str
    password: str
    name: str