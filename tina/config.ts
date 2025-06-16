import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "your-client-id", // get from tina cloud
  token: "your-token", // get from tina cloud
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "user_manual",
        label: "User Manual",
        path: "content",
        format: "json",
        ui : {
          router: props => {
            return '/'
          }
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "sections",
            label: "Sections",
            templates: [
              {
                name: "section",
                label: "Section",
                ui: {
                  itemProps: (item) => {
                    const headerBlock = item?.content_blocks?.find(
                      (block: any) =>
                        block._template === "header_block" && block.title
                    );
                    return {
                      label: headerBlock?.title || "Untitled Section",
                    };
                  },
                },
                fields: [
                  {
                    type: "object",
                    list: true,
                    name: "content_blocks",
                    label: "Content Blocks",
                    templates: [
                      {
                        name: "header_block",
                        label: "Header",
                        fields: [
                          { name: "title", type: "string", label: "Title" },
                        ],
                      },
                      {
                        name: "text_block",
                        label: "Text",
                        fields: [
                          {
                            name: "content",
                            type: "string",
                            label: "Content",
                            ui: { component: "textarea" },
                          },
                        ],
                      },
                      {
                        name: "image_block",
                        label: "Image",
                        fields: [
                          { name: "src", type: "image", label: "Image Source" },
                          { name: "alt", type: "string", label: "Alt Text" },
                          {
                            name: "width",
                            type: "string",
                            label: "Width (optional)",
                            ui: {
                              description: "e.g. 100%, 300px, auto",
                            },
                          },
                          {
                            name: "height",
                            type: "string",
                            label: "Height (optional)",
                            ui: {
                              description: "e.g. auto, 200px",
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "object",
                    list: true,
                    name: "subsections",
                    label: "Subsections",
                    ui: {
                      itemProps: (item) => ({
                        label: item?.title || "Untitled Subsection",
                      }),
                    },
                    fields: [
                      { name: "title", type: "string", label: "Subsection Title" },
                      {
                        type: "object",
                        list: true,
                        name: "content_blocks",
                        label: "Content Blocks",
                        templates: [
                          {
                            name: "header_block",
                            label: "Header",
                            fields: [
                              { name: "title", type: "string", label: "Title" },
                            ],
                          },
                          {
                            name: "text_block",
                            label: "Text",
                            fields: [
                              {
                                name: "content",
                                type: "string",
                                label: "Content",
                                ui: { component: "textarea" },
                              },
                            ],
                          },
                          {
                            name: "image_block",
                            label: "Image",
                            fields: [
                              { name: "src", type: "image", label: "Image Source" },
                              { name: "alt", type: "string", label: "Alt Text" },
                              {
                                name: "width",
                                type: "string",
                                label: "Width (optional)",
                                ui: {
                                  description: "e.g. 100%, 300px, auto",
                                },
                              },
                              {
                                name: "height",
                                type: "string",
                                label: "Height (optional)",
                                ui: {
                                  description: "e.g. auto, 200px",
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
