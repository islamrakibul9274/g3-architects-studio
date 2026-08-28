'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/context/AuthContext';
import { getPusherClient } from '@/lib/pusher';
import { IChatMessage } from '@/types';
import { Send, MessageSquare, Shield, User, Sparkles, Compass, Paperclip, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export const LiveStudioChat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [senderName, setSenderName] = useState('');
  const [sending, setSending] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<number>(4);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const roomId = 'general-studio';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initial fetch of messages
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/pusher/messages?roomId=${roomId}`);
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        } else {
          // Default initial welcome messages
          setMessages([
            {
              id: 'welcome_1',
              roomId: 'general-studio',
              senderId: 'usr_director_g3',
              senderName: 'Elena Vance, FAIA',
              senderRole: 'architect',
              senderAvatar: '/images/team1.png',
              message:
                'Welcome to the G3 Live Collaboration Studio. Our principals and structural engineers are online to review site topography, blueprint revisions, and sustainable material choices.',
              timestamp: new Date(Date.now() - 3600000).toISOString(),
            },
            {
              id: 'welcome_2',
              roomId: 'general-studio',
              senderId: 'usr_julian',
              senderName: 'Julian Sterling, PE',
              senderRole: 'architect',
              senderAvatar: '/images/team2.png',
              message:
                'If you have specific plot dimensions or CAD files, paste your notes here or schedule a 1-on-1 private consultation.',
              timestamp: new Date(Date.now() - 1800000).toISOString(),
            },
          ]);
        }
      } catch {}
    };

    fetchHistory();
  }, [roomId]);

  // Subscribe to Pusher channel
  useEffect(() => {
    const pusher = getPusherClient();
    if (!pusher) return;

    const channel = pusher.subscribe(`chat-${roomId}`);

    channel.bind('new-message', (data: IChatMessage) => {
      setMessages((prev) => {
        // avoid duplicate by id
        if (prev.some((m) => m.id === data.id)) return prev;
        return [...prev, data];
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || sending) return;

    setSending(true);
    const content = inputValue.trim();
    setInputValue('');

    try {
      await fetch('/api/pusher/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          message: content,
          senderName: user ? user.name : senderName || 'Guest Visitor',
          senderRole: user ? user.role : 'client',
        }),
      });
    } catch (err) {
      console.error('Failed to dispatch message:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-900">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>REAL-TIME PUSHER WEBSOCKET CHANNEL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-2">
            Live Architectural Consultation Studio
          </h1>
          <p className="text-stone-600 text-sm max-w-xl mt-1">
            Collaborate in real time with G3 design principals, structural engineers, and spatial analysts.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-stone-200 shadow-subtle text-xs font-mono text-stone-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Active Principals: Elena Vance, Julian Sterling</span>
          <span className="text-stone-300">|</span>
          <span className="text-stone-500">Latency: ~12ms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Chat Box */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 shadow-elevated flex flex-col h-[600px] overflow-hidden">
          
          {/* Channel Topbar */}
          <div className="p-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
                G3
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-900"># general-studio-collaborative</h3>
                <p className="text-[11px] text-stone-500 font-mono">Public Design Inquiries & Review Stream</p>
              </div>
            </div>

            <span className="text-xs font-mono bg-stone-200 text-stone-700 px-2.5 py-1 rounded">
              Room: {roomId}
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-stone-50/30">
            {messages.map((msg, i) => {
              const isArchitect = msg.senderRole === 'architect' || msg.senderRole === 'admin';
              const isSelf = user && (user.id === msg.senderId || user.name === msg.senderName);

              return (
                <div
                  key={msg.id || i}
                  className={`flex gap-3.5 ${isSelf ? 'justify-end' : 'justify-start'}`}
                >
                  {!isSelf && (
                    <div className="w-9 h-9 rounded-full bg-stone-200 flex-shrink-0 flex items-center justify-center overflow-hidden border border-stone-300">
                      {msg.senderAvatar ? (
                        <Image
                          src={msg.senderAvatar}
                          alt={msg.senderName}
                          width={36}
                          height={36}
                          className="object-cover"
                        />
                      ) : (
                        <span className="font-bold text-xs text-stone-700">
                          {msg.senderName?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                  )}

                  <div className={`max-w-xl space-y-1 ${isSelf ? 'items-end text-right' : 'items-start'}`}>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-stone-900">{msg.senderName}</span>
                      {isArchitect && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-semibold">
                          STUDIO PRINCIPAL
                        </span>
                      )}
                      <span className="text-[10px] text-stone-400 font-mono">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div
                      className={`p-3.5 rounded-lg text-sm leading-relaxed ${
                        isSelf
                          ? 'bg-stone-900 text-white rounded-tr-none'
                          : isArchitect
                          ? 'bg-white border border-amber-200 text-stone-800 shadow-subtle ring-1 ring-amber-500/10 rounded-tl-none'
                          : 'bg-white border border-stone-200 text-stone-800 shadow-subtle rounded-tl-none'
                      }`}
                    >
                      <p>{msg.message}</p>
                    </div>
                  </div>

                  {isSelf && (
                    <div className="w-9 h-9 rounded-full bg-stone-900 text-white flex-shrink-0 flex items-center justify-center font-bold text-xs">
                      {user ? user.name.charAt(0) : 'Me'}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-stone-200 bg-white space-y-3">
            {!user && (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Your Name / Organization (e.g. Liam - Kyoto Site)"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="px-3 py-1.5 rounded border border-stone-300 text-xs w-64 focus:outline-none focus:border-stone-600 bg-stone-50"
                  required
                />
                <span className="text-xs text-stone-400">or sign in to link your client account</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about site feasibility, mass-timber spans, passivhaus zoning, or project timeline..."
                className="flex-1 px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 text-sm bg-stone-50/50"
              />
              <button
                type="submit"
                disabled={sending || !inputValue.trim()}
                className="px-5 py-3 bg-stone-900 hover:bg-amber-800 text-white rounded-md font-semibold text-sm transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar: Studio Guidelines & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick FAQ / Guidelines */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-subtle space-y-4">
            <h4 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-700" />
              Live Consultation Guidelines
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>All architectural responses in this room are verified by registered AIA / RIBA principals.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Real-time WebSocket broadcasting ensures sub-second updates across all connected clients.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Confidential CAD files can be attached via private consultation sessions.</span>
              </li>
            </ul>
          </div>

          {/* 1-on-1 Private Consultation Card */}
          <div className="bg-stone-900 text-white rounded-xl p-6 shadow-elevated space-y-4">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-semibold">
              PRIVATE DESIGN REVIEW
            </span>
            <h4 className="text-xl font-bold">Need a Private 1-on-1 Studio Session?</h4>
            <p className="text-stone-300 text-xs leading-relaxed">
              Schedule a dedicated 45-minute video and CAD markup session with Lead Principal Elena Vance.
            </p>
            <a
              href="/contact"
              className="block w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-center font-semibold text-xs rounded transition-colors"
            >
              Book Dedicated Session →
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
