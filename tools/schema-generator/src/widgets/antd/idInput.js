// 组件id输入框，默认会带入组件的id，可修改，主要在右侧组件配置中使用

import React from 'react';
import { Input } from 'antd';
import { getKeyFromUniqueId, changeKeyFromUniqueId } from '../../utils';

export default function IdInput({
  onChange,
  value,
  disabled,
  readonly,
  options,
}) {
  const handleChange = e => {
    try {
      const newId = changeKeyFromUniqueId(value, e.target.value);
      onChange(newId);
    } catch (error) {}
  };

  return (
    <Input
      disabled={disabled || readonly}
      {...options}
      onChange={handleChange}
      value={getKeyFromUniqueId(value)}
    />
  );
}
