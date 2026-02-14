'use client'

import React from 'react'

export default function ProductBanner() {
  return (
    <div className="col-span-1 md:col-span-2 xl:col-span-3 bg-gradient-to-r from-neutral-dark to-slate-900 border border-primary/30 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 my-4">
      <div className="flex-1">
        <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">Premium Logistics</span>
        <h2 className="text-2xl font-black text-white mb-4">Export Standards &amp; Packaging</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          Our logistics network ensures every product maintains its farm-fresh quality from Algeria to your destination. 
          We utilize temperature-controlled reefer containers and palletized shipping solutions that meet GlobalGAP standards.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">verified</span>
            <span className="text-xs font-bold text-white">GlobalGAP Certified</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">thermostat</span>
            <span className="text-xs font-bold text-white">Cold Chain Logistics</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">inventory_2</span>
            <span className="text-xs font-bold text-white">Retail-Ready Pack</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">public</span>
            <span className="text-xs font-bold text-white">Global Port Access</span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 aspect-video bg-neutral-dark rounded-lg flex items-center justify-center border border-border-dark overflow-hidden relative">
        {/* Using a placeholder image or the one from the reference if accessible. 
            For production, this should be replaced with a local optimized image. */}
        <img 
          className="w-full h-full object-cover opacity-60" 
          alt="Logistics warehouse with organized cargo" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0341_MqRGNTNjHq6PqAzLggK9Y4Jv9cuM8GC5kEh2SWL8aFdP9eh994LVUwm8s-eh4yGh9DGz4T0Jr-jWsRuLKKdJjycYjKsxLnrnzaSLiC1EdoLzxbqmfzGXl64Kd0OSttVTxX-Lnydmh-Zo-3zEv3Z7Wx5Sw_n05bIFrc1LXh2grhHsKOmiUSj-t6_BpvnUrDj-FbAGw_ogwNh1nIj0saC-wcXlqmrwwW1GOaMpviUjO6x7J9y8xtVELsAOPRK1zSFEZbWZJq0"
        />
      </div>
    </div>
  )
}
