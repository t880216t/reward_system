import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryAddPlayer(params) {
  return request('/api/leyacg/addPlayer', {
    method: 'POST',
    body: params,
  });
}

export async function queryDeletePlayer(params) {
  return request('/api/leyacg/deletePlayer', {
    method: 'POST',
    body: params,
  });
}

export async function querySendReward(params) {
  return request('/api/leyacg/sendReward', {
    method: 'POST',
    body: params,
  });
}

export async function queryAddReward(params) {
  return request('/api/leyacg/addReward', {
    method: 'POST',
    body: params,
  });
}

export async function queryEditPlayer(params) {
  return request('/api/leyacg/editPlayer', {
    method: 'POST',
    body: params,
  });
}

export async function queryEditReward(params) {
  return request('/api/leyacg/editReward', {
    method: 'POST',
    body: params,
  });
}

export async function queryDeleteReward(params) {
  return request('/api/leyacg/deleteReward', {
    method: 'POST',
    body: params,
  });
}

export async function queryPlayerList() {
  return request(`/api/leyacg/playerList?_=${new Date().getTime().toString()}`);
}

export async function queryResetReward() {
  return request(`/api/leyacg/resetReward?_=${new Date().getTime().toString()}`);
}

export async function queryRewardList() {
  return request(`/api/leyacg/rewardList?_=${new Date().getTime().toString()}`);
}

////////////////////////////////////////

export async function queryAddTask(params) {
  return request('/api/build/add', {
    method: 'POST',
    body: params,
  });
}

export async function queryTaskBuild(params) {
  return request(`/api/build/taskBuild?taskId=${params.taskId.toString()}`);
}

export async function queryTaskPerformance(params) {
  return request(`/api/build/getPerformance?taskId=${params.taskId.toString()}`);
}

export async function queryIosTaskBuild(params) {
  return request(`/ios/api/build/taskBuild?taskId=${params.taskId.toString()}`);
}

export async function queryTaskList(params) {
  return request(`/api/build/tasklist?platform=${params.platform.toString()}`);
}

export async function queryProjectList() {
  return request('/api/build/getProjectList');
}

export async function queryAccountLogout() {
  return request('/api/auth/logout');
}

export async function fakeAccountLogin(params) {
  return request('/api/auth/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/auth/register', {
    method: 'POST',
    body: params,
  });
}



//==============================================================



export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
