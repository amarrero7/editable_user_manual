"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SidebarProps {
  sections: any[];
}

function generateId(text: string, fallback: string) {
  if (!text) return fallback;
  return text.toLowerCase().replace(/\s+/g, "-");
}

export default function Sidebar({ sections }: SidebarProps) {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);

  return (
    <aside className="w-64 bg-white p-4 border-r border-gray-700 h-screen fixed overflow-y-auto">
      <nav className="flex flex-col gap-2 text-black">
        {sections.map((section, index) => {
          const headerBlock = section.content_blocks?.find((block: any) =>
            block.__typename?.endsWith("Header_block")
          );
          const sectionTitle = headerBlock?.title || `Section ${index + 1}`;
          const sectionId = generateId(sectionTitle, `section-${index}`);
          const hasSubsections = section.subsections?.length > 0;
          const isOpen = activeSectionIndex === index && hasSubsections;

          return (
            <div key={index}>
              <div className="flex items-center justify-between">
                <a
                  href={`#${sectionId}`}
                  onClick={() => {
                    if (hasSubsections) {
                      setActiveSectionIndex(index);
                    } else {
                      setActiveSectionIndex(null);
                    }
                  }}
                  className="hover:text-blue-600 transition-colors font-semibold block mb-1 text-left w-full"
                >
                  {sectionTitle}
                </a>

                {hasSubsections && (
                  <span className="ml-2 text-gray-500">
                    {isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </span>
                )}
              </div>

              {hasSubsections && (
                <div
                  className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-1 py-1">
                    {section.subsections.map((subsec: any, subIndex: number) => {
                      const subsecTitle = subsec.title || `Subsection ${subIndex + 1}`;
                      const subsecId = generateId(subsecTitle, `subsection-${index}-${subIndex}`);

                      return (
                        <a
                          key={subIndex}
                          href={`#${subsecId}`}
                          className="hover:text-blue-500 text-sm"
                        >
                          {subsecTitle}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}