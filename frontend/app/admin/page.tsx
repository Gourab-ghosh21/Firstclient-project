'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Package,
  FileText,
  Settings,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  PhoneCall,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  AlertCircle,
  Save,
  Download,
} from 'lucide-react';
import { WholesaleEnquiry, BusinessStarterLead, Product, LeadStatus, AvailabilityStatus } from '@/lib/types';
import {
  getStoredEnquiries,
  getStoredStarterLeads,
  getInitialProducts,
  saveProducts,
  getStoredSettings,
  saveStoredSettings,
  buildWhatsAppUrl,
} from '@/lib/store';
import { adminLogin, fetchAdminLeads, updateAdminLeadStatus } from '@/lib/api';

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPin, setAuthPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'starter-leads' | 'products' | 'settings'>('overview');

  // Data states
  const [enquiries, setEnquiries] = useState<WholesaleEnquiry[]>([]);
  const [starterLeads, setStarterLeads] = useState<BusinessStarterLead[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState(getStoredSettings());

  // Filter & Search states
  const [searchLead, setSearchLead] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Product Add / Edit modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Kurtis',
    fabric: '',
    sizes: 'M, L, XL, XXL',
    moq: 12,
    unit: 'pcs',
    price: '',
    showPrice: false,
    availability: 'In Stock' as AvailabilityStatus,
    featured: false,
    image: '/images/cat-1-ref.jpg',
  });

  // Note addition state
  const [activeNoteLeadId, setActiveNoteLeadId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  const loadBackendData = async () => {
    const data = await fetchAdminLeads('jyoti2026');
    if (data.enquiries && data.enquiries.length > 0) {
      setEnquiries(data.enquiries);
    } else {
      setEnquiries(getStoredEnquiries());
    }
    if (data.starterLeads && data.starterLeads.length > 0) {
      setStarterLeads(data.starterLeads);
    } else {
      setStarterLeads(getStoredStarterLeads());
    }
  };

  useEffect(() => {
    // Check session auth
    const sessionAuth = sessionStorage.getItem('jyoti_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }

    loadBackendData();
    setProducts(getInitialProducts());
    setSettings(getStoredSettings());
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await adminLogin(authPin);
    if (result.success) {
      setIsAuthenticated(true);
      sessionStorage.setItem('jyoti_admin_auth', 'true');
      setAuthError('');
      loadBackendData();
    } else {
      setAuthError(result.error || 'Invalid Admin Passcode. (Demo passcode: jyoti2026)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('jyoti_admin_auth');
  };

  // Status updates
  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    await updateAdminLeadStatus(id, newStatus, undefined, 'jyoti2026');
    const updated = enquiries.map((enq) => {
      if (enq.id === id) {
        return {
          ...enq,
          status: newStatus,
          notes: [...enq.notes, `Status changed to ${newStatus} on ${new Date().toLocaleDateString()}`],
        };
      }
      return enq;
    });
    setEnquiries(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('jyoti_b2b_enquiries_v1', JSON.stringify(updated));
    }
  };

  const handleAddNote = (id: string) => {
    if (!newNoteText.trim()) return;
    const updated = enquiries.map((enq) => {
      if (enq.id === id) {
        return {
          ...enq,
          notes: [...enq.notes, newNoteText.trim()],
        };
      }
      return enq;
    });
    setEnquiries(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('jyoti_b2b_enquiries_v1', JSON.stringify(updated));
    }
    setNewNoteText('');
    setActiveNoteLeadId(null);
  };

  // Product CRUD
  const handleToggleProductPrice = (productId: string) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        return { ...p, showPrice: !p.showPrice };
      }
      return p;
    });
    setProducts(updated);
    saveProducts(updated);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to remove this garment from the catalog?')) {
      const updated = products.filter((p) => p.id !== productId);
      setProducts(updated);
      saveProducts(updated);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      slug: newProductForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newProductForm.name,
      category: newProductForm.category,
      categorySlug: newProductForm.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: `Wholesale ${newProductForm.name} manufactured for retailers.`,
      fabric: newProductForm.fabric || '100% Rayon Slub',
      sizes: newProductForm.sizes.split(',').map((s) => s.trim()),
      colours: ['Assorted Wholesale Colors'],
      moq: Number(newProductForm.moq) || 12,
      unit: newProductForm.unit,
      price: newProductForm.price ? Number(newProductForm.price) : null,
      showPrice: newProductForm.showPrice,
      availability: newProductForm.availability,
      featured: newProductForm.featured,
      image: newProductForm.image,
      gallery: [newProductForm.image],
    };

    const updated = [newProd, ...products];
    setProducts(updated);
    saveProducts(updated);
    setIsAddProductOpen(false);
    setNewProductForm({
      name: '',
      category: 'Kurtis',
      fabric: '',
      sizes: 'M, L, XL, XXL',
      moq: 12,
      unit: 'pcs',
      price: '',
      showPrice: false,
      availability: 'In Stock',
      featured: false,
      image: '/images/cat-1-ref.jpg',
    });
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSettings(settings);
    alert('Admin configuration saved successfully.');
  };

  // Filtered Leads
  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch =
      enq.name.toLowerCase().includes(searchLead.toLowerCase()) ||
      enq.city.toLowerCase().includes(searchLead.toLowerCase()) ||
      enq.businessName.toLowerCase().includes(searchLead.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPIs
  const totalLeads = enquiries.length + starterLeads.length;
  const newLeads = enquiries.filter((e) => e.status === 'New').length;
  const quotationSent = enquiries.filter((e) => e.status === 'Quotation Sent').length;
  const convertedLeads = enquiries.filter((e) => e.status === 'Converted').length;

  if (!isAuthenticated) {
    return (
      <div className="bg-[#FAF7F0] min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#E8E2D5] shadow-card space-y-6">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-brand-charcoal text-brand-gold flex items-center justify-center mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold text-brand-dark">
              Jyoti Enterprise Admin Portal
            </h1>
            <p className="text-xs text-neutral-500">
              Restricted management desk for wholesale leads &amp; inventory.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Enter Admin Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Passcode (Default: jyoti2026)"
                value={authPin}
                onChange={(e) => setAuthPin(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#DDD5C7] rounded-xl text-sm text-brand-dark focus:bg-white focus:border-brand-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-charcoal text-white font-bold text-xs rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-brand-gold" />
              <span>Unlock Admin Desk</span>
            </button>

            <div className="text-center pt-2">
              <p className="text-[11px] text-neutral-500">
                Demo access passcode: <strong className="text-brand-dark">jyoti2026</strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Admin Header */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h1 className="text-lg font-bold text-brand-dark">
                Jyoti Enterprise Wholesale Management Desk
              </h1>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Secure lead management, product catalog control &amp; wholesale settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-neutral-700 hover:text-black underline"
            >
              View Live Website ↗
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E8E2D5]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-brand-charcoal text-white shadow-sm'
                : 'bg-white text-neutral-700 border border-[#E2DAD0] hover:bg-[#F3ECE1]'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'enquiries'
                ? 'bg-brand-charcoal text-white shadow-sm'
                : 'bg-white text-neutral-700 border border-[#E2DAD0] hover:bg-[#F3ECE1]'
            }`}
          >
            <span>Wholesale Enquiries</span>
            <span className="bg-brand-gold text-brand-dark text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {enquiries.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('starter-leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'starter-leads'
                ? 'bg-brand-charcoal text-white shadow-sm'
                : 'bg-white text-neutral-700 border border-[#E2DAD0] hover:bg-[#F3ECE1]'
            }`}
          >
            <span>Questionnaire Leads</span>
            <span className="bg-neutral-200 text-neutral-800 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {starterLeads.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'products'
                ? 'bg-brand-charcoal text-white shadow-sm'
                : 'bg-white text-neutral-700 border border-[#E2DAD0] hover:bg-[#F3ECE1]'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'bg-brand-charcoal text-white shadow-sm'
                : 'bg-white text-neutral-700 border border-[#E2DAD0] hover:bg-[#F3ECE1]'
            }`}
          >
            Wholesale Settings
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-soft">
                <span className="text-xs font-semibold text-neutral-500 uppercase block">Total Leads</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-dark font-mono mt-1 block">
                  {totalLeads}
                </span>
                <span className="text-[11px] text-neutral-500 mt-1 block">From Quote Modal &amp; Planner</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-soft">
                <span className="text-xs font-semibold text-neutral-500 uppercase block">New Inquiries</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono mt-1 block">
                  {newLeads}
                </span>
                <span className="text-[11px] text-neutral-500 mt-1 block">Awaiting First Contact</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-soft">
                <span className="text-xs font-semibold text-neutral-500 uppercase block">Quotes Sent</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono mt-1 block">
                  {quotationSent}
                </span>
                <span className="text-[11px] text-neutral-500 mt-1 block">Rate card shared</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-soft">
                <span className="text-xs font-semibold text-neutral-500 uppercase block">Converted Leads</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono mt-1 block">
                  {convertedLeads}
                </span>
                <span className="text-[11px] text-neutral-500 mt-1 block">Confirmed Orders</span>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-brand-dark">Latest Wholesale Inquiries</h2>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs font-bold text-brand-gold hover:underline"
                >
                  View All Enquiries →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#EAE3D5] text-neutral-500">
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">City</th>
                      <th className="py-2.5 px-3">Business</th>
                      <th className="py-2.5 px-3">Products</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.slice(0, 5).map((enq) => (
                      <tr key={enq.id} className="border-b border-[#F2ECE0] hover:bg-[#FAF7F0]">
                        <td className="py-3 px-3 text-neutral-500">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3 font-bold text-brand-dark">{enq.name}</td>
                        <td className="py-3 px-3 text-neutral-600">{enq.city || 'India'}</td>
                        <td className="py-3 px-3 text-neutral-600">{enq.businessType}</td>
                        <td className="py-3 px-3 text-neutral-600">{enq.interestedProducts.join(', ')}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-800">
                            {enq.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WHOLESALE ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8E2D5] shadow-soft flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search lead by name, city, or business..."
                  value={searchLead}
                  onChange={(e) => setSearchLead(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-[#FAF7F0] border border-[#DDD5C7] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 font-semibold">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#FAF7F0] border border-[#DDD5C7] rounded-lg text-xs font-semibold"
                >
                  <option value="all">All Statuses ({enquiries.length})</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
            </div>

            {/* Enquiries List */}
            <div className="space-y-3">
              {filteredEnquiries.map((enq) => {
                const waLink = buildWhatsAppUrl(
                  `Hello ${enq.name}, this is Jyoti Enterprise following up on your wholesale quotation request for ${enq.interestedProducts.join(', ')}.`,
                  enq.whatsapp || enq.phone
                );

                return (
                  <div
                    key={enq.id}
                    className="bg-white rounded-2xl p-5 border border-[#E8E2D5] shadow-soft space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EAE0] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-brand-dark">{enq.name}</h3>
                          <span className="text-xs text-neutral-500 font-normal">({enq.businessName || 'New Store'})</span>
                          <span className="text-[10px] text-neutral-400 font-mono">#{enq.id}</span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {enq.city} • {enq.businessType} • Source: {enq.leadSource}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status Select */}
                        <select
                          value={enq.status}
                          onChange={(e) => handleUpdateStatus(enq.id, e.target.value as LeadStatus)}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold border border-[#DDD5C7] bg-[#FAF7F0]"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quotation Sent">Quotation Sent</option>
                          <option value="Negotiation">Negotiation</option>
                          <option value="Converted">Converted</option>
                          <option value="Lost">Lost</option>
                        </select>

                        {/* WhatsApp Button */}
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-[#25D366] text-white text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-[#20ba5a]"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    {/* Enquiry Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-neutral-400 block font-semibold">Phone:</span>
                        <span className="font-bold text-brand-dark">{enq.phone}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-semibold">Approx Qty:</span>
                        <span className="font-bold text-brand-dark">{enq.approxQuantity}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-semibold">Budget:</span>
                        <span className="font-bold text-brand-dark">{enq.budget}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-semibold">Products:</span>
                        <span className="font-bold text-brand-dark truncate">{enq.interestedProducts.join(', ')}</span>
                      </div>
                    </div>

                    {enq.message && (
                      <p className="text-xs text-neutral-600 bg-[#FAF7F0] p-2.5 rounded-lg border border-[#EAE3D5]">
                        &quot;{enq.message}&quot;
                      </p>
                    )}

                    {/* Notes & Follow-up log */}
                    <div className="pt-2 border-t border-[#F2ECE0] text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-neutral-500">Internal Follow-up Notes:</span>
                        <button
                          onClick={() => setActiveNoteLeadId(activeNoteLeadId === enq.id ? null : enq.id)}
                          className="text-brand-dark font-bold hover:underline text-[11px]"
                        >
                          + Add Note
                        </button>
                      </div>

                      {enq.notes.length > 0 && (
                        <ul className="mt-1 space-y-0.5 text-neutral-600 text-[11px]">
                          {enq.notes.map((note, nIdx) => (
                            <li key={nIdx}>• {note}</li>
                          ))}
                        </ul>
                      )}

                      {activeNoteLeadId === enq.id && (
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Enter follow-up note..."
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                            className="flex-1 px-3 py-1 bg-[#FAF7F0] border border-[#DDD5C7] rounded-lg text-xs"
                          />
                          <button
                            onClick={() => handleAddNote(enq.id)}
                            className="px-3 py-1 bg-brand-charcoal text-white text-xs font-bold rounded-lg"
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: STARTER LEADS (QUESTIONNAIRE) */}
        {activeTab === 'starter-leads' && (
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-soft space-y-4">
            <h2 className="text-base font-bold text-brand-dark">Business Questionnaire Inquiries</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EAE3D5] text-neutral-500">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Phone</th>
                    <th className="py-2.5 px-3">Business Model</th>
                    <th className="py-2.5 px-3">Budget</th>
                    <th className="py-2.5 px-3">Interested Garments</th>
                    <th className="py-2.5 px-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {starterLeads.map((lead) => {
                    const wa = buildWhatsAppUrl(
                      `Hello ${lead.name}, thank you for completing our Garment Business Questionnaire. Here is our recommended starter plan for ${lead.businessType}.`,
                      lead.phone
                    );
                    return (
                      <tr key={lead.id} className="border-b border-[#F2ECE0] hover:bg-[#FAF7F0]">
                        <td className="py-3 px-3 text-neutral-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3 font-bold text-brand-dark">{lead.name}</td>
                        <td className="py-3 px-3 font-mono">{lead.phone}</td>
                        <td className="py-3 px-3">{lead.businessType}</td>
                        <td className="py-3 px-3 font-semibold">{lead.budgetRange}</td>
                        <td className="py-3 px-3">{lead.garments.join(', ')}</td>
                        <td className="py-3 px-3">
                          <a
                            href={wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 bg-[#25D366] text-white text-[10px] font-bold rounded-md inline-flex items-center gap-1"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-brand-dark">Wholesale Catalog Products</h2>
                <p className="text-xs text-neutral-500">Add, edit, or adjust MOQs and pricing visibility.</p>
              </div>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 bg-brand-charcoal text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-black"
              >
                <Plus className="w-4 h-4 text-brand-gold" />
                <span>Add Garment SKU</span>
              </button>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-[#E8E2D5] p-4 shadow-soft flex gap-4 items-center justify-between"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-16 h-20 object-cover rounded-xl border border-neutral-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="font-bold text-xs sm:text-sm text-brand-dark truncate">{prod.name}</h3>
                    <p className="text-[11px] text-neutral-500">{prod.category} • MOQ: {prod.moq} pcs</p>
                    <span className="inline-block text-[10px] font-bold bg-[#FAF7F0] border border-[#E8E2D5] px-2 py-0.5 rounded-full">
                      {prod.availability}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleToggleProductPrice(prod.id)}
                      title={prod.showPrice ? 'Hide price from visitors' : 'Show price to visitors'}
                      className={`p-1.5 rounded-lg border text-xs ${
                        prod.showPrice ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                      }`}
                    >
                      {prod.showPrice ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      title="Delete Product"
                      className="p-1.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Product Modal */}
            {isAddProductOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-[#E8E2D5] shadow-elevated space-y-4">
                  <div className="flex items-center justify-between border-b border-[#F0EAE0] pb-3">
                    <h3 className="font-bold text-sm text-brand-dark">Add New Wholesale Garment SKU</h3>
                    <button onClick={() => setIsAddProductOpen(false)} className="text-neutral-400 hover:text-black">✕</button>
                  </div>

                  <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold mb-1">Product Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Cotton Embroidered Tunic"
                        value={newProductForm.name}
                        onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF7F0] border rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Category</label>
                        <select
                          value={newProductForm.category}
                          onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF7F0] border rounded-lg"
                        >
                          <option value="Kurtis">Kurtis</option>
                          <option value="Tops & Dresses">Tops &amp; Dresses</option>
                          <option value="Women's Wear">Women&apos;s Wear</option>
                          <option value="Kids Wear">Kids Wear</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">MOQ (pcs)</label>
                        <input
                          type="number"
                          value={newProductForm.moq}
                          onChange={(e) => setNewProductForm({ ...newProductForm, moq: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-[#FAF7F0] border rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Fabric Specification</label>
                      <input
                        type="text"
                        placeholder="e.g. 140 GSM Rayon Slub"
                        value={newProductForm.fabric}
                        onChange={(e) => setNewProductForm({ ...newProductForm, fabric: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF7F0] border rounded-lg"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-brand-charcoal text-white font-bold rounded-lg hover:bg-black"
                      >
                        Publish Garment
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="px-4 py-2.5 bg-neutral-100 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: WHOLESALE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-soft max-w-2xl space-y-6">
            <div>
              <h2 className="text-base font-bold text-brand-dark">Wholesale Contact &amp; Desk Settings</h2>
              <p className="text-xs text-neutral-500">
                Update configurable placeholders for WhatsApp, phone, email, and address.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-neutral-700 mb-1">
                  WhatsApp Number (Numeric only for wa.me links)
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  placeholder="919876543210"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#DDD5C7] rounded-xl font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-neutral-700 mb-1">
                    Display Phone
                  </label>
                  <input
                    type="text"
                    value={settings.displayPhone}
                    onChange={(e) => setSettings({ ...settings, displayPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#DDD5C7] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-neutral-700 mb-1">
                    Display WhatsApp
                  </label>
                  <input
                    type="text"
                    value={settings.displayWhatsapp}
                    onChange={(e) => setSettings({ ...settings, displayWhatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#DDD5C7] rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-neutral-700 mb-1">
                    Display Email
                  </label>
                  <input
                    type="text"
                    value={settings.displayEmail}
                    onChange={(e) => setSettings({ ...settings, displayEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#DDD5C7] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-neutral-700 mb-1">
                    Display Business Address
                  </label>
                  <input
                    type="text"
                    value={settings.displayAddress}
                    onChange={(e) => setSettings({ ...settings, displayAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#DDD5C7] rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-charcoal text-white font-bold text-xs rounded-xl hover:bg-black transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-brand-gold" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
