import React, { useMemo } from 'react';
import { getWidgetName, extraSchemaList } from '../../mapping';
import { defaultWidgetNameList } from '../../widgets/antd';
import { useTools } from '../../hooks';
import { transformProps } from '../../createWidget';

import { isObjType, isListType, isObject } from '../../utils';
// import { Input } from 'antd';
// import Map from '../../widgets/antd/map';

// 错误schema组件展示
const ErrorSchema = schema => {
  return (
    <div>
      <div style={{ color: 'red' }}>schema未匹配到展示组件：</div>
      <div>{JSON.stringify(schema)}</div>
    </div>
  );
};

// 扩展的widget
const ExtendedWidget = ({
  schema,
  onChange,
  value,
  children,
  onItemChange,
  formData,
  getValue,
  readOnly,
  dataPath,
  disabled,
  dataIndex,
}) => {
  const { widgets, mapping } = useTools();

  // TODO1: 需要查一下卡顿的源头
  // if (isObjType(schema)) {
  //   return <Map value={value} onChange={onChange} children={children} />;
  // }
  // if (isListType(schema)) {
  //   return 'haha';
  // }
  // return <Input value={value} onChange={e => onChange(e.target.value)} />;

  // TODO: 计算是哪个widget，需要优化
  // let widgetName = useMemo(() => getWidgetName(schema, mapping), [
  //   JSON.stringify(schema),
  // ]);
  let widgetName = getWidgetName(schema, mapping);
  const customName = schema.widget || schema['ui:widget'];
  if (customName && widgets[customName]) {
    widgetName = customName;
  }
  const readOnlyName = schema.readOnlyWidget || 'html';
  if (readOnly && !isObjType(schema) && !isListType(schema)) {
    widgetName = readOnlyName;
  }
  if (!widgetName) {
    widgetName = 'input';
    return <ErrorSchema schema={schema} />;
  }
  const Widget = widgets[widgetName];
  const extraSchema = extraSchemaList[widgetName];

  let widgetProps = {
    schema: { ...schema, ...extraSchema },
    onChange,
    value,
    children,
    disabled,
    readOnly,
    ...schema.props,
  };


  if (schema.type === 'string' && typeof schema.max === 'number') {
    widgetProps.maxLength = schema.max;
  }

  ['title', 'placeholder', 'disabled', 'format'].forEach(key => {
    if (schema[key]) {
      widgetProps[key] = schema[key];
    }
  });

  if (schema.props) {
    widgetProps = { ...widgetProps, ...schema.props };
  }

  // 支持 addonAfter 为自定义组件的情况
  if(isObject(widgetProps.addonAfter) && widgetProps.addonAfter.widget) {
    const AddonAfterWidget = widgets[widgetProps.addonAfter.widget];
    widgetProps.addonAfter = <AddonAfterWidget {...schema}/>;
  }

  // 避免传组件不接受的props，按情况传多余的props
  // const isExternalWidget = defaultWidgetNameList.indexOf(widgetName) === -1; // 是否是外部组件
  widgetProps.addons = {
    onItemChange,
    setValue: onItemChange,
    getValue,
    formData,
    dataPath,
    dataIndex,
  };

  const finalProps = transformProps(widgetProps);

  return <Widget {...finalProps} />;
};

// 判断前后props是否一致
const areEqual = (prev, current) => {
  if (prev.schema && prev.schema.$id === '#') {
    return false;
  }
  if (prev.readOnly !== current.readOnly) {
    return false;
  }
  if (prev.disabled !== current.disabled) {
    return false;
  }
  if (
    JSON.stringify(prev.value) === JSON.stringify(current.value) &&
    JSON.stringify(prev.schema) === JSON.stringify(current.schema)
  ) {
    return true;
  }
  return false;
};

// 返回true则使用上次渲染结果，false重新渲染
export default React.memo(ExtendedWidget, areEqual);
