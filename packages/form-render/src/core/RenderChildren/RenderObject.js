// 渲染object大对象组件，主要是遍历children进行递归渲染

import React from 'react';
import Core from '../index';

const RenderObject = ({
  children = [],
  dataIndex = [],
  displayType,
  hideTitle,
}) => {
  return (
    <>
      {children.map((child, i) => {
        const FRProps = {
          displayType,
          id: child,
          dataIndex,
          hideTitle,
        };
        return <Core key={i.toString()} {...FRProps} />;
      })}
    </>
  );
};

export default RenderObject;
