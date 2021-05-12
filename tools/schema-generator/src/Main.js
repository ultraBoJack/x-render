// 主文件

import React, { useEffect, useRef, forwardRef } from 'react';
import { useSet } from './hooks';
// import SCHEMA from './json/basic.json';
import FRWrapper from './FRWrapper';
import { fromFormRender, toFormRender } from './transformer/form-render';
import { widgets as defaultWidgets, mapping as defaultMapping } from 'form-render';
import list from './widgets/antd/list';
import './atom.less';
import './Main.less';
import 'antd/dist/antd.less';
import { oldSchemaToNew } from './utils';

// 默认的schema json
const DEFAULT_SCHEMA = {
  schema: {
    type: 'object',
    properties: {},
  },
  uiSchema: {},
  formData: {},
};

// TODO: formData 不存在的时候会报错：can't find # of undefined
function App(props, ref) {
  const {
    defaultValue,
    templates,
    submit,
    transformer,
    extraButtons,
    settings,
    commonSettings,
    globalSettings,
    widgets = {},
    mapping = {},
  } = props;

  let transformFrom = fromFormRender;
  let transformTo = toFormRender;

  if (transformer) {
    if (typeof transformer.from === 'function') {
      transformFrom = transformer.from;
    }
    if (typeof transformer.to === 'function') {
      transformTo = transformer.to;
    }
  }

  const frwRef = ref || useRef();
  const [state, setState] = useSet({
    formData: {},
    frProps: {
      displayType: 'row',
    }, // form-render 的全局props等
    hovering: undefined, // 目前没有用到
    isNewVersion: true, // 用schema字段，还是用propsSchema字段，这是一个问题
    preview: false, // preview = false 是编辑模式
    schema: {},
    selected: undefined, // 被选中的$id, 如果object/array的内部，以首字母0标识
  });

  // 收口点 propsSchema 到 schema 的转换 (一共3处，其他两个是 importSchema 和 setValue，在 FRWrapper 文件)
  useEffect(() => {
    const schema = defaultValue ? transformFrom(defaultValue) : DEFAULT_SCHEMA;
    if (schema && schema.propsSchema) {
      setState({ isNewVersion: false });
    } else {
      setState({ isNewVersion: true });
    }
    setState({
      schema: oldSchemaToNew(schema), // 旧的转新的，新的不变
      formData: (schema && schema.formData) || {},
    });
  }, [defaultValue]);

  const {
    formData,
    frProps,
    hovering,
    isNewVersion,
    preview,
    schema,
    selected,
  } = state;

  const { displayType } = frProps;
  const showDescIcon = displayType === 'row';
  const _frProps = { ...frProps, showDescIcon };

  const onChange = data => {
    setState({ formData: data });
    props.onChange && props.onChange(data);
  };

  const onSchemaChange = newSchema => {
    const result = { ...schema };
    result.schema = newSchema;
    setState({ schema: result });
    if (props.onSchemaChange) {
      setTimeout(() => {
        if (!frwRef.current) return;
        const pureSchema = frwRef.current.getValue();
        props.onSchemaChange(pureSchema);
      }, 0);
    }
  };

  const _mapping = { ...defaultMapping, ...mapping };
  const _widgets = { ...defaultWidgets, ...widgets, list };

  const rootState = {
    preview,
    mapping: _mapping,
    widgets: _widgets,
    selected,
    hovering,
  };

  const userProps = {
    templates,
    submit,
    transformFrom,
    transformTo,
    isNewVersion,
    extraButtons,
    settings,
    commonSettings,
    globalSettings,
  };

  const allProps = {
    schema,
    formData,
    onChange,
    setGlobal: setState,
    onSchemaChange,
    ...rootState, // 顶层的state
    userProps, // 用户传入的props
    frProps: _frProps, // fr顶层的props
  };

  return <FRWrapper ref={frwRef} {...allProps} />;
}

export default forwardRef(App);
