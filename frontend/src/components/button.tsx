import React from 'react';
import './Button.scss';

interface ButtonProps {
  onClick?: () => void,
  className?: string,
  children?: React.ReactNode,
  icon?: string,
  theme?: 'primary' | 'secondary' | 'danger',
  size?: 'small' | 'medium' | 'large',
  style?: { backgroundColor: string }
}

const Button: React.FC<ButtonProps> = ({
                                         onClick,
                                         className = '',
                                         children,
                                         icon,
                                         theme = 'primary',
                                         size = 'medium',
                                         style
                                       }) => {
  return (
    <button className={`button ${theme} ${size} ${className}`}
            onClick={onClick}>
      {icon && <i className={`la ${icon}`}></i>}
      {children}
    </button>
  );
};

export default Button;
