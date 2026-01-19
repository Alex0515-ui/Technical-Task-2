from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException
from pwdlib import PasswordHash
from datetime import datetime, timedelta, timezone
from database import get_db
from sqlalchemy.orm import Session
from models import Admin

# Секретный ключ
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"

# Стандартный алгоритм шифрования
ALGORITHM = "HS256"

# Время истечения токена    
ACCESS_TOKEN_EXPIRES_MINUTES = 30

# Инструмент для сравнения, хэщирования паролей 
password_verify = PasswordHash.recommended()

# Инструмент для получения токена из заголовка 
oauth2 = OAuth2PasswordBearer( tokenUrl="token" )

router = APIRouter()

# Функция для сопаставления пароля от хэшированного
def verify_password( password, hashed_password ):
    return password_verify.verify( password, hashed_password )

# Функция для хэширования пароля
def get_hashed_password( password ):
    return password_verify.hash( password )

# Функция для получения админа
def get_admin( name: str, db: Session ):
    return db.query(Admin).filter( Admin.name == name ).first()

# Аутентификация админа
def authenticate_user( name: str, password: str, db: Session = Depends(get_db) ):
    admin = get_admin( name, db )
    if not admin:
        return None
    if not verify_password( password, admin.password ):
        return None
    return admin

# Функция для создания строки в токене  
def create_access_token( username: str, expires: timedelta ):
    payload = { "sub": username, "exp": datetime.now(timezone.utc) + expires }
    return jwt.encode( payload, SECRET_KEY, algorithm=ALGORITHM )

# Функция для получения админа через декодирование
def get_current_admin( encode: str = Depends(oauth2), db: Session = Depends(get_db) ):
    try:
        data = jwt.decode( encode, SECRET_KEY, algorithms=[ALGORITHM] )
        username = data.get("sub")
        if username is None:
            raise HTTPException( status_code=401, detail="Invalid token" )
    except UnicodeDecodeError:
        raise HTTPException( status_code=401, detail="Invalid token" )
    admin = get_admin(username, db)
    if admin is None:
        raise HTTPException( status_code=401, detail="Invalid token" )
    return admin

# Запрос на Аутентификацию и создание токена
@router.post("/token")
def login( form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db) ):
    admin = authenticate_user( form.username, form.password, db )
    if not admin:
        raise HTTPException( status_code=401, detail="Incorrect name or password" )
    token = create_access_token( admin.name, timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES) )
    return { "access_token": token, "token_type": "bearer" }

# Запрос на получения доступа финального
@router.get("/")
def get_access( admin = Depends(get_current_admin) ):
    return { "Message": f"Hello {admin.name}" }


    

