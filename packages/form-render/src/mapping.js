// 组件渲染的映射规则

export const mapping = {
  default: 'input',
  string: 'input',
  array: 'list',
  boolean: 'checkbox',
  integer: 'number',
  number: 'number',
  object: 'map',
  html: 'html',
  'string:upload': 'upload',
  'string:url': 'url',
  'string:dateTime': 'date',
  'string:date': 'date',
  'string:year': 'date',
  'string:month': 'date',
  'string:week': 'date',
  'string:quarter': 'date',
  'string:time': 'time',
  'string:textarea': 'textarea',
  'string:color': 'color',
  'string:image': 'imageInput',
  'range:time': 'timeRange',
  'range:dateTime': 'dateRange',
  'range:date': 'dateRange',
  'range:year': 'dateRange',
  'range:month': 'dateRange',
  'range:week': 'dateRange',
  'range:quarter': 'dateRange',
  '*?enum': 'radio',
  '*?enum_long': 'select',
  'array?enum': 'checkboxes',
  'array?enum_long': 'multiSelect',
  '*?readOnly': 'html', // TODO: 只读模式加上后，这儿要还要2个自定义组件。一个渲染list，一个渲染select
};

// 获取需要渲染的widget名称
export function getWidgetName(schema, _mapping = mapping) {
  const { type, format, enum: enums, readOnly, widget } = schema;

  // 如果已经注明了渲染widget，那最好
  // if (schema['ui:widget']) {
  //   return schema['ui:widget'];
  // }

  const list = [];
  // 只读
  if (readOnly) {
    list.push(`${type}?readOnly`);
    list.push('*?readOnly');
  }
  // 枚举类型，分情况渲染不同的组件
  if (enums) {
    // 根据enum长度来智能选择控件，同时会有兜底策略
    if (
      Array.isArray(enums) &&
      ((type === 'array' && enums.length > 6) ||
        (type !== 'array' && enums.length > 2))
    ) {
      list.push(`${type}?enum_long`);
      list.push('*?enum_long');
    } else {
      list.push(`${type}?enum`);
      // array 默认使用list，array?enum 默认使用checkboxes，*?enum 默认使用select
      list.push('*?enum');
    }
  }
  // 自定义组件widget
  const _widget = widget || format;
  if (_widget) {
    list.push(`${type}:${_widget}`);
  }
  // 放在最后兜底，其他都不match时使用type默认的组件
  list.push(type);
  let found = '';
  // 从组件映射mapping中查找到list中第一个匹配的组件名称进行渲染
  list.some(item => {
    found = _mapping[item];
    return !!found;
  });
  return found;
}

// 额外schema列表
export const extraSchemaList = {
  checkbox: {
    // 受控的属性名，对应antd中的checkbox受控checked
    valuePropName: 'checked',
  },
  switch: {
    // 受控的属性名，对应antd中的switch受控checked
    valuePropName: 'checked',
  },
};
