# TikTok Pixel Setup Guide

## Overview

This guide walks you through setting up TikTok Pixel for your landing page to track conversions and optimize your TikTok ad campaigns.

---

## Prerequisites

- TikTok Ads Manager account
- Access to [TikTok Ads Manager](https://ads.tiktok.com/)
- Google Tag Manager already configured (GTM-M7CJMKX6)

---

## Step 1: Get Your TikTok Pixel ID

### 1.1 Create a TikTok Pixel

1. Log in to [TikTok Ads Manager](https://ads.tiktok.com/)
2. Navigate to **Assets** → **Events**
3. Click **Manage** under Web Events
4. Click **Create Pixel**
5. Choose **Standard Mode** (easier setup via GTM)
6. Give your pixel a name (e.g., "Viettel Landing Page Pixel")
7. Click **Next**
8. Choose **Manually Install Pixel Code** → **Next**
9. You'll see your Pixel ID - **copy this ID** (format: `XXXXXXXXXXXXXX`)

---

## Step 2: Install TikTok Pixel in GTM

### 2.1 Create TikTok Pixel Base Code Tag

1. Go to your [Google Tag Manager](https://tagmanager.google.com/)
2. Select your container (GTM-M7CJMKX6)
3. Go to **Tags** → **New**
4. **Tag Configuration:**
   - Click tag configuration area
   - Choose **Custom HTML**
5. **HTML Code:**

```html
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

  ttq.load('YOUR_TIKTOK_PIXEL_ID');
  ttq.page();
}(window, document, 'ttq');
</script>
```

6. Replace `YOUR_TIKTOK_PIXEL_ID` with your actual TikTok Pixel ID
7. **Triggering:**
   - Click **Triggering**
   - Select **All Pages**
8. **Name:** `TikTok Pixel - Base Code`
9. Click **Save**

### 2.2 Create Form Submission Event Tags

Your contact form is already configured to send TikTok Pixel events automatically via the code. However, you can also track these events in GTM for better visibility.

#### Tag 1: TikTok Pixel - SubmitForm Event

1. **Tags** → **New**
2. **Tag Type:** Custom HTML
3. **HTML:**

```html
<script>
  if (window.ttq) {
    ttq.track('SubmitForm', {
      content_name: '{{DLV - Form Name}}',
      content_type: 'contact_form'
    });
  }
</script>
```

4. **Triggering:** Select `CE - Form Submission` (custom event trigger)
5. **Name:** `TikTok Pixel - Submit Form`
6. Click **Save**

#### Tag 2: TikTok Pixel - Contact Event

1. **Tags** → **New**
2. **Tag Type:** Custom HTML
3. **HTML:**

```html
<script>
  if (window.ttq) {
    ttq.track('Contact', {
      content_name: '{{DLV - Form Name}}'
    });
  }
</script>
```

4. **Triggering:** Select `CE - Form Submission` (custom event trigger)
5. **Name:** `TikTok Pixel - Contact`
6. Click **Save**

---

## Step 3: Publish Changes

1. In GTM, click **Submit** (top right)
2. Add a **Version Name**: "Added TikTok Pixel tracking"
3. Add a **Version Description**: "Installed TikTok Pixel base code and form submission events"
4. Click **Publish**

---

## Step 4: Test Your TikTok Pixel

### 4.1 Test with TikTok Pixel Helper

1. Install [TikTok Pixel Helper](https://chrome.google.com/webstore/detail/tiktok-pixel-helper/) Chrome extension
2. Visit your website
3. Click the TikTok Pixel Helper icon
4. You should see:
   - **PageView** event firing
5. Fill out and submit the contact form
6. You should see:
   - **SubmitForm** event
   - **Contact** event

### 4.2 Test with Browser Console

1. Open your website
2. Press F12 to open Developer Tools
3. Go to **Console** tab
4. Type: `window.ttq`
5. You should see the TikTok Pixel object (not undefined)
6. Submit the contact form
7. Look for console logs: "TikTok Pixel Event sent: SubmitForm" and "TikTok Pixel Event sent: Contact"

### 4.3 Test in TikTok Events Manager

1. Go to [TikTok Ads Manager](https://ads.tiktok.com/)
2. Navigate to **Assets** → **Events**
3. Click **Manage** next to your pixel
4. Go to **Test Events** tab
5. Visit your website and submit the form
6. Events should appear in real-time in the Test Events view

---

## Step 5: Verify in TikTok Events Manager

1. After testing, go to **Assets** → **Events**
2. Click on your pixel name
3. Check the **Overview** tab
4. You should see:
   - **PageView** events
   - **SubmitForm** events
   - **Contact** events
5. Data may take 15-30 minutes to appear in reports

---

## TikTok Standard Events Used

| Event Name | Purpose | When It Fires |
|------------|---------|---------------|
| `PageView` | Track page views | Every page load |
| `SubmitForm` | Track form submissions | When contact form is submitted |
| `Contact` | Track contact attempts | When contact form is submitted |

---

## Advanced Configuration (Optional)

### Enable Advanced Matching

Advanced matching can help improve conversion tracking by sending hashed user information.

**Note:** Only use if you have proper consent and comply with privacy regulations.

Update the base code to include advanced matching:

```html
<script>
!function (w, d, t) {
  // ... (existing code)
  
  ttq.load('YOUR_TIKTOK_PIXEL_ID');
  
  // Advanced matching (optional)
  ttq.identify({
    email: '', // User email (will be hashed automatically)
    phone_number: '', // User phone (will be hashed automatically)
  });
  
  ttq.page();
}(window, document, 'ttq');
</script>
```

---

## Troubleshooting

### Pixel Not Firing

**Problem:** TikTok Pixel Helper shows no events

**Solutions:**
- Verify Pixel ID is correct in GTM
- Check that GTM container is published
- Clear browser cache and reload
- Ensure ad blockers are disabled during testing

### Events Not Showing in TikTok Ads Manager

**Problem:** Test events don't appear in TikTok Events Manager

**Solutions:**
- Wait 5-10 minutes (there can be delays)
- Verify pixel status is "Active" in Events Manager
- Check that you're looking at the correct pixel
- Ensure your IP isn't blocked by ad blockers

### `window.ttq` is undefined

**Problem:** Console shows ttq is not defined

**Solutions:**
- Verify TikTok Pixel base code tag is firing on All Pages
- Check GTM Preview mode to see if tag fires
- Look for JavaScript errors in console
- Ensure script isn't blocked by Content Security Policy

---

## Integration with Contact Form

The contact form code in `/src/lib/analytics.ts` automatically sends TikTok Pixel events when the form is submitted. The events sent are:

1. **SubmitForm** - Standard TikTok event for form submissions
2. **Contact** - Standard TikTok event for contact actions

These events help optimize your TikTok ad campaigns by:
- Tracking conversion events
- Building custom audiences
- Enabling campaign optimization
- Measuring ROI

---

## Privacy & Compliance

### GDPR & Privacy Considerations

1. **User Consent:** Obtain explicit consent before loading TikTok Pixel
2. **Privacy Policy:** Update your privacy policy to mention TikTok tracking
3. **Cookie Consent:** Implement cookie consent banner if required
4. **Data Processing Agreement:** Review TikTok's data processing terms

### Disabling TikTok Pixel for Specific Users

If you need to disable tracking based on user consent:

```javascript
// Disable TikTok Pixel
if (window.ttq) {
  ttq.disableCookie();
}
```

---

## Using TikTok Pixel Data

### Create Custom Audiences

1. Go to **Assets** → **Audiences**
2. Click **Create Audience** → **Website Traffic**
3. Select your pixel
4. Choose event: `SubmitForm` or `Contact`
5. Set time window (e.g., last 30 days)
6. Create audience

### Set Up Conversions for Campaign Optimization

1. When creating a campaign, go to **Optimization Goal**
2. Select **Custom Conversion**
3. Choose your pixel
4. Select event: `Contact` or `SubmitForm`
5. TikTok will optimize ad delivery to users likely to complete this action

---

## Best Practices

1. **Test Before Launch:** Always test in GTM Preview mode
2. **Monitor Events:** Check TikTok Events Manager regularly
3. **Use Standard Events:** Stick to TikTok's standard events when possible
4. **Consistent Naming:** Keep event names consistent across platforms
5. **Document Changes:** Track what events you're measuring and why

---

## Support & Resources

- [TikTok Pixel Documentation](https://ads.tiktok.com/help/article/standard-mode-pixel)
- [TikTok Events Manager Guide](https://ads.tiktok.com/help/article/events-manager)
- [TikTok Pixel Helper Extension](https://chrome.google.com/webstore/detail/tiktok-pixel-helper/)
- [TikTok Ads Support](https://ads.tiktok.com/help/)

---

## Next Steps

After setting up TikTok Pixel:

1. ✅ Verify pixel is firing correctly
2. ✅ Test form submission events
3. ✅ Create custom audiences based on pixel events
4. ✅ Set up conversion tracking in TikTok campaigns
5. ✅ Monitor performance in TikTok Events Manager

