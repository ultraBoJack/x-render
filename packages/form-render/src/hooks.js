import {
  useReducer,
  useContext,
  useRef,
  useEffect,
  useState,
  createContext,
} from 'react';

export const Ctx = createContext(() => {});
export const StoreCtx = createContext({});
export const Store2Ctx = createContext({}); // 放不常用的属性

// 使用最顶层组件的 setState
export const useTools = () => {
  return useContext(Ctx);
};

// 组件最顶层传入的所有props
export const useStore = () => {
  return useContext(StoreCtx);
};

// 组件最顶层传入的所有props
export const useStore2 = () => {
  return useContext(Store2Ctx);
};

// export default logger;

export const useSet = x => useReducer((a, b) => ({ ...a, ...b }), x);

// 类似于class component 的 setState
// export const useSet = initState => {
//   let show = useRef(true);
//   const [state, setState] = useReducer((state, newState) => {
//     let action = newState;
//     if (typeof newState === 'function') {
//       action = action(state);
//     }
//     if (newState.action && newState.payload) {
//       action = newState.payload;
//       if (typeof action === 'function') {
//         action = action(state);
//       }
//     }
//     const result = { ...state, ...action };
//     // if (newState.action !== 'no-log') {
//     // 解决会展示两遍的问题，TODO: 是否真的解决了？如果有不是每次重复显示两遍的咋办？
//     if (show.current === true) {
//       console.group(newState.action || 'action'); // TODO: give it a name
//       console.log('%cState:', 'color: #9E9E9E; font-weight: 700;', state);
//       console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action);
//       console.log('%cNext:', 'color: #47B04B; font-weight: 700;', result);
//       console.groupEnd();
//       show.current = false;
//     } else {
//       show.current = true;
//     }

//     // } else {
//     // }
//     return result;
//   }, initState);
//   return [state, setState];
// };

// start: true 开始、false 暂停
export function useInterval(callback, delay, start) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  const id = useRef();
  useEffect(() => {
    if (!start) {
      return;
    }
    function tick() {
      savedCallback && savedCallback.current && savedCallback.current();
    }
    tick();
    if (delay !== null) {
      id.current = setInterval(tick, delay);
      return () => clearInterval(id.current);
    }
  }, [delay, start]);
  return () => clearInterval(id.current);
}

// 获取旧值
export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

// 显示一次
export const useShowOnce = localKey => {
  // 从 localStorage 读取 key 值
  const [show, setShow] = useState(false);
  let localStr;
  try {
    localStr = localStorage.getItem(localKey);
  } catch (error) {}
  if (!localStr) {
    setShow(true);
    localStorage.setItem(localKey, JSON.stringify(true));
  }
  return show;
};

// 弹窗控制
export const useModal = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  return [show, toggle];
};

export const useWindowState = initState => {
  const [state, setState] = useState(initState);
  return [state, setState];
};

// 本地存储
export const useStorageState = (initState = {}, searchKey = 'SAVES') => {
  // 从 localStorage 读取 search 值
  const readSearchFromStorage = () => {
    const searchStr = localStorage.getItem(searchKey);
    if (searchStr) {
      try {
        return JSON.parse(searchStr);
      } catch (error) {
        return initState;
      }
    }
    return initState;
  };
  const [data, setData] = useState(readSearchFromStorage());
  // 存储搜索值到 localStorage
  const setSearchWithStorage = search => {
    setData(search);
    localStorage.setItem(searchKey, JSON.stringify(search));
  };
  return [data, setSearchWithStorage];
};
