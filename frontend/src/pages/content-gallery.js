"use strict";
// import React from 'react';
// // import { VerticalLayout, HorizontalLayout } from '@vaadin/react-components';
// // import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
//
// export const config: ViewConfig = {
//   menu: { order: 3, icon: 'line-awesome/svg/images-solid.svg' }, title: 'Gallery' };
//
// interface MediaItem {
//   type: 'image' | 'video';
//   src: string;
//   alt?: string;
// }
//
// interface MediaGalleryProps {
//   items: MediaItem[];
// }
//
// const ContentGalleryView: React.FC<MediaGalleryProps> = ({ items }) => {
//   return (
//     <VerticalLayout>
//       {items.map((item, index) => (
//         <HorizontalLayout key={index} style={{ marginBottom: '10px' }}>
//           {item.type === 'image' ? (
//             <img src={item.src} alt={item.alt || 'Image'} style={{ width: '100%' }} />
//           ) : (
//             <video src={item.src} controls style={{ width: '100%' }} />
//           )}
//         </HorizontalLayout>
//       ))}
//     </VerticalLayout>
//   );
// };
//
// const mediaItems: MediaItem[] = [
//   { type: 'image', src: 'path/to/pictures.jpg', alt: 'Pictures' },
//   { type: 'video', src: 'path/to/videos.mp4', alt: 'Videos' },
//   { type: 'image', src: 'path/to/trash.jpg', alt: 'Trash' },
//   { type: 'image', src: 'path/to/projects.jpg', alt: 'Projects' },
// ];
// export default ContentGalleryView;
//# sourceMappingURL=content-gallery.js.map