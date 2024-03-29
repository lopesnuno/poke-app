import type { LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import stylesheet from '~/styles/tailwind.css';
import React from 'react';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet }
];

export default function App() {

  // Support for cypress command that waits for HTML to be hydrated
  React.useEffect(() => (
      document.getElementsByTagName('body').item(0) as HTMLBodyElement
    ).setAttribute('data-cy', 'ready'),
    []
  );

  return (
    <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <Meta />
      <Links />
    </head>
    <body>
    <Outlet />
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
    </body>
    </html>
  );
}
