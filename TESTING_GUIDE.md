# Quick Testing Guide for Contact Form Events

## Testing the Implementation

### 1. Browser Console Testing

Open your browser's Developer Console (F12) and navigate to the Console tab.

Fill out and submit the contact form. You should see these console logs:

```
GTM Event pushed: {event: "form_start", form_name: "Landing Page Contact Form", ...}
GA4 Event sent: form_start {...}
GTM Event pushed: {event: "form_submission", form_name: "Landing Page Contact Form", ...}
GA4 Event sent: form_submit {...}
Meta Pixel Event sent: Contact {...}
Meta Pixel Event sent: Lead {...}
TikTok Pixel Event sent: SubmitForm {...}
TikTok Pixel Event sent: Contact {...}
```

### 2. Verify dataLayer in Console

Type this in the browser console:
```javascript
window.dataLayer
```

You should see an array containing your events.

### 3. GTM Preview Mode

1. Go to GTM → **Preview** → Enter your website URL
2. Fill out the form
3. In the GTM Debug panel:
   - Look for `form_start` event when you focus on any field
   - Look for `form_submission` event when you submit

### 4. GA4 Real-Time Events

1. Go to Google Analytics
2. **Reports** → **Realtime** → **Event count by Event name**
3. You should see:
   - `form_start`
   - `form_submit`

### 5. Meta Pixel Testing

Install the [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) extension, then:
1. Visit your website
2. Submit the form
3. Click the extension icon - it should show `Contact` and `Lead` events

## Events Summary

| Event | Platform | Trigger |
|-------|----------|---------|
| `form_start` | GTM, GA4 | User focuses on any form field (first time only) |
| `form_submission` | GTM | Form successfully submitted |
| `form_submit` | GA4 | Form successfully submitted |
| `Contact` | Meta Pixel | Form successfully submitted |
| `Lead` | Meta Pixel | Form successfully submitted |
| `SubmitForm` | TikTok Pixel | Form successfully submitted |
| `Contact` | TikTok Pixel | Form successfully submitted |

## Troubleshooting

**No console logs appearing:**
- Check if you're on a production build (console.logs work in development)
- Verify the imports in `FormContact.tsx`

**GTM events not firing:**
- Verify GTM container ID is correct in `src/app/layout.tsx`
- Check if `window.dataLayer` exists in console

**GA4 events not showing:**
- Ensure GA4 is configured in GTM
- Check GA4 Configuration tag is firing on all pages
- Wait 1-2 minutes for real-time reports to update

**Meta Pixel not tracking:**
- Verify Meta Pixel base code is installed
- Check if `window.fbq` exists in console
- Ensure Pixel ID is correct

**TikTok Pixel not tracking:**
- Verify TikTok Pixel base code is installed in GTM
- Check if `window.ttq` exists in console
- Ensure TikTok Pixel ID is correct
- Verify pixel is published in TikTok Events Manager

