/**
 * Author: TBY on 2021-08-09
 * note 笔记
 * tips 特别注意
 * example 例子
 */
import axios from 'axios';

const { serverURL, timeout } = require('../config/default.config');

const instance = axios.create({
  baseURL: serverURL,
  timeout,
  headers: {
    Authorization: null,
  },
});

export default instance;
