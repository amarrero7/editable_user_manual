"use client";

import { useTina } from "tinacms/dist/react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function generateId(text: string, fallback: string) {
  if (!text) return fallback;
  return text.toLowerCase().replace(/\s+/g, "-");
}

export default function EditablePage(props: any) {
  const { data }: { data: { user_manual: { sections: any[] } } } = useTina(props);

  return (

    <div>
        <Navbar/>
        <div className="flex">
        <Sidebar sections={data.user_manual.sections} />

        <main className="ml-64 p-8 w-full min-h-screen bg-white text-black">
            {data.user_manual.sections.map((section: any, index: number) => {

            const headerBlock = section.content_blocks?.find((block: any) =>
                block.__typename?.endsWith("Header_block")
            );
            const sectionId = generateId(headerBlock?.title, `section-${index}`);

            return (
                <section key={index} id={sectionId} className="mb-16 scroll-mt-20">
                {section.content_blocks?.map((block: any, i: number) => {
                    if (block.__typename?.endsWith("Header_block")) {
                    return (
                        <h1 key={i} className="text-3xl font-bold mb-4 text-black">
                        {block.title}
                        </h1>
                    );
                    }
                    if (block.__typename?.endsWith("Text_block")) {
                    return <p key={i} className="mb-4">{block.content}</p>;
                    }
                    if (block.__typename?.endsWith("Image_block")) {
                    return (
                        <img
                        key={i}
                        src={block.src}
                        alt={block.alt || ""}
                        style={{
                            width: block.width || "100%",
                            height: block.height || "auto",
                        }}
                        className="my-4"
                        />
                    );
                    }
                    return null;
                })}

                {/* subsections */}
                {section.subsections?.map((subsec: any, subIndex: number) => {
                    const subsecId = generateId(subsec.title, `subsection-${index}-${subIndex}`);
                    return (
                    <div key={subIndex} id={subsecId} className="mb-12 scroll-mt-15">
                        <h2 className="text-2xl font-semibold mb-3">{subsec.title}</h2>
                        {subsec.content_blocks?.map((block: any, i: number) => {
                        if (block.__typename?.endsWith("Header_block")) {
                            return (
                            <h3 key={i} className="text-xl font-semibold mb-2">
                                {block.title}
                            </h3>
                            );
                        }
                        if (block.__typename?.endsWith("Text_block")) {
                            return <p key={i} className="mb-2">{block.content}</p>;
                        }
                        if (block.__typename?.endsWith("Image_block")) {
                            return (
                            <img
                                key={i}
                                src={block.src}
                                alt={block.alt || ""}
                                style={{
                                width: block.width || "100%",
                                height: block.height || "auto",
                                }}
                                className="my-4"
                            />
                            );
                        }
                        return null;
                        })}
                    </div>
                    );
                })}
                </section>
            );
            })}
        </main>
        </div>
    </div>
  );
}
