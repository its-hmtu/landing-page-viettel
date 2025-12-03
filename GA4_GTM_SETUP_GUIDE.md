# Google Analytics 4 (GA4) and Google Tag Manager (GTM) Setup Guide

## Overview
This guide will walk you through setting up Google Analytics 4 and Google Tag Manager for your Next.js landing page project.

---

## Prerequisites
- Google Account
- Access to [Google Analytics](https://analytics.google.com/)
- Access to [Google Tag Manager](https://tagmanager.google.com/)
- Admin access to your Next.js project

---

## Part 1: Google Tag Manager Setup

### Step 1: Create a GTM Account and Container

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click **"Create Account"**
3. Fill in the account details:
   - **Account Name**: Your company name (e.g., "Viettel Landing Page")
   - **Country**: Select your country
4. Set up a container:
   - **Container Name**: Your website name (e.g., "landing-page-viettel")
   - **Target Platform**: Select **"Web"**
5. Click **"Create"** and accept the Terms of Service
6. You'll receive two code snippets - save these for the next step

### Step 2: Install GTM in Your Next.js Project

#### Method 1: Using next/script (Recommended)

1. **Install the GTM package** (optional, for type safety):
```bash
npm install @types/gtag.js --save-dev
```

2. **Create a GTM component** at `src/components/analytics/gtm.tsx`:

```typescript
'use client';

import Script from 'next/script';

interface GTMProps {
  gtmId: string;
}

export default function GoogleTagManager({ gtmId }: GTMProps) {
  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  );
}

export function GoogleTagManagerNoScript({ gtmId }: GTMProps) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
```

3. **Create an environment variable file** `.env.local` in your project root:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Replace `GTM-XXXXXXX` with your actual GTM container ID.

4. **Update your root layout** at `src/app/layout.tsx`:

```typescript
import GoogleTagManager, { GoogleTagManagerNoScript } from '@/components/analytics/gtm';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body>
        {gtmId && <GoogleTagManagerNoScript gtmId={gtmId} />}
        {children}
      </body>
    </html>
  );
}
```

#### Method 2: Direct Installation in layout.tsx

Update your `src/app/layout.tsx`:

```typescript
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      {gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}
      <body>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
```

---

## Part 2: Google Analytics 4 Setup

### Step 1: Create a GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **"Admin"** (gear icon at bottom left)
3. Click **"Create Property"**
4. Fill in property details:
   - **Property Name**: Your website name (e.g., "Viettel Landing Page")
   - **Reporting Time Zone**: Select your timezone
   - **Currency**: Select your currency
5. Click **"Next"**
6. Fill in business details and click **"Create"**
7. Accept the Terms of Service

### Step 2: Set Up Data Stream

1. After creating the property, click **"Web"** under "Choose a platform"
2. Enter your website details:
   - **Website URL**: Your production URL
   - **Stream Name**: A descriptive name (e.g., "Viettel Landing Page - Production")
3. Click **"Create stream"**
4. You'll see your **Measurement ID** (format: G-XXXXXXXXXX) - save this

### Step 3: Connect GA4 to GTM

#### Option A: Configure GA4 Tag in GTM (Recommended)

1. Go to your GTM container
2. Click **"Tags"** in the left menu
3. Click **"New"**
4. Click on "Tag Configuration"
5. Select **"Google Analytics: GA4 Configuration"**
6. Enter your **Measurement ID** (G-XXXXXXXXXX)
7. Under "Triggering", select **"All Pages"**
8. Name your tag (e.g., "GA4 - Configuration")
9. Click **"Save"**
10. Click **"Submit"** to publish your container
11. Add a version name and description
12. Click **"Publish"**

#### Option B: Direct Installation (Not Recommended with GTM)

If you prefer direct installation without GTM, add to `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Then create `src/components/analytics/ga4.tsx`:

```typescript
'use client';

import Script from 'next/script';

interface GA4Props {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GA4Props) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  );
}
```

---

## Part 3: Verification and Testing

### Test GTM Installation

1. **Install GTM Preview Mode**:
   - In GTM, click **"Preview"** in the top right
   - Enter your website URL (localhost for development)
   - Click **"Connect"**

2. **Open your website** in a new tab
   - The GTM debugger should appear at the bottom
   - Verify that tags are firing correctly

3. **Use Google Tag Assistant** (Chrome Extension):
   - Install [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
   - Click the extension icon on your website
   - Enable recording and navigate your site
   - Verify GTM and GA4 tags are present

### Test GA4 Installation

1. **Real-time Reports**:
   - Go to Google Analytics
   - Navigate to **Reports > Realtime**
   - Open your website in another tab
   - You should see yourself as an active user

2. **DebugView**:
   - In GA4, go to **Configure > DebugView**
   - Add `?debug_mode=true` to your URL
   - Navigate around your site
   - Events should appear in DebugView

---

## Part 4: Advanced Configuration

### Track Custom Events

Create a utility file `src/lib/analytics.ts`:

```typescript
// Type definitions for GTM data layer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Push events to GTM data layer
export const pushToDataLayer = (event: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
    });
  }
};

// Track page views
export const trackPageView = (url: string) => {
  pushToDataLayer('page_view', {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  pushToDataLayer(eventName, eventParams);
};

// Example: Track button clicks
export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
  pushToDataLayer('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
  });
};

// Example: Track form submissions
export const trackFormSubmit = (formName: string, formData?: Record<string, any>) => {
  pushToDataLayer('form_submit', {
    form_name: formName,
    ...formData,
  });
};
```

### Usage Example in Components

```typescript
'use client';

import { trackButtonClick, trackFormSubmit } from '@/lib/analytics';

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission
    trackFormSubmit('contact_form', {
      form_location: 'homepage',
    });
    
    // Your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={() => trackButtonClick('get_started', 'header')}
      >
        Get Started
      </button>
      {/* More form fields */}
    </form>
  );
};
```

### Track Route Changes in Next.js App Router

Create `src/components/analytics/page-view-tracker.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}
```

Add to your layout:

```typescript
import PageViewTracker from '@/components/analytics/page-view-tracker';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
```

---

## Part 5: Common GTM Tags to Set Up

### 1. Enhanced Measurement Events

In GTM, set up these common tags:

- **Scroll Tracking**: Track how far users scroll
- **Outbound Link Clicks**: Track clicks on external links
- **File Downloads**: Track PDF/document downloads
- **Video Engagement**: Track video plays/pauses

### 2. Contact Form Submissions

1. In GTM, create a new **Trigger**:
   - Type: **Form Submission**
   - Name: "Contact Form Submit"
   - This trigger fires on: **Some Forms**
   - Fire this trigger when: Form ID equals `contact-form`

2. Create a new **Tag**:
   - Type: **GA4 Event**
   - Event Name: `form_submit`
   - Parameters:
     - `form_name`: `contact_form`
     - `form_location`: (use a variable)
   - Triggering: Use the "Contact Form Submit" trigger

### 3. Button Click Tracking

1. Enable **Built-in Variables** in GTM:
   - Click **Variables**
   - Click **Configure**
   - Enable: Click Element, Click Classes, Click ID, Click Text

2. Create a **Trigger**:
   - Type: **Click - All Elements**
   - Name: "CTA Button Clicks"
   - Fire on: **Some Clicks**
   - Condition: Click Classes contains `cta-button` (or your button class)

3. Create a **Tag**:
   - Type: **GA4 Event**
   - Event Name: `button_click`
   - Parameters:
     - `button_text`: {{Click Text}}
     - `button_class`: {{Click Classes}}
   - Triggering: "CTA Button Clicks"

---

## Part 6: Environment-Specific Setup

### Development vs Production

Update your `.env.local` for development:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX-DEV
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX-DEV
```

Update your `.env.production` for production:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX-PROD
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX-PROD
```

### Conditional Loading

Update your GTM component to only load in production:

```typescript
export default function GoogleTagManager({ gtmId }: GTMProps) {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    return null; // Don't load in development
  }

  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `...`,
      }}
    />
  );
}
```

---

## Part 7: Privacy and Compliance

### Cookie Consent Integration

Consider adding a cookie consent banner before loading GTM:

```typescript
'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function ConditionalGTM({ gtmId }: { gtmId: string }) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookie-consent') === 'true';
    setConsent(hasConsent);
  }, []);

  if (!consent) {
    return null;
  }

  return <GoogleTagManager gtmId={gtmId} />;
}
```

### GDPR Compliance

In GTM, set up **Consent Mode**:

1. Add this code before the GTM script:

```typescript
<Script
  id="gtm-consent"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'wait_for_update': 500
      });
    `,
  }}
/>
```

2. Update consent when user accepts:

```typescript
const grantConsent = () => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'consent_update',
      ad_storage: 'granted',
      analytics_storage: 'granted'
    });
  }
  localStorage.setItem('cookie-consent', 'true');
};
```

---

## Part 8: Troubleshooting

### Common Issues

1. **GTM Container Not Loading**
   - Check if GTM ID is correct in `.env.local`
   - Verify the script is in the `<head>` section
   - Check browser console for errors
   - Ensure ad blockers are disabled during testing

2. **GA4 Not Receiving Data**
   - Verify Measurement ID is correct
   - Check that GA4 tag is firing in GTM Preview
   - Wait 24-48 hours for data to fully process
   - Check DebugView for real-time events

3. **Events Not Tracking**
   - Verify triggers are set up correctly in GTM
   - Check dataLayer in browser console: `console.log(window.dataLayer)`
   - Use GTM Preview mode to debug
   - Ensure event names match between code and GA4

4. **Next.js Hydration Errors**
   - Use `suppressHydrationWarning` on HTML tag if needed
   - Ensure scripts use `strategy="afterInteractive"`
   - Check that noscript tag is inside `<body>`

### Debugging Commands

```javascript
// Check if GTM is loaded
console.log(window.google_tag_manager);

// Check dataLayer contents
console.log(window.dataLayer);

// Manually push event to test
window.dataLayer.push({
  event: 'test_event',
  test_param: 'test_value'
});
```

---

## Part 9: Best Practices

1. **Use GTM for All Tracking**: Instead of hardcoding GA4, use GTM to manage all tags
2. **Test Before Publishing**: Always use GTM Preview mode before publishing changes
3. **Version Control**: Add meaningful descriptions when publishing GTM versions
4. **Environment Separation**: Use different containers for dev/staging/production
5. **Document Your Setup**: Keep track of all tags, triggers, and variables
6. **Regular Audits**: Periodically review and clean up unused tags
7. **Performance**: Minimize the number of tags and use async loading
8. **Data Layer**: Use a consistent data layer structure across your site

---

## Part 10: Resources

### Official Documentation
- [Google Tag Manager](https://support.google.com/tagmanager)
- [Google Analytics 4](https://support.google.com/analytics/answer/10089681)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

### Useful Tools
- [Google Tag Assistant](https://tagassistant.google.com/)
- [GA Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger)
- [GTM Preview Mode](https://support.google.com/tagmanager/answer/6107056)

### Testing URLs
- GTM Preview: `https://tagmanager.google.com/`
- GA4 DebugView: `https://analytics.google.com/` → Configure → DebugView
- GA4 Realtime: `https://analytics.google.com/` → Reports → Realtime

---

## Next Steps

1. ✅ Create GTM account and container
2. ✅ Install GTM in your Next.js app
3. ✅ Create GA4 property
4. ✅ Connect GA4 to GTM
5. ✅ Test installation using Preview mode
6. ✅ Set up custom events for your site
7. ✅ Configure enhanced measurement
8. ✅ Add cookie consent (if required)
9. ✅ Monitor and optimize based on data

---

**Note**: Remember to add `.env.local` to your `.gitignore` file to keep your tracking IDs private in development. For production, set environment variables in your hosting platform (Vercel, Netlify, etc.).
