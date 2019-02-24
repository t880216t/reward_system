#-*-coding:utf-8-*-
from flask import Blueprint,jsonify,make_response,request
from app import db
from app.tables.Leyacg import Players,Reward,ResetLog
import math

leyacg = Blueprint('leyacg', __name__)

@leyacg.route('/test')
def test():
  return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': {'command': 1}}))


@leyacg.route('/addPlayer',methods=['POST'])
def addPlayer():
  account = request.json.get("account")
  name = request.json.get("playerName")
  if account and name:
    data = Players(account, name)
    db.session.add(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': {'id': data.id}}))
  else:
    return make_response(jsonify({'code': 10001, 'msg': u'添加失败', 'content': {}}))

@leyacg.route('/playerList')
def playerList():
  playersData = Players.query.filter_by(status=1).order_by(db.desc(Players.add_time)).all()
  content = []
  if playersData:
    for item in playersData:
      content.append({
        "id":item.id,
        "account":item.account,
        "name":item.name,
        "add_time":item.add_time,
      })
  return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': content}))

@leyacg.route('/deletePlayer',methods=['POST'])
def deletePlayer():
  id = request.json.get("id")
  data = {'status':0}
  row_data = Players.query.filter_by(id=id)
  if row_data.first():
    row_data.update(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': []}))
  else:
    return make_response(jsonify({'code': 10001, 'msg': '没有该玩家', 'content': []}))

@leyacg.route('/editPlayer',methods=['POST'])
def editPlayer():
  id = request.json.get("id")
  account = request.json.get("account")
  name = request.json.get("playerName")
  data = {'account':account,'name':name}
  row_data = Players.query.filter_by(id=id)
  if row_data.first():
    row_data.update(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': []}))
  else:
    return make_response(jsonify({'code': 10001, 'msg': '没有该玩家', 'content': []}))

@leyacg.route('/rewardList')
def rewardList():
  rewardData = Reward.query.filter_by(delete_flag=0).order_by(db.desc(Reward.update_time)).all()
  resetData = ResetLog.query.filter_by().order_by(db.desc(ResetLog.reset_time)).first()
  lastReset = ""
  if resetData:
    lastReset = resetData.reset_time.strftime('%Y-%m-%d %H:%M:%S')
  content = []
  if rewardData:
    for index,item in enumerate(rewardData):
      account = ''
      name = ''
      row_data = Players.query.filter_by(id=item.player_id).first()
      if row_data:
        account= row_data.account
        name = row_data.name
      totalScore= item.bug * 0.3 + item.bonus + item.sign + item.last_week
      needGiveCount = math.modf(totalScore)[1]
      content.append({
        "index": index + 1,
        "id": item.id,
        "account": account,
        "player_id":item.player_id,
        "name": name,
        "bonus": item.bonus,
        "sign": item.sign,
        "bug": item.bug,
        "last_week": item.last_week,
        "total": item.total,
        "give": needGiveCount * 20,
        "account_total": item.account_total,
        "add_time": item.add_time,
        "update_time": item.update_time.strftime('%Y-%m-%d %H:%M:%S'),
        "status": item.status,
      })

  return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': {'data':content,'lastReset':lastReset}}))

@leyacg.route('/addReward',methods=['POST'])
def addReward():
  account = request.json.get("account")
  bonus = request.json.get("bonus")
  bug = request.json.get("bug")
  sign = request.json.get("sign")
  row_object = Reward.query.filter_by(player_id=account)
  row_data = row_object.first()
  if row_data:
    #update
    new_bonus = row_data.bonus + bonus
    new_bug = row_data.bug + bug
    new_sign = row_data.sign + sign
    data = {'bonus':new_bonus,'bug':new_bug,'sign':new_sign,'delete_flag':0}
    row_object.update(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'msg': '合并成功', 'content': {}}))
  else:
    #add
    data = Reward(account,bonus,sign,bug)
    db.session.add(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'msg': '增加成功', 'content': {'id': data.id}}))

@leyacg.route('/sendReward',methods=['POST'])
def sendReward():
  id = request.json.get("id")
  data = {'status':1}
  row_data = Reward.query.filter_by(id=id)
  if row_data.first():
    row_data.update(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': []}))
  else:
    return make_response(jsonify({'code': 10001, 'msg': 'error', 'content': []}))

def addResetLog():
  data = ResetLog()
  db.session.add(data)
  db.session.commit()

@leyacg.route('/resetReward')
def resetReward():
  rewardData = Reward.query.filter_by(delete_flag=0).all()
  if rewardData:
    for item in rewardData:
      bug = item.bug * 0.3
      totalScore = bug + item.bonus + item.sign + item.last_week
      if totalScore > 1:
        if item.status == 0:
          message = u"奖励还未发放完"
          row_data = Players.query.filter_by(id=item.player_id).first()
          if row_data:
            message = u"奖励还未发放完："+ row_data.account + " | "+row_data.name
          return make_response(jsonify({'code': 10001, 'msg': message , 'content': []}))
    for item in rewardData:
      bug = item.bug * 0.3
      totalScore = bug + item.bonus + item.sign + item.last_week
      giveCount = math.modf(totalScore)[1]
      outCount = '%.1f' %(math.modf(totalScore)[0])
      row_object = Reward.query.filter_by(id=item.id)
      total = item.total + giveCount
      data = {'bonus': 0, 'bug': 0, 'sign': 0,'last_week': outCount,'total':total,'status':0}
      row_object.update(data)
      db.session.commit()
    addResetLog()
    return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': []}))
  else:
    return make_response(jsonify({'code': 10001, 'msg': '暂无数据', 'content': []}))

@leyacg.route('/editReward',methods=['POST'])
def editReward():
  id = request.json.get("id")
  bonus = request.json.get("bonus")
  bug = request.json.get("bug")
  sign = request.json.get("sign")
  data = {
    'bonus':bonus,
    'bug':bug,
    'sign':sign,
  }
  row_data = Reward.query.filter_by(id=id)
  if row_data.first():
    row_data.update(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': []}))
  else:
    return make_response(jsonify({'code': 10001, 'msg': 'error', 'content': []}))

@leyacg.route('/deleteReward',methods=['POST'])
def deleteReward():
  id = request.json.get("id")
  data = {
    'delete_flag':1,
  }
  row_data = Reward.query.filter_by(id=id)
  if row_data.first():
    row_data.update(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': []}))
  else:
    return make_response(jsonify({'code': 10001, 'msg': 'error', 'content': []}))
