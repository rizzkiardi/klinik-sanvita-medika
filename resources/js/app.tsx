import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// import route from 'ziggy-js';
import { initializeTheme } from './hooks/use-appearance';

// window.route = route;
const appName = import.meta.env.VITE_APP_NAME || 'Klinik Sanvita Medika';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#AACBF7',
    },
});

// This will set light / dark mode on load...
initializeTheme();
