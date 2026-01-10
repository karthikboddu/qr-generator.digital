import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-medium text-foreground"
      >
        <span>{question}</span>
        <ChevronDown
          className={cn("w-5 h-5 transition-transform duration-300", isOpen && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="p-4 pt-0 text-muted-foreground">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
