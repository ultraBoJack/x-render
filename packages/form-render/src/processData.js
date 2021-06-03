import {
  removeEmptyItemFromList,
  cleanEmpty,
  removeHiddenFromResult,
} from './utils';
import { unset, get, set } from 'lodash-es';
import { isObject, clone } from './utils';
// 提交前需要先处理formData的逻辑
// 主要是完成数据的转换以及特殊值的过滤
export const processData = (data, flatten) => {
  // 1. bind 的处理
  let _data = transformDataWithBind(data, flatten);

  // 2. 去掉list里面所有的空值
  _data = removeEmptyItemFromList(_data);

  // 3. 去掉 hidden = true 的元素
  // _data = removeHiddenFromResult(_data, flatten);

  // 4. 去掉所有的 undefined
  _data = cleanEmpty(_data);

  return _data;
};

// 此处主要是将最终输出的formData中有在schema中bind字段时转换用，将schema的字段转为bind的字段名，用于提交后端数据
// 数据转换和绑定，主要是针对前后端字段不一致，需要转换时处理
// 见文档 “通过 bind 字段，我们允许数据的双向绑定，数据展示和真实提交的数据可以根据开发需求不同（例如从服务端接口拿到不规则数据时，也能直接使用）”
export const transformDataWithBind = (data, flatten) => {
  let _data = clone(data);
  const unbindKeys = []; // 取消绑定
  const bindKeys = []; // 单个绑定
  const bindArrKeys = []; // 多个绑定

  // 是否多绑定
  const isMultiBind = bind =>
    Array.isArray(bind) && bind.every(item => typeof item === 'string');

  Object.keys(flatten).forEach(key => {
    const bind =
      flatten[key] && flatten[key].schema && flatten[key].schema.bind;
    const _key = key.replace('[]', '');
    if (bind === false) {
      unbindKeys.push(_key);
    } else if (typeof bind === 'string') {
      bindKeys.push({ key: _key, bind });
    } else if (isMultiBind(bind)) {
      bindArrKeys.push({ key: _key, bind });
    }
  });

  // 处理数据的双向绑定，比如在schema中，字段名为 a , 但实际接口中字段为 b , 此时需要 bind 进行转换
  const handleBindData = formData => {
    // 删除需要解绑的数据
    unbindKeys.forEach(key => {
      unset(formData, key); // TODO: 光remove了一个key，如果遇到remove了那个key上层的object为空了，object是不是也要去掉。。。不过感觉是伪需求
    });
    // 遍历绑定单个数据项
    bindKeys.forEach(item => {
      const { key, bind } = item;
      let temp = get(formData, key);
      // 如果已经有值了，要和原来的值合并，而不是覆盖
      const oldVal = get(formData, bind);
      if (isObject(oldVal)) {
        temp = { ...oldVal, ...temp };
      }
      set(formData, bind, temp);
      unset(formData, key);
    });
    // 遍历绑定多个数据项
    // 接口数据与展示经常会不符，例如 form 的交互是日期范围组件，服务端传的值是 startDate，endDate 两个字段。此时使用 bind 字段
    bindArrKeys.forEach(item => {
      const { key, bind } = item;
      const temp = get(formData, key);
      if (Array.isArray(temp)) {
        temp.forEach((t, i) => {
          if (bind[i]) {
            set(formData, bind[i], t);
          }
        });
      }
      unset(formData, key);
    });
  };
  handleBindData(_data);
  return _data;
};

// 此处理主要是在接收外部formData后，要将bind的属性转换为schema自身的属性
// 反向，外部赋值formData，bind的字段要转换后赋值给formData
// 思路是一个个bind的字段反向转换 dataPath <=> bindPath
export const transformDataWithBind2 = (data, flatten) => {
  let _data = clone(data);

  const bindKeys = [];
  const bindArrKeys = [];

  const isMultiBind = bind =>
    Array.isArray(bind) && bind.every(item => typeof item === 'string');

  Object.keys(flatten).forEach(key => {
    const bind =
      flatten[key] && flatten[key].schema && flatten[key].schema.bind;
    const _key = key.replace('[]', '');
    if (typeof bind === 'string') {
      bindKeys.push({ key: _key, bind });
    } else if (isMultiBind(bind)) {
      bindArrKeys.push({ key: _key, bind });
    }
  });

  const handleBindData2 = newData => {
    bindKeys.forEach(item => {
      const { key, bind } = item;
      let temp = get(newData, bind);
      // 如果已经有值了，要和原来的值合并，而不是覆盖
      const oldVal = get(newData, key);
      if (isObject(oldVal)) {
        temp = { ...oldVal, ...temp };
      }
      set(newData, key, temp);
      unset(newData, bind);
    });
    bindArrKeys.forEach(item => {
      const { key, bind } = item;
      const temp = [];
      bind.forEach(b => {
        temp.push(get(newData, b));
        unset(newData, b);
      });
      set(newData, key, temp);
    });
  };
  handleBindData2(_data);
  return _data;
};
