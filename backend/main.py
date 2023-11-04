from fastapi import FastAPI, HTTPException, status, Depends
from pydantic import BaseModel
from models import Students as StudentModel
import models
from typing import Annotated, Optional
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy.sql import update
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

class Student(BaseModel):
    id: int
    name: str
    rollNo: int
    year: int

class DeleteResponse(BaseModel):
    Message: str

class UpdateStudent(BaseModel):
    name: Optional[str] = None
    rollNo: Optional[int] = None
    year: Optional[int] = None



def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


# just an example
@app.get("/")
def root():
    return{"message": "hello everyone"}



@app.get("/form/", response_model=list[Student])
async def get_all_student(db:db_dependency):
    students = db.query(StudentModel).all()
    return students



# create new information 
@app.post("/form/", status_code=status.HTTP_201_CREATED, response_model=Student)
async def create_form(student: Student, db: db_dependency):
    try:
        db_student = StudentModel(name=student.name, rollNo=student.rollNo, year=student.year)

        db.add(db_student)
        db.commit()

        db.refresh(db_student)

        return db_student
    except Exception as e:
        raise HTTPException(status_code=404, details="Students details are not created.")



# get the information
@app.get("/form/{student_id}", response_model=Student)
async def get_form(student_id: int, db: db_dependency):
    db_student = db.query(StudentModel).filter(StudentModel.id == student_id).first()

    if db_student is None:
        raise HTTPException(status_code=404, detail="Student not found")

    return db_student



# update the information
@app.put("/form/{student_id}", response_model=Student)
async def update_form(student_id: int, student: UpdateStudent, db: db_dependency):
    db_student = db.query(StudentModel).filter(StudentModel.id == student_id).first()

    if db_student is None:
        raise HTTPException(status_code=404, detail="Student not found")

    if student.name != None:
        db_student.name = student.name
    if student.rollNo != None:
        db_student.rollNo = student.rollNo
    if student.year != None:
        db_student.year = student.year

    db.commit()
    db.refresh(db_student)

    return db_student



# delete the information
@app.delete("/form/{student_id}", response_model=DeleteResponse)
async def delete_form(student_id: int, db: db_dependency):
    db_student = db.query(StudentModel).filter(StudentModel.id == student_id).first()

    if db_student is None:
        raise HTTPException(status_code=404, detail="Student Id not found.")
    
    db.delete(db_student)
    db.commit()

    # return db_student
    return {"Message": "Student Id is deleted"}
