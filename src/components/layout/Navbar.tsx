'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/context/AuthContext';
import { Sparkles, MessageSquare, User, Menu, X, ArrowUpRight, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'AI Planner', href: '/ai-planner', icon: Sparkles, badge: 'Groq' },
    { name: 'Live Studio', href: '/collaboration', icon: MessageSquare, badge: 'Live' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-subtle py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-stone-200/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-9 h-9 border border-stone-900 bg-stone-900 text-white flex items-center justify-center font-bold text-base tracking-tighter group-hover:bg-amber-700 group-hover:border-amber-700 transition-colors rounded-sm shadow-sm">
              G3
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-stone-900 leading-none">
                G3 ARCHITECTS
              </span>
              <span className="text-[9px] tracking-widest text-stone-400 font-mono uppercase mt-1">
                Studio & Research
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-all relative flex items-center gap-1.5 rounded-md ${
                    isActive
                      ? 'text-stone-950 font-bold bg-stone-100'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-amber-700" />}
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-100/90 text-amber-900 border border-amber-300 font-bold leading-tight">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Area */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-200 hover:border-stone-300 bg-stone-50 transition-colors text-stone-800 text-xs font-medium"
                >
                  <div className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-lg shadow-elevated py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-[10px] font-mono text-stone-400 uppercase">Signed in as</p>
                      <p className="text-xs font-bold text-stone-900 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-stone-500" />
                      Client Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                    >
                      <User className="w-3.5 h-3.5 text-stone-500" />
                      Account Settings
                    </Link>
                    <div className="border-t border-stone-100 my-1" />
                    <button
                      onClick={() => {
                        setProfileDropdown(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/signin"
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}

            <Link
              href="/contact"
              className="px-4 py-2 text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white rounded transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800 hover:text-stone-950 rounded-md hover:bg-stone-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white/98 backdrop-blur-md px-4 pt-4 pb-6 space-y-4 shadow-elevated animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-md text-sm font-semibold flex items-center justify-between transition-colors ${
                    isActive ? 'bg-stone-100 text-stone-950 font-bold' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {Icon && <Icon className="w-4 h-4 text-amber-700" />}
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-stone-200 pt-4 flex flex-col gap-2.5">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 text-center rounded bg-stone-100 text-stone-900 font-bold text-xs"
                >
                  Client Dashboard ({user.name})
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2 px-4 text-center rounded text-red-600 font-bold text-xs hover:bg-red-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded border border-stone-300 text-stone-800 font-bold text-xs"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded bg-stone-900 text-white font-bold text-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center rounded bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs transition-colors shadow-sm"
            >
              Book Studio Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
