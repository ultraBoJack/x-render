// 校验错误显示组件

import React from 'react';
import { translateMessage } from '../../utils';
import './ErrorMessage.less';

const ErrorMessage = ({ message, schema, hideValidation }) => {
  let msg = '';
  if (typeof message === 'string') msg = message;
  if (Array.isArray(message)) {
    msg = message[0] || '';
  }

  msg = translateMessage(msg, schema);

  return !msg && hideValidation ? null : (
    <div className={`error-message`}>{msg}</div>
  );
};

export default ErrorMessage;
