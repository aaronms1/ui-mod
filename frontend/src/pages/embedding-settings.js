"use strict";
// import React, { useState } from 'react';
// import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
// // import { Button, Dialog, Details, VerticalLayout, Notification } from '@vaadin/react-components';
// // @ts-ignore
// import { EmbeddingService } from 'Frontend/generated/endpoints';
// import { useNavigate } from 'react-router';
//
// export const config: ViewConfig = {
//   menu: { order: 11, icon: 'line-awesome/svg/layer-group-solid.svg' }, title: 'Embedding Settings' };
//
// const anchorStyle = {
//   textDecoration: 'none',
//   color: 'var(--lumo-primary-text-color)',
// };
//
// const EmbeddingSettingsView: React.FC = () => {
//   const [embeddings, setEmbeddings] = useState<string[]>([]);
//   const [conversations, setConversations] = useState<string[]>([]);
//   const [dialogOpened, setDialogOpened] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState('');
//   const [dialogAction, setDialogAction] = useState<() => void>(() => {});
//   const navigate = useNavigate();
//
//   const openDialog = (message: string, action: () => void) => {
//     setDialogMessage(message);
//     setDialogAction(() => action);
//     setDialogOpened(true);
//   };
//
//   const handleDialogClose = () => {
//     setDialogOpened(false);
//   };
//
//   const word2VecEmbedding = async () => {
//     const response = await EmbeddingService.processEmbedding('word2vec', '');
//     Notification.show('Embedding created successfully' + response);
//     setDialogOpened(false);
//   };
//
//   const gloveEmbedding = async () => {
//     const response = await EmbeddingService.processEmbedding('glove', '');
//     Notification.show('Embedding created successfully' + response);
//     setDialogOpened(false);
//   };
//
//   const fastTextEmbedding = async () => {
//     const response = await EmbeddingService.processEmbedding('fasttext', '');
//     Notification.show('Embedding created successfully' + response);
//     setDialogOpened(false);
//   };
//
//   const bertEmbeddings = async () => {
//     const response = await EmbeddingService.processEmbedding('bert', '');
//     Notification.show('Embedding created successfully' + response);
//     setDialogOpened(false);
//   };
//
//   const gptEmbeddings = async () => {
//     const response = await EmbeddingService.processEmbedding('gpt', '');
//     Notification.show('Embedding created successfully' + response);
//     setDialogOpened(false);
//   };
//
//   const transformEmbedding = async () => {
//     const response = await EmbeddingService.processEmbedding('transform', '');
//     Notification.show('Embedding transformed successfully' + response);
//     setDialogOpened(false);
//   };
//
//   return (
//     <>
//       <section className="flex p-m gap-m items-end">
//         <Button onClick={() => openDialog('Are you sure you want to create a new embedding model?', word2VecEmbedding)}
//                 style={{ backgroundColor: 'green' }}>Create Word2Vec</Button>
//         <Button onClick={() => openDialog('Are you sure you want to create a new embedding model?', gloveEmbedding)}
//                 style={{ backgroundColor: 'blue' }}>Create GloVe</Button>
//         <Button onClick={() => openDialog('Are you sure you want to create a new embedding model?', fastTextEmbedding)}
//                 style={{ backgroundColor: 'yellow' }}>Create FastText</Button>
//         <Button onClick={() => openDialog('Are you sure you want to create a new embedding model?', bertEmbeddings)}
//                 style={{ backgroundColor: 'purple' }}>Create BERT</Button>
//         <Button onClick={() => openDialog('Are you sure you want to create a new embedding model?', gptEmbeddings)}
//                 style={{ backgroundColor: 'orange' }}>Create GPT</Button>
//         <Button onClick={() => openDialog('Are you sure you want to transform this embedding?', transformEmbedding)}
//                 style={{ backgroundColor: 'red' }}>Transform</Button>
//       </section>
//       <ul>
//         {embeddings.map((embedding) => (
//           <li key={embedding}>
//             {embedding}
//           </li>
//         ))}
//       </ul>
//       <Details summary="Conversation Histories" opened>
//         <VerticalLayout>
//           {conversations.map((conversation, index) => (
//             <a key={index} href="#" style={anchorStyle}>
//               {conversation}
//             </a>
//           ))}
//         </VerticalLayout>
//       </Details>
//       <Dialog opened={dialogOpened} onOpenedChanged={(e) => setDialogOpened(e.detail.value)}>
//         <div>
//           <p>{dialogMessage}</p>
//           <div className="flex gap-s">
//             <Button theme="primary" onClick={() => { dialogAction(); handleDialogClose(); }}>
//               Yes
//             </Button>
//             <Button theme="secondary" onClick={handleDialogClose}>
//               No
//             </Button>
//           </div>
//         </div>
//       </Dialog>
//     </>
//   );
// };
//
// export default EmbeddingSettingsView;
//# sourceMappingURL=embedding-settings.js.map