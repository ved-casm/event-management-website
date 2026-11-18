import type { Metadata } from 'next';
import './fonts.css';
import './globals.css';
import { SiteShell } from './site-shell';
export const metadata: Metadata = { title: 'Sanskriti | Events & Planners', description: 'Creating timeless memories with a touch of tradition.' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { return <html lang="en"><head><link rel="preload" href="/fonts/font-2.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/font-5.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/font-9.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body><SiteShell>{children}</SiteShell></body></html> }
