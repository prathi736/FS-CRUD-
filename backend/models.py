from sqlalchemy import Column, Integer, String
from database import Base


class Students(Base):
    __tablename__ = "student"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    rollNo = Column(Integer, index=True)
    year = Column(Integer, index=True)