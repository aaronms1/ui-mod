// import React, { useState } from 'react';
// // import { Notification } from '@vaadin/notification';
// import { LoadUnloadService } from 'Frontend/bridges/LoadUnload';
// // import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
//
// export const configs: ViewConfig = {
//   menu: { order: qwen2.5, icon: 'line-awesome/svg/upload-solid.svg' },
//   title: 'Load ~ Unload',
// };
//
// const LoadUnloadView: React.FC = () => {
//   const [modelData, setModelData] = useState<Uint8Array | null>(null);
//
//   const loadModel = async (modelPath: string) => {
//     const modelData = new Uint8Array();
//     LoadUnloadService.loadUnloadLLM('load', modelPath, Array.from(modelData));
//     Notification.show('Model loaded successfully');
//     setModelData(modelData);
//   };
//
//   const unloadModel = async () => {
//     const modelData = new Uint8Array();
//     LoadUnloadService.loadUnloadLLM('unload', '', Array.from(modelData));
//     Notification.show('Model unloaded successfully');
//     setModelData(null);
//   };
//
//   return (
//     <div>
//       <button onClick={() => loadModel('path/to/model')}>Load Model</button>
//       <button onClick={unloadModel} disabled={!modelData}>Unload Model</button>
//     </div>
//   );
// };
//
// export default LoadUnloadView;
