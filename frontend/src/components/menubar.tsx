import React from 'react';
import MenuItem from './menu-item';

/**
 * <h1>{@link Menubar}</h1> component
 * @constructor 0-args constructor
 */
const Menubar: React.FC = () => {
  const items = [
    { icon: 'path/to/eye-icon.svg', text: 'View', isChild: false },
    { icon: 'path/to/edit-icon.svg', text: 'Edit', isChild: false },
    {
      icon: 'path/to/share-icon.svg',
      text: 'Share',
      isChild: false,
      children: [
        {
          icon: 'path/to/share-icon.svg',
          text: 'On social media',
          isChild: true,
          children: [
            { icon: 'path/to/facebook-icon.svg', text: 'Facebook', isChild: true },
            { icon: 'path/to/twitter-icon.svg', text: 'Twitter', isChild: true },
            { icon: 'path/to/instagram-icon.svg', text: 'Instagram', isChild: true },
          ],
        },
        { icon: 'path/to/envelope-icon.svg', text: 'By email', isChild: true },
        { icon: 'path/to/link-icon.svg', text: 'Get link', isChild: true },
      ],
    },
    {
      icon: 'path/to/folder-icon.svg',
      text: 'Move',
      isChild: false,
      children: [
        { icon: 'path/to/folder-open-icon.svg', text: 'To folder', isChild: true },
        { icon: 'path/to/trash-icon.svg', text: 'To trash', isChild: true },
      ],
    },
    { icon: 'path/to/copy-icon.svg', text: 'Duplicate', isChild: false },
  ];

  return (
    <div className="menu-bar">
      {items.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Menubar;