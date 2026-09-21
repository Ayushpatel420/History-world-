import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Compass } from 'lucide-react';

export interface PaginationControlsProps {
  currentPage: number;
  totalPages?: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  itemLabel?: string;
  className?: string;
  compact?: boolean;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [16, 24, 48],
  itemLabel = 'items',
  className = '',
  compact = false
}: PaginationControlsProps) {
  const calculatedTotalPages = totalPages ?? Math.max(1, Math.ceil(totalItems / itemsPerPage));

  if (calculatedTotalPages <= 1 && totalItems <= itemsPerPage) {
    return null;
  }

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate a concise set of page numbers (keep it few: at most 3-4 visible)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (calculatedTotalPages <= 4) {
      for (let i = 1; i <= calculatedTotalPages; i++) {
        pages.push(i);
      }
    } else {
      // Keep it minimal: only show current page and bounds if close
      if (currentPage === 1) {
        pages.push(1, 2, '...', calculatedTotalPages);
      } else if (currentPage === calculatedTotalPages) {
        pages.push(1, '...', calculatedTotalPages - 1, calculatedTotalPages);
      } else {
        pages.push(1, '...', currentPage, '...', calculatedTotalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`bg-[#0D0D0D] border border-[#262626] rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono shadow-md ${className}`}>
      
      {/* Left: Summary & Per-page density */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="text-[#A09890] text-[11px] sm:text-xs">
          Showing <span className="text-[#D4AF37] font-bold">{startItem}–{endItem}</span> of <span className="text-white font-bold">{totalItems}</span> {itemLabel}
        </span>

        {onItemsPerPageChange && (
          <div className="flex items-center gap-1 pl-2 border-l border-[#262626]">
            <span className="text-[10px] text-[#7A7065] hidden md:inline">Density:</span>
            <div className="flex items-center gap-1">
              {itemsPerPageOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onItemsPerPageChange(opt)}
                  className={`px-1.5 py-0.5 rounded text-[10px] transition-all cursor-pointer font-bold ${
                    itemsPerPage === opt
                      ? 'bg-[#D4AF37] text-black shadow-sm'
                      : 'bg-[#181818] text-[#A09890] hover:text-white border border-[#2A2A2A]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Compact Page Buttons */}
      <div className="flex items-center gap-1.5 ml-auto">
        {/* Prev Page */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#2A2A2A] text-[#A09890] hover:text-white hover:border-[#D4AF37]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 text-[11px]"
          title="Previous Page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page status badge or small page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, idx) => {
            if (page === '...') {
              return (
                <span key={`dots-${idx}`} className="px-1 text-[#555] text-xs">
                  …
                </span>
              );
            }
            const isCurrent = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page as number)}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? 'bg-[#D4AF37] text-black font-black shadow-sm'
                    : 'bg-[#141414] text-[#A09890] hover:text-white hover:border-[#D4AF37]/40 border border-[#2A2A2A]'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(Math.min(calculatedTotalPages, currentPage + 1))}
          disabled={currentPage === calculatedTotalPages}
          className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#2A2A2A] text-[#A09890] hover:text-white hover:border-[#D4AF37]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 text-[11px]"
          title="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
