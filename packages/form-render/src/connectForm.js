import React from 'react';
import { useForm } from './useForm';

// 用于传统class的方式使用
export const connectForm = Component => {
  return props => {
    const form = useForm();
    return <Component {...props} form={form} />;
  };
};
