from app import db

class users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True)
    email = db.Column(db.String(40), unique=True)
    phoneNumber = db.Column(db.String(255), unique=True)
    hash_password = db.Column(db.String(80))
    salt = db.Column(db.String(80))
    account_type = db.Column(db.Integer)

    def __init__(self, username,hash_password,salt,email):
        self.username = username
        self.hash_password = hash_password
        self.salt = salt
        self.email = email
        self.account_type = 1
