# Contact Form Event Tracking Setup

## Overview
This document describes the custom event tracking implemented for the contact form, which sends events to:
- **Google Tag Manager (GTM)**
- **Google Analytics 4 (GA4)**
- **Meta Pixel (Facebook Pixel)**

## Events Implemented

### 1. Form Start Event
**Triggered when:** User focuses on any form field for the first time

**Event Name:** `form_start`

**Data Sent:**
- `event`: "form_start"
- `form_name`: "Landing Page Contact Form"
- `form_id`: "contact_form"
- `form_type`: "contact"

---

### 2. Form Submission Event
**Triggered when:** User successfully submits the contact form

**Event Name:** `form_submission` (GTM), `form_submit` (GA4)

**Data Sent to GTM:**
```javascript
{
  event: 'form_submission',
  form_name: 'Landing Page Contact Form',
  form_id: 'contact_form',
  form_type: 'contact',
  user_name: '<user name>',
  user_email: '<user email>',
  user_phone: '<user phone>'
}
```

**Data Sent to GA4:**
```javascript
{
  form_name: 'Landing Page Contact Form',
  form_id: 'contact_form',
  form_type: 'contact'
}
```

**Data Sent to Meta Pixel:**
- Event: `Contact`
  ```javascript
  {
    content_name: 'Landing Page Contact Form',
    content_category: 'contact_form'
  }
  ```
- Event: `Lead`
  ```javascript
  {
    content_name: 'Landing Page Contact Form'
  }
  ```

---

## GTM Configuration Steps

### Step 1: Set Up Data Layer Variables

1. Go to **Variables** in GTM
2. Click **New** under User-Defined Variables
3. Create the following variables:

#### Variable: Form Name
- **Variable Type:** Data Layer Variable
- **Data Layer Variable Name:** `form_name`
- **Name:** `DLV - Form Name`

#### Variable: Form ID
- **Variable Type:** Data Layer Variable
- **Data Layer Variable Name:** `form_id`
- **Name:** `DLV - Form ID`

#### Variable: Form Type
- **Variable Type:** Data Layer Variable
- **Data Layer Variable Name:** `form_type`
- **Name:** `DLV - Form Type`

---

### Step 2: Create Custom Event Triggers

#### Trigger: Form Start
1. Go to **Triggers** → **New**
2. **Trigger Type:** Custom Event
3. **Event name:** `form_start`
4. **Name:** `CE - Form Start`

#### Trigger: Form Submission
1. Go to **Triggers** → **New**
2. **Trigger Type:** Custom Event
3. **Event name:** `form_submission`
4. **Name:** `CE - Form Submission`

---

### Step 3: Create Tags

#### Tag 1: GA4 Event - Form Start
1. Go to **Tags** → **New**
2. **Tag Type:** Google Analytics: GA4 Event
3. **Configuration Tag:** Select your GA4 Configuration tag
4. **Event Name:** `form_start`
5. **Event Parameters:**
   - `form_name`: `{{DLV - Form Name}}`
   - `form_id`: `{{DLV - Form ID}}`
6. **Triggering:** `CE - Form Start`
7. **Name:** `GA4 - Form Start`

#### Tag 2: GA4 Event - Form Submission
1. Go to **Tags** → **New**
2. **Tag Type:** Google Analytics: GA4 Event
3. **Configuration Tag:** Select your GA4 Configuration tag
4. **Event Name:** `form_submit`
5. **Event Parameters:**
   - `form_name`: `{{DLV - Form Name}}`
   - `form_id`: `{{DLV - Form ID}}`
   - `form_type`: `{{DLV - Form Type}}`
6. **Triggering:** `CE - Form Submission`
7. **Name:** `GA4 - Form Submit`

---

## Meta Pixel Setup (Facebook Pixel)

### Step 1: Install Meta Pixel

If you haven't already, add Meta Pixel to your GTM:

1. Go to **Tags** → **New**
2. **Tag Type:** Custom HTML
3. **HTML:**
```html
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```
4. Replace `YOUR_PIXEL_ID` with your actual Meta Pixel ID
5. **Triggering:** All Pages
6. **Name:** `Meta Pixel - Base Code`

### Step 2: Create Meta Pixel Conversion Tags

The code automatically sends these events when the form is submitted:
- `Contact` event
- `Lead` event

To track these in GTM as well:

#### Tag: Meta Pixel - Contact Event
1. Go to **Tags** → **New**
2. **Tag Type:** Custom HTML
3. **HTML:**
```html
<script>
  fbq('track', 'Contact', {
    content_name: '{{DLV - Form Name}}',
    content_category: 'contact_form'
  });
</script>
```
4. **Triggering:** `CE - Form Submission`
5. **Name:** `Meta Pixel - Contact`

#### Tag: Meta Pixel - Lead Event
1. Go to **Tags** → **New**
2. **Tag Type:** Custom HTML
3. **HTML:**
```html
<script>
  fbq('track', 'Lead', {
    content_name: '{{DLV - Form Name}}'
  });
</script>
```
4. **Triggering:** `CE - Form Submission`
5. **Name:** `Meta Pixel - Lead`

---

## Testing Your Setup

### 1. Test in Preview Mode

1. In GTM, click **Preview**
2. Enter your website URL
3. Fill out the contact form
4. Check in the GTM Debug panel:
   - `form_start` event fires when you focus on a field
   - `form_submission` event fires when you submit

### 2. Test with Browser Console

Open the browser console (F12) and check for these logs:
- "GTM Event pushed:" when events are sent
- "GA4 Event sent:" when GA4 events are sent
- "Meta Pixel Event sent:" when Meta Pixel events are sent

### 3. Test in GA4 Real-Time Reports

1. Go to Google Analytics
2. Navigate to **Reports** → **Real-time**
3. Fill out the form on your website
4. You should see the `form_start` and `form_submit` events appear

### 4. Test Meta Pixel Events

1. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) Chrome extension
2. Visit your website
3. Submit the form
4. The extension should show `Contact` and `Lead` events

---

## Code Files Modified

1. **`/src/types/analytics.d.ts`** - Type definitions for analytics
2. **`/src/lib/analytics.ts`** - Analytics utility functions
3. **`/src/components/form/FormContact.tsx`** - Updated form component with event tracking

---

## Event Data Flow

```
User interacts with form
         ↓
handleFormStart() fires (on first focus)
         ↓
trackFormStart() called
         ↓
         ├→ GTM dataLayer.push({ event: 'form_start', ... })
         └→ GA4 gtag('event', 'form_start', ...)

User submits form
         ↓
onSubmit() fires
         ↓
trackContactFormSubmission() called
         ↓
         ├→ GTM dataLayer.push({ event: 'form_submission', ... })
         ├→ GA4 gtag('event', 'form_submit', ...)
         └→ Meta Pixel
              ├→ fbq('track', 'Contact', ...)
              └→ fbq('track', 'Lead', ...)
```

---

## Troubleshooting

### Events not showing in GTM Debug

- Check browser console for any JavaScript errors
- Verify that GTM container ID is correct in `layout.tsx`
- Ensure `window.dataLayer` exists (check in browser console)

### Events not showing in GA4

- Verify GA4 is properly configured in GTM
- Check that your GA4 Configuration tag is firing on All Pages
- Wait a few minutes - GA4 real-time reports can have slight delays

### Meta Pixel events not tracking

- Verify Meta Pixel is installed correctly
- Check that `window.fbq` exists (check in browser console)
- Use Meta Pixel Helper extension to debug
- Verify Pixel ID is correct

---

## Additional Enhancements (Optional)

### Track Form Abandonment

Add this function to track when users start but don't complete the form:

```typescript
// In analytics.ts
export const trackFormAbandonment = (formName: string = 'Contact Form') => {
  pushToDataLayer({
    event: 'form_abandonment',
    form_name: formName,
    form_id: 'contact_form',
  });
};
```

### Track Individual Field Interactions

Already included in `analytics.ts`:

```typescript
trackFormFieldInteraction('name', 'Landing Page Contact Form');
```

Use this to track when users interact with specific fields.

---

## Best Practices

1. **Privacy Compliance:** Ensure you have proper consent before tracking user data
2. **Data Layer Structure:** Keep event names and parameters consistent
3. **Testing:** Always test in GTM Preview mode before publishing
4. **Documentation:** Update this document when adding new events
5. **PII Protection:** Consider hashing or encrypting sensitive user data before sending to analytics platforms

---

## Support

For issues or questions about this implementation, contact the development team or refer to:
- [GTM Documentation](https://developers.google.com/tag-manager)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)

