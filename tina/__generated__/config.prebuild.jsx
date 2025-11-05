// tina/config.js
import { defineConfig } from "tinacms";
var branch = "main";
var config_default = defineConfig({
  branch,
  clientId: "e943230e-b3f4-4e4e-8422-018352369ae9",
  token: "7d8278e35b4f1d7b7eee54de095f1201865c94d9",
  build: {
    outputFolder: "admin",
    publicFolder: "."
  },
  media: {
    tina: {
      mediaRoot: "images/uploads",
      publicFolder: "."
    }
  },
  schema: {
    collections: [
      {
        name: "hero",
        label: "Hero Section",
        path: "content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Main Title",
            required: true
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "cta_text",
            label: "CTA Button Text",
            required: true
          },
          {
            type: "object",
            name: "stats",
            label: "Statistics",
            list: true,
            fields: [
              {
                type: "string",
                name: "number",
                label: "Number"
              },
              {
                type: "string",
                name: "label",
                label: "Label"
              }
            ]
          }
        ],
        match: {
          include: "hero"
        }
      },
      {
        name: "services",
        label: "Services",
        path: "content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "ai_seo",
            label: "AI SEO Service",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "features",
                label: "Features",
                list: true
              }
            ]
          },
          {
            type: "object",
            name: "lead_gen",
            label: "Lead Generation Service",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "features",
                label: "Features",
                list: true
              }
            ]
          }
        ],
        match: {
          include: "services"
        }
      },
      {
        name: "pricing",
        label: "Pricing Plans",
        path: "content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "plans",
            label: "Plans",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Plan Name"
              },
              {
                type: "string",
                name: "price",
                label: "Price"
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "features",
                label: "Features",
                list: true
              },
              {
                type: "boolean",
                name: "featured",
                label: "Featured Plan"
              },
              {
                type: "string",
                name: "button_text",
                label: "Button Text"
              }
            ]
          }
        ],
        match: {
          include: "pricing"
        }
      },
      {
        name: "contact",
        label: "Contact Information",
        path: "content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "email",
            label: "Email Address"
          },
          {
            type: "string",
            name: "phone",
            label: "Phone Number"
          },
          {
            type: "string",
            name: "hours",
            label: "Business Hours"
          },
          {
            type: "string",
            name: "address",
            label: "Physical Address",
            ui: {
              component: "textarea"
            }
          }
        ],
        match: {
          include: "contact"
        }
      },
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blog",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Author Name",
            required: true
          },
          {
            type: "string",
            name: "author_title",
            label: "Author Title"
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              { value: "ai-seo", label: "AI SEO" },
              { value: "lead-gen", label: "Lead Generation" },
              { value: "case-study", label: "Case Study" },
              { value: "insights", label: "Industry Insights" },
              { value: "guides", label: "Guides & Tutorials" }
            ]
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            name: "featured_image",
            label: "Featured Image"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Post"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
