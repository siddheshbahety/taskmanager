from pydantic import BaseModel, constr


class UserCreate(BaseModel):
    username: str
    password: constr(max_length=72)


class User(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True


class TaskBase(BaseModel):
    title: str


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int
    completed: bool

    class Config:
        from_attributes = True
