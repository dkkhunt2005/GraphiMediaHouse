import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-neutral-800">
      {/* Upper Brand Statement & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-neutral-900">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="inline-block" aria-label="Graphi Media House">
              <img
                src="/assets/logo_original_black.png"
                alt="Graphi Media House"
                className="h-10 lg:h-12 w-auto object-contain"
                width="220"
                height="70"
              />
            </Link>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-md font-sans">
              An architecture-led creative studio redefining how spaces are documented, experienced, and remembered through architectural photography, branding, films, and thoughtful visual storytelling.
            </p>

            <div className="pt-2 text-xs font-condensed tracking-editorial-wider text-brand-gold uppercase">
              Surat, Gujarat, India &bull; Global Engagements
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-neutral-400">
              NAVIGATION
            </h4>
            <ul className="space-y-3 font-condensed text-sm tracking-editorial-wide">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-brand-gold transition-colors">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-brand-gold transition-colors">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-brand-gold transition-colors">
                  SERVICES
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-neutral-300 hover:text-brand-gold transition-colors">
                  WORK & CASE STUDIES
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-brand-gold transition-colors">
                  CONTACT & INQUIRIES
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-neutral-600 hover:text-neutral-400 text-xs transition-colors">
                  STUDIO PORTAL
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Studio Info */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-neutral-400">
              CONNECT & INQUIRE
            </h4>
            
            <div className="space-y-3 text-sm text-neutral-300 font-sans">
              <a
                href="mailto:graphimediahouse@gmail.com"
                className="flex items-center space-x-3 group hover:text-brand-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span className="font-mono text-xs">graphimediahouse@gmail.com</span>
              </a>

              <a
                href="tel:+919978866210"
                className="flex items-center space-x-3 group hover:text-brand-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span className="font-mono text-xs">+91 99788 66210</span>
              </a>

              <a
                href="https://wa.me/919978866210?text=Hello%20Graphi%20Media%20House,%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-condensed font-bold uppercase tracking-editorial-wider text-neutral-300 hover:text-brand-gold pt-1"
              >
                <span>DIRECT WHATSAPP CONVERSATION</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold" />
              </a>

              <div className="flex items-start space-x-3 pt-2 text-neutral-400 text-xs">
                <MapPin className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                <span>Surat, Gujarat, India</span>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 flex items-center space-x-6 text-xs font-condensed font-semibold tracking-editorial-wider">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-brand-gold transition-colors flex items-center space-x-1"
              >
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-600" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-brand-gold transition-colors flex items-center space-x-1"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Lower Banner: PDF Footer Strip Replication */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 font-sans gap-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4">
            <span className="font-condensed font-semibold text-neutral-400 tracking-editorial-wide">
              GRAPHI MEDIA HOUSE &copy; {new Date().getFullYear()}
            </span>
            <span className="text-neutral-700 hidden sm:inline">|</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center justify-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-neutral-800">&bull;</span>
            <Link to="/terms-and-conditions" className="hover:text-neutral-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
