from sqlalchemy import create_engine, Column, Integer, String, Time, Date, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from datetime import time
from enum import Enum

# creates connection to the database
engine = create_engine('mysql+mysqlconnector://mcveigth:asdf@localhost:3306/company')
Base = declarative_base()

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()


class User(Base):
    """Defines structure for clients table"""
    __tablename__ = 'clients'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    email = Column(String(50))
    phone = Column(String(15))
    address = Column(String(100))
    date = Column(Date)
    time = Column(Time)


class SessionStatus(Enum):
    """Session status"""
    SESSION_CAPTURED = 1
    SESSION_SENT_TO_RENDER = 2
    SESSION_SENT_TO_CLEANUP = 3
    SESSION_SENT_TO_USER = 4
    SESSION_CONFIRMED_BY_USER = 5
    SESSION_WAITING_CONFIRMATION_FROM_ADMIN = 6
    SESSION_SENT_TO_PRINT = 7
    SESSION_DONE = 8


class Session(Base):
    """Defines structure for sessions table which is related to users id"""
    __tablename__ = 'sessions'
    id = Column(Integer, primary_key=True)
    status = Column(Enum(SessionStatus))
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship(User)


def new_client(user) -> None:
    """
    adds new client to clients table
    Args:
        user: A list with user's information such as name, email, phone ...
    Returns:
        None
    """
    new_client = User(name=str(user.name), email=str(user.email), phone=int(user.phone), address=str(user.address),
                      date=str(user.date), time=time.strptime(str(user.time), 'H:%M:%S'))

    session.add(new_client)
    session.commit()

# update users data
# user = session.query(User).filter_by(id=1).first()
# user.name = 'mcveigth doe'

# session.commit()


# user = session.query(User).filter_by(name='John Doe').one()
# new_session = Session(status=SessionStatus.SESSION_CAPTURED, user=user)
# session.add(new_session)
# session.commit()
