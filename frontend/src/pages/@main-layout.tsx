import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header, Footer, SideNavigation, VerticalContainer, Button } from '../components/@index';
import { router } from '../routes';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [documentTitle, setDocumentTitle] = useState('');

  useEffect(() => {
    const currentTitle = document.title;
    if (currentTitle) {
      setDocumentTitle(currentTitle);
    }
  }, [location]);

  const createMenuItems = () => {
    return router.routes
      .filter(route => route.path) // Ensure route.path is defined
      .map(route => ({
        to: route.path!,
        title: route.path!.replace('/', '').replace('-', ' ').toUpperCase(),
        icon: null // Add icon if available
      }));
  };

  return (
    <div className="main-layout">
      <Header title="My App Header">
        <div className="header-extra">
          Project-ai-initializer
          <Button onClick={() => navigate('/')} className="theme-toggle-button">
            <i className="la la-home"></i>
          </Button>
        </div>
      </Header>

      <div className="layout-body">
        <SideNavigation position="left">
          <nav>
            {createMenuItems().map(({ to, title, icon }) => (
              <div key={to} onClick={() => navigate(to!)} className="side-nav-item">
                {icon ? <img src={icon} alt="" className="icon" /> : null}
                {title}
              </div>
            ))}
          </nav>
        </SideNavigation>

        <VerticalContainer className="content-container">
          <Suspense>
            <Outlet />
          </Suspense>
        </VerticalContainer>

        <SideNavigation position="right">
          {/* Additional right side navigation items can be added here */}
        </SideNavigation>
      </div>

      <Footer title="My App Footer">
        <div className="footer-extra">©</div>
      </Footer>
    </div>
  );
}
