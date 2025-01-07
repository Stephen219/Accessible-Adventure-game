import './globals.css';
import { AuthProvider } from '@/utils/AuthContext';
import Header from '@/components/Header';

export const metadata = {
  title: 'Adventure Game',
  description: 'A text-based adventure game',
  icons: {
    icon: '/favicon.ico',
    apple: [
      { url: 'ios_icons/apple-touch-icon-iphone-60x60.png', sizes: '60x60' },
      { url: 'ios_icons/apple-touch-icon-ipad-76x76.png', sizes: '76x76' },
      { url: 'ios_icons/apple-touch-icon-iphone-retina-120x120.png', sizes: '120x120' },
      { url: 'ios_icons/apple-touch-icon-ipad-retina-152x152.png', sizes: '152x152' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
      </head>
      <body className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
