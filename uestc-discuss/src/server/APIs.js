/**
 * Author: TBY on 2021-08-09
 * note 笔记
 * tips 特别注意
 * example 例子
 */

import instance from '../network/request';

export const userLogin = (data) => instance({
  url: '/users/login',
  method: 'POST',
  data,
});

export const getCurrentUser = (data) => instance({
  url: 'user',
  data,
});
