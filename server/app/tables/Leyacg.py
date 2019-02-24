from app import db
from datetime import datetime

class Players(db.Model):
  __tablename__ = 'players'
  id = db.Column(db.Integer, primary_key=True)
  account = db.Column(db.String(100))
  name = db.Column(db.String(100))
  add_time = db.Column(db.DateTime, nullable=False)
  status = db.Column(db.Integer)

  def __init__(self,account,name):
    self.account = account
    self.name = name
    self.status = 1
    self.add_time = datetime.now()

class Reward(db.Model):
  __tablename__ = 'reward'
  id = db.Column(db.Integer, primary_key=True)
  player_id = db.Column(db.Integer)
  bonus = db.Column(db.Integer)
  sign = db.Column(db.Integer)
  bug = db.Column(db.Integer)
  total = db.Column(db.Integer)
  last_week = db.Column(db.FLOAT)
  this_week = db.Column(db.FLOAT)
  account_total = db.Column(db.FLOAT)
  add_time = db.Column(db.DateTime, nullable=False)
  update_time = db.Column(db.DateTime, nullable=False)
  status = db.Column(db.Integer)
  delete_flag = db.Column(db.Integer)

  def __init__(self,player_id,bonus,sign,bug):
    self.player_id = player_id
    self.bonus = bonus
    self.sign = sign
    self.bug = bug
    self.status = 0
    self.last_week = 0
    self.total = 0
    self.delete_flag = 0
    self.add_time = datetime.now()
    self.update_time = datetime.now()

class ResetLog(db.Model):
  __tablename__ = 'reset_log'
  id = db.Column(db.Integer, primary_key=True)
  reset_time = db.Column(db.DateTime, nullable=False)

  def __init__(self):
    self.reset_time = datetime.now()
