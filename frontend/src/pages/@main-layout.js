import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
            to: route.path,
            title: route.path.replace('/', '').replace('-', ' ').toUpperCase(),
            icon: null // Add icon if available
        }));
    };
    return (_jsxs("div", { className: "main-layout", children: [_jsx(Header, { title: "My App Header", children: _jsxs("div", { className: "header-extra", children: ["Project-ai-initializer", _jsx(Button, { onClick: () => navigate('/'), className: "theme-toggle-button", children: _jsx("i", { className: "la la-home" }) })] }) }), _jsxs("div", { className: "layout-body", children: [_jsx(SideNavigation, { position: "left", children: _jsx("nav", { children: createMenuItems().map(({ to, title, icon }) => (_jsxs("div", { onClick: () => navigate(to), className: "side-nav-item", children: [icon ? _jsx("img", { src: icon, alt: "", className: "icon" }) : null, title] }, to))) }) }), _jsx(VerticalContainer, { className: "content-container", children: _jsx(Suspense, { children: _jsx(Outlet, {}) }) }), _jsx(SideNavigation, { position: "right" })] }), _jsx(Footer, { title: "My App Footer", children: _jsx("div", { className: "footer-extra", children: "\u00A9" }) })] }));
}
//# sourceMappingURL=@main-layout.js.map