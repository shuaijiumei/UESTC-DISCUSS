/**
 * Author: TBY on 2021-08-09
 * note 笔记
 * tips 特别注意
 * example 例子
 */
import React from 'react';
import PropTypes from 'prop-types';

const Sign = ({ history }) => (
  <div>
    I am Sign.....
  </div>
);

Sign.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Sign;
