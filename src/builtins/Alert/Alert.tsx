import { AlertProps, Alert as AntdAlert } from 'antd';
import { FC, ReactNode } from 'react';

const Alert: FC<AlertProps & { children?: ReactNode }> = (props) => {
  const { children, ...restProps } = props;
  return (
    <AntdAlert
      style={{ margin: '12px 0', padding: '10px 40px' }}
      message={children}
      {...restProps}
    />
  );
};

export default Alert;
