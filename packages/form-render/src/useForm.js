/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useMemo, useState } from 'react';
import { validateAll } from './validator';
import { useSet } from './hooks';
import { set, sortedUniqBy, merge } from 'lodash-es';
import { processData, transformDataWithBind2 } from './processData';
import { generateDataSkeleton, flattenSchema, clone } from './utils';

export const useForm = props => {
  const {
    // 为了更平滑兼容 0.x，如果外部传入状态，那么使用外部的状态
    formData: _formData,
    onChange: _onChange,
    onValidate: _onValidate,
  } = props || {};

  const [renderCount, forceRender] = useState(0);
  const didMount = useRef(false);

  const [state, setState] = useSet({
    formData: {},
    submitData: {},
    errorFields: [],
    isValidating: false, // 是否在提交状态
    outsideValidating: false, // 是否开始外部校验，没有外部校验回传的场景，一直是false
    isSubmitting: false,
    isEditing: false, // 是否在编辑状态。主要用于优化体验，用户编辑时减少不必要的运算
    allTouched: false, // 是否所有表单元素都被碰过了（一键开关，用于提交的时候，默认所有都被touch了）
    touchedKeys: [], // 碰过的key（用于submit之前，判断哪些被碰过了）
    flatten: {}, // schema 的转换结构，便于处理
  });

  const schemaRef = useRef({});
  const beforeFinishRef = useRef(() => {});
  const onMountRef = useRef();
  const localeRef = useRef('cn');
  const validateMessagesRef = useRef();
  const _data = useRef({}); // 用ref是为了破除闭包的影响
  const _flatten = useRef({}); // 用ref是为了破除闭包的影响
  const _touchedKeys = useRef([]); // 用ref是为了破除闭包的影响

  const {
    formData: innerData,
    submitData,
    errorFields = [],
    isValidating,
    outsideValidating,
    isSubmitting,
    isEditing,
    allTouched,
    touchedKeys,
    flatten,
    // statusTree, // 和formData一个结构，但是每个元素是 { $touched } 存放那些在schema里无需表达的状态, 看看是否只有touched。目前statusTree没有被使用
  } = state;

  const _errorFields = useRef();
  _errorFields.current = errorFields;

  const dataFromOutside = props && props.hasOwnProperty('formData');

  const formData = dataFromOutside ? _formData : innerData;

  // 生成一个基础结构，确保对象内的必填元素也被校验。
  // _data.current = merge(generateDataSkeleton(schemaRef.current), formData);
  _data.current = useMemo(() => {
    return merge(generateDataSkeleton(schemaRef.current), formData);
  }, [JSON.stringify(formData), JSON.stringify(schemaRef.current)]);

  _touchedKeys.current = touchedKeys;
  _flatten.current = flatten;

  // 两个兼容 0.x 的函数
  const _setData = data => {
    if (typeof _onChange === 'function') {
      _onChange(data);
    } else {
      setState({ formData: data });
    }
  };
  const _setErrors = errors => {
    if (typeof _onValidate === 'function') {
      const oldFormatErrors = errors ? errors.map(item => item.name) : [];
      _onValidate(oldFormatErrors);
    }
    setState({ errorFields: errors });
  };

  const touchKey = key => {
    if (_touchedKeys.current.indexOf(key) > -1) {
      return;
    }
    const newKeyList = [..._touchedKeys.current, key];
    setState({ touchedKeys: newKeyList });
  };

  const removeTouched = key => {
    let newTouch = _touchedKeys.current.filter(item => {
      return item.indexOf(key) === -1;
    });
    setState({ touchedKeys: newTouch });
  };

  // 为了兼容 0.x
  // useEffect(() => {
  //   // 如果是外部数据，submit没有收束，无校验
  //   if (dataFromOutside && typeof _onValidate === 'function') {
  //     setTimeout(() => {
  //       validateAll({
  //         formData: _data.current,
  //         schema: schemaRef.current,
  //         isRequired: true,
  //         touchedKeys: _touchedKeys.current,
  //         locale: localeRef.current,
  //         validateMessages: validateMessagesRef.current,
  //       }).then(res => {
  //         const oldFormatErrors = res.map(item => item.name);
  //         _onValidate(oldFormatErrors);
  //       });
  //     }, 200);
  //   }
  // }, []);

  // 这里导致第二次的渲染
  useEffect(() => {
    validateAll({
      formData: _data.current,
      schema: schemaRef.current,
      isRequired: allTouched,
      touchedKeys: _touchedKeys.current,
      locale: localeRef.current,
      validateMessages: validateMessagesRef.current,
    }).then(res => {
      _setErrors(res);
    });
  }, [JSON.stringify(_data.current), allTouched]);

  useEffect(() => {
    const flatten = flattenSchema(schemaRef.current);
    setState({ flatten });
  }, [JSON.stringify(schemaRef.current), renderCount]);

  useEffect(() => {
    if (
      didMount.current === false &&
      flatten['#'] &&
      typeof onMountRef.current === 'function'
    ) {
      onMountRef.current();
      didMount.current = true;
    }
  }, [JSON.stringify(flatten)]);

  const setEditing = isEditing => {
    setState({ isEditing });
  };

  const onItemChange = (path, value) => {
    if (typeof path !== 'string') return;
    if (path === '#') {
      _setData({ ...value });
      return;
    }
    set(_data.current, path, value);
    _setData({ ..._data.current });
  };

  // TODO: 全局的没有path, 这个函数要这么写么。。全局的，可以path = #
  // errorFields: [
  //   { name: 'a.b.c', errors: ['Please input your Password!', 'something else is wrong'] },
  // ]

  // 同步状态
  const syncStuff = ({
    schema,
    locale,
    validateMessages,
    beforeFinish,
    onMount,
  }) => {
    schemaRef.current = schema;
    localeRef.current = locale;
    validateMessagesRef.current = validateMessages;
    beforeFinishRef.current = beforeFinish;
    onMountRef.current = onMount;
    forceRender(renderCount + 1);
  };

  const setSchemaByPath = (path, newSchema) => {
    if (!_flatten.current[path]) {
      console.error(`path：'${path}' 不存在(form.setSchemaByPath)`);
      return;
    }
    const newFlatten = clone(_flatten.current);

    try {
      const _newSchema =
        typeof newSchema === 'function'
          ? newSchema(newFlatten[path].schema)
          : newSchema;
      newFlatten[path].schema = { ...newFlatten[path].schema, ..._newSchema };
      setState({ flatten: { ...newFlatten } });
    } catch (error) {
      console.error(error, 'setSchemaByPath');
    }
  };

  const getSchemaByPath = path => {
    try {
      return _flatten.current[path].schema;
    } catch (error) {
      console.error(error, 'getSchemaByPath');
      return {};
    }
  };

  // TODO: 外部校验的error要和本地的合并么？
  // TODO!: 这块要优化一下吧
  const setErrorFields = error => {
    let newErrorFields = [];
    if (Array.isArray(error)) {
      newErrorFields = [...error, ..._errorFields.current];
    } else if (error && error.name) {
      newErrorFields = [error, ..._errorFields.current];
    } else {
      console.log('error format is wrong');
    }
    newErrorFields = sortedUniqBy(newErrorFields, item => item.name);
    _setErrors(newErrorFields);
  };
  // TODO: 提取出来，重新写一份，注意要处理async

  const removeErrorField = path => {
    let newError = _errorFields.current.filter(item => {
      return item.name.indexOf(path) === -1;
    });
    _setErrors(newError);
  };

  const getValues = () => processData(_data.current, _flatten.current);

  const setValues = newFormData => {
    const newData = transformDataWithBind2(newFormData, _flatten.current);
    _setData(newData);
  };

  const submit = () => {
    setState({ isValidating: true, allTouched: true, isSubmitting: false });
    //  https://formik.org/docs/guides/form-submission
    // TODO: 更多的处理，注意处理的时候一定要是copy一份formData，否则submitData会和表单操作实时同步的。。而不是submit再变动了

    // 开始校验。如果校验写在每个renderField，也会有问题，比如table第一页以外的数据是不渲染的，所以都不会触发，而且校验还有异步问题
    return validateAll({
      formData: _data.current,
      schema: schemaRef.current,
      touchedKeys: [],
      isRequired: true,
      locale: localeRef.current,
      validateMessages: validateMessagesRef.current,
    })
      .then(errors => {
        // 如果有错误，也不停止校验和提交，在onFinish里让用户自己搞
        if (errors && errors.length > 0) {
          console.log('submit:', _data.current, errors);
          setState({
            errorFields: errors,
          });
        }
        if (typeof beforeFinishRef.current === 'function') {
          return Promise.resolve(processData(_data.current, flatten)).then(res => {
            setState({
              isValidating: true,
              isSubmitting: false,
              outsideValidating: true,
              submitData: res,
            });
            return errors;
          });
        }
        return Promise.resolve(processData(_data.current, flatten)).then(res => {
          setState({
            isValidating: false,
            isSubmitting: true,
            submitData: res,
          });
          return errors;
        });
      })
      .catch(err => {
        // 不应该走到这边的
        console.log('submit error:', err);
        return err;
      });
  };

  const resetFields = () => {
    setState({
      formData: {},
      submitData: {},
      errors: [],
      touchedKeys: [],
      allTouched: false,
    });
  };

  // const setValue = (id, value, dataIndex) => {
  //   let path = id;
  //   if (dataIndex && Array.isArray(dataIndex)) {
  //     path = getDataPath(id, dataIndex);
  //   }
  //   onItemChange(path, value);
  // };

  const endValidating = () =>
    setState({
      isValidating: false,
      outsideValidating: false,
      isSubmitting: true,
    });

  const endSubmitting = () =>
    setState({
      isSubmitting: false,
      isValidating: false,
      outsideValidating: false,
    });

  const form = {
    // state
    formData: _data.current,
    schema: schemaRef.current,
    flatten,
    touchedKeys: _touchedKeys.current,
    allTouched,
    // methods
    touchKey,
    removeTouched,
    onItemChange,
    setValueByPath: onItemChange, // 单个
    getSchemaByPath,
    setSchemaByPath,
    setValues,
    getValues,
    resetFields,
    submit,
    submitData,
    errorFields,
    isValidating,
    outsideValidating,
    isSubmitting,
    endValidating,
    endSubmitting,
    setErrorFields,
    removeErrorField,
    isEditing,
    setEditing,
    syncStuff,
  };

  return form;
};
