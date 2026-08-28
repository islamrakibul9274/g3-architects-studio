'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/context/AuthContext';
import { IProject, IConsultation } from '@/types';
import { INITIAL_PROJECTS } from '@/lib/projectsData';
import Link from 'next/link';
import Image from 'next/image';
import {
  Layers,
  Calendar,
  CreditCard,
  User,
  UploadCloud,
  FileDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Bookmark,
  Sparkles,
  Loader2,
} from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const { user, loading, refreshUser } = useAuth();
  const [consultations, setConsultations] = useState<IConsultation[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'moodboard' | 'consultations' | 'downloads' | 'upload'>('overview');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const res = await fetch('/api/consultations');
        const data = await res.json();
        if (data.consultations) {
          setConsultations(data.consultations);
        }
      } catch {}
    };
    fetchConsultations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-700" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-xl border border-stone-200 shadow-subtle text-center space-y-4">
        <User className="w-12 h-12 text-stone-400 mx-auto" />
        <h2 className="text-xl font-bold text-stone-900">Sign in to Access Client Portal</h2>
        <p className="text-sm text-stone-600">
          Manage your commissions, saved moodboard projects, and BIM blueprint downloads.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/auth/signin"
            className="px-5 py-2.5 bg-stone-900 text-white font-medium text-xs rounded hover:bg-stone-800"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-5 py-2.5 border border-stone-300 text-stone-800 font-medium text-xs rounded hover:bg-stone-50"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  const savedProjectObjects = INITIAL_PROJECTS.filter((p) =>
    user.savedProjects?.includes(p.slug || p._id || '')
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccess(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setUploadSuccess(data.result?.secure_url || 'File uploaded successfully to studio vault');
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header Info */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-subtle mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-2xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-stone-900">{user.name}</h1>
              <span className="text-xs font-mono uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold">
                {user.role}
              </span>
            </div>
            <p className="text-sm text-stone-500">{user.email} · {user.company || 'Private Client Studio'}</p>
          </div>
        </div>

        {/* Subscription Badge */}
        <div className="flex items-center gap-4 bg-stone-50 p-4 rounded-lg border border-stone-200 text-xs">
          <div>
            <span className="text-stone-400 font-mono block text-[10px] uppercase">MEMBERSHIP TIER</span>
            <strong className="text-stone-900 uppercase font-mono text-sm">
              {user.subscription?.plan || 'Free Explorer'}
            </strong>
          </div>
          <Link
            href="/pricing"
            className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded transition-colors"
          >
            Upgrade Plan
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-stone-200 mb-8 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Studio Overview', icon: Layers },
          { id: 'moodboard', label: `Saved Moodboard (${user.savedProjects?.length || 0})`, icon: Bookmark },
          { id: 'consultations', label: `Consultations (${consultations.length})`, icon: Calendar },
          { id: 'downloads', label: 'BIM Blueprint Downloads', icon: FileDown },
          { id: 'upload', label: 'CAD & Site Asset Locker', icon: UploadCloud },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-white border-t-2 border-amber-700 border-x border-stone-200 text-stone-950 font-bold -mb-px shadow-subtle'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-4 h-4 text-amber-700" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-subtle">
              <span className="text-xs font-mono text-stone-400 uppercase block">Active Inquiries</span>
              <p className="text-3xl font-extrabold text-stone-900 font-mono mt-1">{consultations.length}</p>
              <p className="text-xs text-stone-500 mt-1">Direct architectural briefings</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-subtle">
              <span className="text-xs font-mono text-stone-400 uppercase block">Saved Works</span>
              <p className="text-3xl font-extrabold text-stone-900 font-mono mt-1">
                {user.savedProjects?.length || 0}
              </p>
              <p className="text-xs text-stone-500 mt-1">Curated architectural moodboard</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-subtle">
              <span className="text-xs font-mono text-stone-400 uppercase block">Live Studio Room</span>
              <p className="text-3xl font-extrabold text-emerald-600 font-mono mt-1">Connected</p>
              <p className="text-xs text-stone-500 mt-1">Pusher WebSocket cluster: mt1</p>
            </div>
          </div>

          {/* Quick Consultation CTA */}
          <div className="bg-stone-900 text-white rounded-xl p-8 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
                COMMISSION WORKFLOW
              </span>
              <h3 className="text-2xl font-bold">Have a New Site or Renovation in Mind?</h3>
              <p className="text-stone-300 text-sm max-w-xl leading-relaxed">
                Our principals will evaluate your site survey, zoning restrictions, and topography within 24 hours.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs rounded transition-colors whitespace-nowrap"
            >
              Book Studio Consultation
            </Link>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Moodboard */}
      {activeTab === 'moodboard' && (
        <div>
          {savedProjectObjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProjectObjects.map((project) => (
                <div
                  key={project.slug}
                  className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-subtle flex flex-col"
                >
                  <div className="relative h-48 w-full">
                    <Image src={project.heroImage} alt={project.title} fill className="object-cover" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-xs font-mono text-amber-700">{project.category}</span>
                      <h4 className="font-bold text-stone-900 text-base mt-1">{project.title}</h4>
                      <p className="text-xs text-stone-500">{project.location} · {project.area}</p>
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-semibold text-stone-900 hover:text-amber-800 flex items-center gap-1 pt-2 border-t border-stone-100"
                    >
                      <span>View Drawings & Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 bg-white rounded-xl border border-stone-200 text-center space-y-3">
              <Bookmark className="w-8 h-8 text-stone-400 mx-auto" />
              <h4 className="font-bold text-stone-900 text-base">Your Moodboard is Empty</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Explore our architectural catalog and click the bookmark icon to save projects to your private collection.
              </p>
              <Link
                href="/projects"
                className="inline-block px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded"
              >
                Browse Projects
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Consultations */}
      {activeTab === 'consultations' && (
        <div className="space-y-4">
          {consultations.length > 0 ? (
            consultations.map((c, i) => (
              <div
                key={c._id || i}
                className="p-6 rounded-lg bg-white border border-stone-200 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-stone-900 text-base">{c.projectType}</h4>
                    <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Preferred Date: <strong className="text-stone-800">{c.preferredDate}</strong> at{' '}
                    <strong className="text-stone-800">{c.preferredTimeSlot}</strong>
                  </p>
                  {c.notes && <p className="text-xs text-stone-600 mt-1 italic">"{c.notes}"</p>}
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono bg-stone-100 text-stone-700 px-3 py-1.5 rounded">
                    Budget: {c.budgetRange}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 bg-white rounded-xl border border-stone-200 text-center space-y-3">
              <Calendar className="w-8 h-8 text-stone-400 mx-auto" />
              <h4 className="font-bold text-stone-900 text-base">No Scheduled Consultations Yet</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Schedule a consultation session to review site drawings, zoning, and project feasibility.
              </p>
              <Link
                href="/contact"
                className="inline-block px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded"
              >
                Book Session Now
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Downloads */}
      {activeTab === 'downloads' && (
        <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-4">
          <h3 className="font-bold text-base text-stone-900">BIM & CAD Package Deliverables</h3>
          <p className="text-xs text-stone-600">
            Download vector blueprints, Revit BIM files, and Passivhaus thermal envelope specifications.
          </p>

          <div className="divide-y divide-stone-100 text-xs">
            <div className="py-4 flex items-center justify-between">
              <div>
                <strong className="text-stone-900 block text-sm">G3 Travertine Pavilion CAD Package (.DWG/.PDF)</strong>
                <span className="text-stone-500">Includes Foundation, Level 00, Elevation sections (24.8 MB)</span>
              </div>
              <button
                onClick={() => alert('Download starting for Travertine CAD package')}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded font-semibold text-xs flex items-center gap-1.5"
              >
                <FileDown className="w-3.5 h-3.5" /> Download
              </button>
            </div>
            <div className="py-4 flex items-center justify-between">
              <div>
                <strong className="text-stone-900 block text-sm">Nordic Timber Diagrid BIM Model (.RVT Revit)</strong>
                <span className="text-stone-500">Full 3D mass-timber parametric structural model (88.4 MB)</span>
              </div>
              <button
                onClick={() => alert('Download starting for Nordic Timber BIM model')}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded font-semibold text-xs flex items-center gap-1.5"
              >
                <FileDown className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Asset Locker & Cloudinary */}
      {activeTab === 'upload' && (
        <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-6">
          <div>
            <h3 className="font-bold text-base text-stone-900">Cloudinary CAD & Site Photo Locker</h3>
            <p className="text-xs text-stone-600 mt-1">
              Upload topographical surveys, site drone photography, and architectural sketches directly to the G3 project vault.
            </p>
          </div>

          <div className="p-8 border-2 border-dashed border-stone-300 rounded-lg text-center bg-stone-50/50 space-y-4">
            <UploadCloud className="w-10 h-10 text-stone-400 mx-auto" />
            <div>
              <label
                htmlFor="file-upload"
                className="cursor-pointer font-semibold text-amber-800 hover:underline text-sm"
              >
                Choose file to upload
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <p className="text-xs text-stone-500 mt-1">PNG, JPG, PDF, or DWG up to 50MB</p>
            </div>

            {uploading && (
              <div className="flex items-center justify-center gap-2 text-xs text-amber-800 font-semibold">
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading to Cloudinary...
              </div>
            )}

            {uploadSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded text-left">
                <p className="font-bold">File Uploaded to Cloudinary:</p>
                <a
                  href={uploadSuccess}
                  target="_blank"
                  rel="noreferrer"
                  className="underline break-all block mt-1"
                >
                  {uploadSuccess}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
