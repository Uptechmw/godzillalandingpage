"use client";

import React, { useState } from 'react';
import {
    Package,
    Plus,
    Save,
    Trash2,
    X,
    Check,
    AlertCircle,
    Coins,
    DollarSign,
    Layers,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';
import { toast } from 'sonner';

interface Product {
    id?: string;
    name: string;
    coins: number;
    priceAmount: number;
    description: string;
    features: string[];
    active: boolean;
}

export function BillingProductManager({ initialProducts }: { initialProducts: any[] }) {
    const [products, setProducts] = useState<Product[]>(
        initialProducts.map(p => ({
            ...p,
            features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || [])
        }))
    );
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Form state for new/editing product
    const [form, setForm] = useState<Product>({
        name: '',
        coins: 100,
        priceAmount: 9.99,
        description: '',
        features: [],
        active: true
    });

    const handleAddFeature = () => {
        setForm(prev => ({ ...prev, features: [...prev.features, ""] }));
    };

    const handleFeatureChange = (index: number, val: string) => {
        const newFeatures = [...form.features];
        newFeatures[index] = val;
        setForm(prev => ({ ...prev, features: newFeatures }));
    };

    const handleRemoveFeature = (index: number) => {
        setForm(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
    };

    const handleSave = async () => {
        if (!form.name || form.coins <= 0 || form.priceAmount <= 0) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/admin/billing/products', {
                method: editingId ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingId ? { ...form, id: editingId } : form)
            });

            if (!res.ok) throw new Error("Failed to save product");

            const savedProduct = await res.json();

            if (editingId) {
                setProducts(prev => prev.map(p => p.id === editingId ? {
                    ...savedProduct,
                    features: typeof savedProduct.features === 'string' ? JSON.parse(savedProduct.features) : savedProduct.features
                } : p));
                toast.success("Product updated successfully.");
            } else {
                setProducts(prev => [...prev, {
                    ...savedProduct,
                    features: typeof savedProduct.features === 'string' ? JSON.parse(savedProduct.features) : savedProduct.features
                }]);
                toast.success("New product created.");
            }

            resetForm();
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/admin/billing/products?id=${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Failed to delete product");

            setProducts(prev => prev.filter(p => p.id !== id));
            toast.success("Product deleted.");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const resetForm = () => {
        setForm({
            name: '',
            coins: 100,
            priceAmount: 9.99,
            description: '',
            features: [],
            active: true
        });
        setIsAdding(false);
        setEditingId(null);
    };

    const startEdit = (product: Product) => {
        setForm(product);
        setEditingId(product.id || null);
        setIsAdding(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-black text-lg flex items-center gap-2">
                    <Layers className="text-blue-500" size={20} />
                    Production Registry
                </h3>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-blue-600/20"
                    >
                        <Plus size={16} />
                        CREATE PACKAGE
                    </button>
                )}
            </div>

            {isAdding && (
                <div className="bg-[#111827] border border-blue-500/30 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h4 className="text-white font-bold text-xl">{editingId ? 'Modify Package' : 'New Token Package'}</h4>
                            <p className="text-xs text-slate-500 mt-1">Configure pricing and resource allocation for users</p>
                        </div>
                        <button onClick={resetForm} className="p-2 text-slate-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Package Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g. Starter Pack"
                                    className="w-full bg-[#0B1220] border border-[#1F2937] rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Coin Allocation</label>
                                <div className="relative">
                                    <Coins size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="number"
                                        value={form.coins}
                                        onChange={e => setForm(prev => ({ ...prev, coins: parseInt(e.target.value) }))}
                                        className="w-full bg-[#0B1220] border border-[#1F2937] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Price (USD)</label>
                                <div className="relative">
                                    <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={form.priceAmount}
                                        onChange={e => setForm(prev => ({ ...prev, priceAmount: parseFloat(e.target.value) }))}
                                        className="w-full bg-[#0B1220] border border-[#1F2937] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Visibility</label>
                                <button
                                    onClick={() => setForm(prev => ({ ...prev, active: !prev.active }))}
                                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all ${form.active ? 'border-green-500/20 bg-green-500/5 text-green-500' : 'border-[#1F2937] bg-[#0B1220] text-slate-500'
                                        }`}
                                >
                                    <span className="text-xs font-bold uppercase tracking-widest">{form.active ? 'LIVE ON PLATFORM' : 'HIDDEN / INACTIVE'}</span>
                                    {form.active ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 lg:col-span-1 md:col-span-2">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Included Features</label>
                                    <button onClick={handleAddFeature} className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest">Add Row</button>
                                </div>
                                <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-hide pr-2">
                                    {form.features.map((feat, i) => (
                                        <div key={i} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={feat}
                                                onChange={e => handleFeatureChange(i, e.target.value)}
                                                className="flex-1 bg-[#0B1220] border border-[#1F2937] rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 outline-none"
                                            />
                                            <button onClick={() => handleRemoveFeature(i)} className="text-slate-600 hover:text-red-500 transition-colors">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    {form.features.length === 0 && <p className="text-[10px] text-slate-600 italic">No features listed yet.</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-[#1F2937] flex justify-end gap-4">
                        <button
                            onClick={resetForm}
                            className="px-6 py-2.5 text-xs font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50"
                        >
                            {loading ? <LayerBounce /> : <Save size={16} />}
                            {editingId ? 'UPDATE REGISTRY' : 'DEPLOY PACKAGE'}
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                    <div className="col-span-full py-16 text-center bg-[#111827] border border-dashed border-[#1F2937] rounded-3xl">
                        <Package className="mx-auto text-slate-700 mb-4" size={48} />
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">No Active Revenue Streams Identified</p>
                    </div>
                ) : (
                    products.map((product) => (
                        <div key={product.id} className={`bg-[#111827] border rounded-3xl p-6 group transition-all hover:shadow-2xl ${product.active ? 'border-[#1F2937] hover:border-blue-500/30' : 'border-red-500/20 opacity-60 grayscale'
                            }`}>
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-10 h-10 rounded-xl bg-[#0B1220] flex items-center justify-center text-blue-500 border border-[#1F2937]">
                                    <Package size={20} />
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => startEdit(product)}
                                        className="p-1.5 text-slate-500 hover:text-white hover:bg-[#1F2937] rounded-lg transition-all"
                                    >
                                        <Plus size={14} className="rotate-45" /> {/* Edit hack */}
                                        <span className="sr-only">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id!)}
                                        className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <h4 className="text-white font-black text-lg">{product.name}</h4>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-white">${product.priceAmount}</span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">/ LIFETIME</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-[#0B1220] rounded-xl border border-[#1F2937]">
                                <Coins size={14} className="text-amber-500" />
                                <span className="text-sm font-black text-white">{product.coins.toLocaleString()} <span className="text-[9px] opacity-60">G-COINS</span></span>
                            </div>

                            <div className="space-y-2 mb-8 h-20 overflow-hidden relative">
                                {product.features.map((feat, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                        <Check size={10} className="text-emerald-500" />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#111827] to-transparent" />
                            </div>

                            {!product.active && (
                                <div className="flex items-center justify-center gap-2 mb-6 py-1 bg-red-500/10 text-red-500 rounded-lg">
                                    <AlertCircle size={10} />
                                    <span className="text-[8px] font-black uppercase tracking-widest">OFFLINE / HIDDEN</span>
                                </div>
                            )}

                            <button
                                onClick={() => startEdit(product)}
                                className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white border border-[#1F2937] hover:border-blue-500 transition-all rounded-xl"
                            >
                                Configure Parameters
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function LayerBounce() {
    return (
        <div className="flex gap-1 items-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
        </div>
    );
}
