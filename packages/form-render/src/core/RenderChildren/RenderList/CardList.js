// card列表-默认

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Core from '../../index';
import { Button, Space, Popconfirm } from 'antd';
// import ArrowDown from '../../../components/ArrowDown';
import { DeleteOutlined, CopyOutlined } from '@ant-design/icons';

const CardList = ({
  displayList = [],
  listData,
  changeList,
  schema,
  deleteItem,
  copyItem,
  addItem,
  displayType,
  getFieldsProps,
}) => {
  const { props = {}, itemProps } = schema;
  return (
    <>
      <div className="fr-card-list">
        {displayList.map((item, idx) => {
          const fieldsProps = getFieldsProps(idx);
          fieldsProps.displayType = displayType;
          return (
            <div
              className={`fr-card-item ${
                displayType === 'row' ? 'fr-card-item-row' : ''
              }`}
              key={idx}
            >
              {/* 列表项序号 */}
              <div className="fr-card-index">{idx + 1}</div>

              {/* 实际渲染组件 */}
              <Core {...fieldsProps} />

              {/* 右侧工具栏 */}
              <Space direction="horizontal" className="fr-card-toolbar">
                {!props.hideDelete && (
                  <Popconfirm
                    title="确定删除?"
                    onConfirm={() => deleteItem(idx)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <DeleteOutlined style={{ fontSize: 17, marginLeft: 8 }} />
                  </Popconfirm>
                )}
                {!props.hideAdd && (
                  <CopyOutlined
                    style={{ fontSize: 16, marginLeft: 8 }}
                    onClick={() => copyItem(idx)}
                  />
                )}
              </Space>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: displayList.length > 0 ? 0 : 8 }}>
        {!props.hideAdd && (
          <Button type="dashed" onClick={addItem}>
            新增一条
          </Button>
        )}
        {Array.isArray(props.buttons)
          ? props.buttons.map((item, idx) => {
              const { callback, text, html } = item;
              let onClick = () => {
                console.log({
                  value: listData,
                  onChange: changeList,
                  schema,
                });
              };
              if (typeof window[callback] === 'function') {
                onClick = () => {
                  window[callback]({
                    value: listData,
                    onChange: changeList,
                    schema,
                  });
                };
              }
              return (
                <Button
                  key={idx.toString()}
                  style={{ marginLeft: 8 }}
                  type="dashed"
                  onClick={onClick}
                >
                  <span dangerouslySetInnerHTML={{ __html: html || text }} />
                </Button>
              );
            })
          : null}
      </div>
    </>
  );
};

export default CardList;
