# 🔧 Cloudflare Pages OAuth Fix

## The Problem

Cloudflare Pages doesn't have the same OAuth backend as Netlify, so `api.netlify.com/auth/done` doesn't work.

## The Solution

I've created a custom OAuth handler using Cloudflare Pages Functions. Now you need to update your GitHub OAuth App.

---

## 📋 STEP 1: Update GitHub OAuth App Callback URL

1. Go to: https://github.com/settings/developers

2. Click **"OAuth Apps"** → Click **"Traction Admin"**

3. **Change the "Authorization callback URL" to:**
   ```
   https://traction-ai-seo.pages.dev/api/auth
   ```

4. Click **"Update application"** at the bottom

---

## 📤 STEP 2: Upload New Files to GitHub

You need to upload TWO files that I just created:

### File 1: admin/config.yml (Updated)

1. Go to: https://github.com/karanpuri1406-sys/traction-website

2. Navigate to **admin** folder → Click **config.yml**

3. Click the **pencil icon** (✏️ Edit)

4. **Replace ALL content** with this:

```yaml
backend:
  name: github
  repo: karanpuri1406-sys/traction-website
  branch: main
  base_url: https://traction-ai-seo.pages.dev
  auth_endpoint: api/auth

media_folder: "images/uploads"
public_folder: "/images/uploads"

collections:
  # Homepage Content
  - name: "homepage"
    label: "Homepage"
    files:
      - label: "Hero Section"
        name: "hero"
        file: "content/hero.json"
        fields:
          - { label: "Main Title", name: "title", widget: "string" }
          - { label: "Subtitle", name: "subtitle", widget: "text" }
          - { label: "CTA Button Text", name: "cta_text", widget: "string" }
          - label: "Statistics"
            name: "stats"
            widget: "list"
            fields:
              - { label: "Number", name: "number", widget: "string" }
              - { label: "Label", name: "label", widget: "string" }

      - label: "Services"
        name: "services"
        file: "content/services.json"
        fields:
          - label: "AI SEO Service"
            name: "ai_seo"
            widget: "object"
            fields:
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Description", name: "description", widget: "text" }
              - label: "Features"
                name: "features"
                widget: "list"
                field: { label: "Feature", name: "feature", widget: "string" }
          - label: "Lead Generation Service"
            name: "lead_gen"
            widget: "object"
            fields:
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Description", name: "description", widget: "text" }
              - label: "Features"
                name: "features"
                widget: "list"
                field: { label: "Feature", name: "feature", widget: "string" }

      - label: "Pricing Plans"
        name: "pricing"
        file: "content/pricing.json"
        fields:
          - label: "Plans"
            name: "plans"
            widget: "list"
            fields:
              - { label: "Plan Name", name: "name", widget: "string" }
              - { label: "Price", name: "price", widget: "string" }
              - { label: "Description", name: "description", widget: "text" }
              - label: "Features"
                name: "features"
                widget: "list"
                field: { label: "Feature", name: "feature", widget: "string" }
              - { label: "Is Featured", name: "featured", widget: "boolean", default: false }
              - { label: "Button Text", name: "button_text", widget: "string" }

      - label: "Contact Information"
        name: "contact"
        file: "content/contact.json"
        fields:
          - { label: "Email", name: "email", widget: "string" }
          - { label: "Phone", name: "phone", widget: "string" }
          - { label: "Business Hours", name: "hours", widget: "string" }
          - { label: "Address", name: "address", widget: "text", required: false }

  # Blog Posts
  - name: "blog"
    label: "Blog Posts"
    folder: "content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Author", name: "author", widget: "string" }
      - { label: "Author Title", name: "author_title", widget: "string" }
      - label: "Category"
        name: "category"
        widget: "select"
        options:
          - { label: "AI SEO", value: "ai-seo" }
          - { label: "Lead Generation", value: "lead-gen" }
          - { label: "Case Study", value: "case-study" }
          - { label: "Industry Insights", value: "insights" }
          - { label: "Guides & Tutorials", value: "guides" }
      - { label: "Excerpt", name: "excerpt", widget: "text" }
      - { label: "Featured Image", name: "featured_image", widget: "image", required: false }
      - { label: "Body", name: "body", widget: "markdown" }
      - { label: "Featured Post", name: "featured", widget: "boolean", default: false }

  # Testimonials
  - name: "testimonials"
    label: "Testimonials"
    folder: "content/testimonials"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Client Name", name: "name", widget: "string" }
      - { label: "Client Title", name: "title", widget: "string" }
      - { label: "Company", name: "company", widget: "string" }
      - { label: "Testimonial Text", name: "text", widget: "text" }
      - { label: "Rating", name: "rating", widget: "number", min: 1, max: 5, default: 5 }
      - { label: "Client Photo", name: "photo", widget: "image", required: false }

  # Case Studies / Results
  - name: "results"
    label: "Results & Case Studies"
    folder: "content/results"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Client Type", name: "client_type", widget: "string" }
      - { label: "Metric Value", name: "metric_value", widget: "string" }
      - { label: "Metric Label", name: "metric_label", widget: "string" }
      - { label: "Description", name: "description", widget: "text" }

  # Site Settings
  - name: "settings"
    label: "Site Settings"
    files:
      - label: "General Settings"
        name: "general"
        file: "content/settings/general.json"
        fields:
          - { label: "Site Title", name: "site_title", widget: "string" }
          - { label: "Site Description", name: "site_description", widget: "text" }
          - { label: "Company Name", name: "company_name", widget: "string" }
          - { label: "Logo Text", name: "logo_text", widget: "string" }
          - label: "Social Media Links"
            name: "social"
            widget: "object"
            fields:
              - { label: "Twitter URL", name: "twitter", widget: "string", required: false }
              - { label: "LinkedIn URL", name: "linkedin", widget: "string", required: false }
              - { label: "Facebook URL", name: "facebook", widget: "string", required: false }
              - { label: "Instagram URL", name: "instagram", widget: "string", required: false }
          - label: "SEO Settings"
            name: "seo"
            widget: "object"
            fields:
              - { label: "Meta Keywords", name: "keywords", widget: "string" }
              - { label: "OG Image", name: "og_image", widget: "image", required: false }
              - { label: "Google Analytics ID", name: "ga_id", widget: "string", required: false }

      - label: "Navigation Menu"
        name: "navigation"
        file: "content/settings/navigation.json"
        fields:
          - label: "Menu Items"
            name: "menu_items"
            widget: "list"
            fields:
              - { label: "Label", name: "label", widget: "string" }
              - { label: "Link", name: "link", widget: "string" }
              - { label: "Order", name: "order", widget: "number", default: 1 }
```

5. Scroll down and click **"Commit changes"**

### File 2: functions/api/auth.js (New File)

1. Go back to your repo root: https://github.com/karanpuri1406-sys/traction-website

2. Click **"Add file"** → **"Create new file"**

3. In the filename box at the top, type: `functions/api/auth.js`
   (This will automatically create the `functions/api/` folders)

4. Paste this code:

```javascript
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Get the authorization code from GitHub
  const code = url.searchParams.get('code');
  
  if (!code) {
    // Redirect to GitHub for authorization
    const clientId = env.OAUTH_GITHUB_CLIENT_ID;
    const redirectUri = `${url.origin}/api/auth`;
    const scope = 'repo,user';
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    return Response.redirect(githubAuthUrl, 302);
  }
  
  // Exchange code for access token
  const clientId = env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = env.OAUTH_GITHUB_CLIENT_SECRET;
  
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    }),
  });
  
  const tokenData = await tokenResponse.json();
  
  if (tokenData.error) {
    return new Response(JSON.stringify({ error: tokenData.error_description }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // Return the token in the format Decap CMS expects
  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Authenticating...</title>
    </head>
    <body>
      <script>
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: 'github' })}',
          window.location.origin
        );
        window.close();
      </script>
    </body>
    </html>
  `;
  
  return new Response(content, {
    headers: { 'Content-Type': 'text/html' },
  });
}
```

5. Scroll down and click **"Commit new file"**

---

## ⏳ STEP 3: Wait for Cloudflare Deployment

1. Go to: https://dash.cloudflare.com/

2. Navigate to: **Workers & Pages** → **traction-ai-seo** → **Deployments**

3. You'll see a new deployment starting automatically

4. **Wait 60-90 seconds** until it shows "Success" with a green checkmark

---

## 🎉 STEP 4: Test Login

1. **Close all browser tabs**

2. **Open a NEW incognito window**

3. Go to: `https://traction-ai-seo.pages.dev/admin/`

4. Click **"Login with GitHub"**

5. **This time it should work!**
   - GitHub authorization page will appear
   - Click "Authorize"
   - You'll be redirected to the CMS dashboard

---

## ✅ Why This Works

- ❌ **Before:** Used `api.netlify.com/auth/done` (only works on Netlify)
- ✅ **Now:** Uses `https://traction-ai-seo.pages.dev/api/auth` (custom Cloudflare Pages Function)

The Cloudflare Pages Function handles the OAuth flow directly on your domain!

---

## 🆘 Still Having Issues?

If it still doesn't work:

1. Press **F12** in the browser
2. Go to **Console** tab
3. Screenshot any red errors
4. Share with me

---

## 🎯 Quick Checklist

- [ ] Updated GitHub OAuth App callback URL to: `https://traction-ai-seo.pages.dev/api/auth`
- [ ] Updated admin/config.yml on GitHub
- [ ] Created functions/api/auth.js on GitHub
- [ ] Waited for Cloudflare deployment to finish
- [ ] Tested in fresh incognito window

---

**Start with Step 1: Update the GitHub OAuth App callback URL!** 🚀
