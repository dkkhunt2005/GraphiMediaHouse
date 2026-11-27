import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { MessageSquare } from 'lucide-react'
import { CustomCursor } from '../ui/CustomCursor'
import { MobileTouchFeedback } from '../ui/MobileTouchFeedback'
import { Magnetic } from '../ui/Magnetic'
import { StudioIntroLoader } from '../ui/StudioIntroLoader'

export const Layout: React.FC = () => {
  const location = useLocation()

  // Scroll instantly to top on route change to ensure newly opened pages start flush at the top
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-charcoal selection:bg-brand-gold selection:text-black">
      {/* Theatrical Architectural Intro Preloader */}
      <StudioIntroLoader />

      {/* Precision Architectural Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Architectural Precision Touch Feedback for Mobile */}
      <MobileTouchFeedback />

      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      {/* Floating WhatsApp Quick Inquire Button with Magnetic Feel */}
      <div className="fixed bottom-6 right-6 z-40">
        <Magnetic strength={0.3}>
          <a
            href="https://wa.me/919978866210?text=Hello%20Graphi%20Media%20House,%20I'd%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct WhatsApp Message to Graphi Media House"
            className="bg-black text-white hover:text-brand-gold border border-neutral-700 hover:border-brand-gold p-3.5 shadow-2xl transition-all duration-200 group flex items-center space-x-2 focus-visible:ring-2 focus-visible:ring-brand-gold block"
          >
            <MessageSquare className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform duration-200" />
            <span className="hidden sm:inline text-xs font-condensed font-bold tracking-editorial-wider uppercase pr-1">
              WhatsApp Us
            </span>
          </a>
        </Magnetic>
      </div>
    </div>
  )
}
