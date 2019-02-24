import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  queryAddPlayer,
  queryPlayerList,
  queryEditPlayer,
  queryRewardList,
  queryDeletePlayer,
  queryAddReward,
  querySendReward,
  queryResetReward,
  queryEditReward,
  queryDeleteReward,
} from '@/services/api';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'leyacg',

  state: {

  },

  effects: {
    *queryAddPlayer({ payload }, { call,put  }) {
      const response = yield call(queryAddPlayer, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success('添加成功');
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryDeleteReward({ payload }, { call,put  }) {
      const response = yield call(queryDeleteReward, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success('操作成功');
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryAddReward({ payload }, { call,put  }) {
      const response = yield call(queryAddReward, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success('添加成功');
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryEditReward({ payload }, { call,put  }) {
      const response = yield call(queryEditReward, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success('修改成功');
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryEditPlayer({ payload }, { call,put  }) {
      const response = yield call(queryEditPlayer, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success('修改成功');
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryDeletePlayer({ payload }, { call,put  }) {
      const response = yield call(queryDeletePlayer, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success('操作成功');
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *querySendReward({ payload }, { call,put  }) {
      const response = yield call(querySendReward, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success('操作成功');
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryResetReward({ payload }, { call,put  }) {
      const response = yield call(queryResetReward, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success('操作成功');
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryPlayerList({ payload }, { call,put  }) {
      yield put({type: 'updateState', payload: {playerList:null}});
      const response = yield call(queryPlayerList, payload);
      if (response) {
        switch (response.code) {
          case 0:
            yield put({type: 'updateState', payload: {playerList:response.content}});
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryRewardList({ payload }, { call,put  }) {
      yield put({type: 'updateState', payload: {rewardList:null,lastReset:''}});
      const response = yield call(queryRewardList, payload);
      if (response) {
        switch (response.code) {
          case 0:
            yield put({type: 'updateState', payload: {rewardList:response.content.data,lastReset:response.content.lastReset}});
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
