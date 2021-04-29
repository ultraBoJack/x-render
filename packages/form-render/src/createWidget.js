import { defaultGetValueFromEvent } from './utils';
// TODO: props传入的值，之后要改造
// mention: createWidget 设计的构架，保证了可以多次使用套壳，而不会互相影响。内部使用了一遍用于解析schema上的字段trigger, valuePropName。外部生成自定义组件的时候还可以再套一层，用于解析 propsMap
export const createWidget = (mapProps, extraSchema) => Component => props => {
  const { schema, ...rest } = props;
  const _schema = { ...schema, ...extraSchema };

  // mapProps是个函数，如果传入不是函数，默认为{}
  const propsMap =
    typeof mapProps === 'function'
      ? mapProps({
          schema: _schema,
          ...rest,
        })
      : {};

  const _props = {
    schema: _schema,
    ...rest,
    ...propsMap, //TODO: propsMap 需要验证一下是否为object
  };

  // 转换并输出最终渲染组件的props
  const finalProps = transformProps(_props);

  return <Component {...finalProps} />;
};

// 转换schema props为最终组件的props
export const transformProps = props => {
  const { onChange, value, defaultValue, schema: ownSchema, ...rest } = props;
  const schema = { ...ownSchema };
  const { trigger, valuePropName } = schema || {};
  // 受控属性，包含value及onChange
  const controlProps = {};
  let _valuePropName = 'value';
  const _value = value === undefined ? defaultValue : value;
  if (valuePropName && typeof valuePropName === 'string') {
    _valuePropName = valuePropName;
    controlProps[valuePropName] = _value;
  } else {
    controlProps.value = _value;
  }
  // 内部change时，转发到传入的onChange属性函数中
  const _onChange = (...args) => {
    const newValue = defaultGetValueFromEvent(_valuePropName, ...args);
    onChange(newValue);
  };
  // 如果schema中定义了trigger则复制到trigger对应的属性上，否则赋值到onChange属性上
  if (trigger && typeof trigger === 'string') {
    controlProps[trigger] = _onChange;
  } else {
    controlProps.onChange = _onChange;
  }

  // 将一些属性转换为最终渲染组件可用的属性
  // TODO: 之后 ui:xx 会舍去
  const usefulPropsFromSchema = {
    disabled: schema.disabled || schema['ui:disabled'],
    readOnly: schema.readOnly || schema['ui:readonly'],
    hidden: schema.hidden || schema['ui:hidden'],
  };

  const _props = {
    ...controlProps,
    schema,
    ...usefulPropsFromSchema,
    ...rest,
  };

  return _props;
};
