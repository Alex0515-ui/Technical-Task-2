from database import session
from models import Admin
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

def seed_admin():
    db = session()

    admin_name = "admin"
    admin_password = "123"

    admin = db.query(Admin).filter(Admin.name == admin_name).first()
    if admin:
        print("Admin already exists")
        db.close()
        return
    new_admin = Admin(name=admin_name, password=password_hash.hash(admin_password))

    db.add(new_admin)
    db.commit()
    db.close()

    print("Admin created!")

if __name__ == "__main__":
    seed_admin()