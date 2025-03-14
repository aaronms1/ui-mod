import React from 'react';

interface MenuItemProps {
  icon: string;
  text: string;
  isChild?: boolean;
  children?: MenuItemProps[];
}

/**
 * <h1>{@link MenuItem}</h1> component
 * @param icon - icon setting
 * @param text - text setting
 * @param isChild - is child setting
 * @param children - children setting
 * @constructor - React component
 */
const MenuItem: React.FC<MenuItemProps> = ({ icon, text, isChild = false, children }) => {
  const iconStyle: React.CSSProperties = {
    width: isChild ? 'var(--icon-size-s)' : '',
    height: isChild ? 'var(--icon-size-s)' : '',
    marginRight: isChild ? 'var(--space-s)' : '',
  };

  return (
    <div className={`menu-item ${isChild ? 'child' : ''}`}>
      <img src={icon} alt={text} style={iconStyle} />
      {text}
      {children && (
        <div className="submenu">
          {children.map((child, index) => (
            <MenuItem key={index} {...child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;