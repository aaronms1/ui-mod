import { createBrowserRouter } from 'react-router-dom';
import ChatClientView from './pages/chat-client';
import CloneModelView from './pages/clone-model';
// import ContentGalleryView from './pages/content-gallery';
import DirFileView from './pages/directories-files';
// import EmbeddingSettingsView from './pages/embedding-settings';
import Grid from './pages/grid';
// import HelloWorldView from './pages/hello-world';
import DestroyModelView from './pages/model-destroy';
import MergeModelView from './pages/model-merge';
import ModelSettingsView from './pages/model-settings';
import SearchModelsView from './pages/search-models';
import ManageServersView from './pages/servers';
import SnapshotsView from './pages/snapshots';
import SystemSettingsView from './pages/system-settings';

export const router = createBrowserRouter([
  {
    path: '/chat-client',

    element: <ChatClientView />,
  },
  {
    path: '/clone-model',
    element: <CloneModelView />,
  },
  // {
  //   path: '/content-gallery',
  //   element: <ContentGalleryView items={[]} />,
  // },
  {
    path: '/directories-files',
    element: <DirFileView />
  },
  // {
  //   path: '/embed-settings',
  //   element: <EmbeddingSettingsView />
  // },
  {
    path: '/grid',
    element: <Grid columns={0} gap={''} />
  },
  // {
  //   path: '/hello-world',
  //   element: <HelloWorldView />,
  // },
  {
    path: '/model-destroy',
    element: <DestroyModelView />,
  },
  {
    path: '/model-merge',
    element: <MergeModelView />,
  },
  {
    path: '/model-settings',
    element: <ModelSettingsView />,
  },
  {
    path: '/search-models',
    element: <SearchModelsView searchQuery={''} onModelsFetched={function(): void {
        throw new Error('Function not implemented.');
    } } onLoading={function(): void {
        throw new Error('Function not implemented.');
    } } />,
  },
  {
    path: '/servers',
    element: <ManageServersView />,
  },
  {
    path: '/snapshots',
    element: <SnapshotsView />,
  },
  {
    path: '/system-settings',
    element: <SystemSettingsView />
  }
]);
