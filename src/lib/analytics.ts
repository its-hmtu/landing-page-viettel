import { ContactFormData, ContactFormEvent } from '@/types/analytics';

/**
 * Push custom event to Google Tag Manager dataLayer
 * @param eventData - Event data to be sent
 */
export const pushToDataLayer = (eventData: ContactFormEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData);
    console.log('GTM Event pushed:', eventData);
  }
};

/**
 * Send event to Google Analytics 4
 * @param eventName - Name of the event
 * @param eventParams - Event parameters
 */
export const sendGA4Event = (eventName: string, eventParams: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log('GA4 Event sent:', eventName, eventParams);
  }
};

/**
 * Send event to Meta Pixel (Facebook Pixel)
 * @param eventName - Name of the event
 * @param eventParams - Event parameters
 */
export const sendMetaPixelEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventParams);
    console.log('Meta Pixel Event sent:', eventName, eventParams);
  }
};

/**
 * Track contact form submission across all platforms
 * @param formData - Contact form data
 * @param formName - Name identifier for the form
 */
export const trackContactFormSubmission = (formData: ContactFormData, formName: string = 'Contact Form') => {
  // 1. Push to GTM dataLayer
  pushToDataLayer({
    event: 'form_submission',
    form_name: formName,
    form_id: 'contact_form',
    form_type: 'contact',
    user_name: formData.name,
    user_email: formData.email,
    user_phone: formData.phone,
  });

  // 2. Send to GA4
  sendGA4Event('form_submit', {
    form_name: formName,
    form_id: 'contact_form',
    form_type: 'contact',
  });

  // 3. Send to Meta Pixel
  sendMetaPixelEvent('Contact', {
    content_name: formName,
    content_category: 'contact_form',
  });

  // Also send standard Lead event for Meta Pixel
  sendMetaPixelEvent('Lead', {
    content_name: formName,
  });
};

/**
 * Track form field interactions
 * @param fieldName - Name of the field
 * @param formName - Name identifier for the form
 */
export const trackFormFieldInteraction = (fieldName: string, formName: string = 'Contact Form') => {
  pushToDataLayer({
    event: 'form_field_interaction',
    form_name: formName,
    form_id: 'contact_form',
    form_type: 'contact',
    field_name: fieldName,
  });
};

/**
 * Track form start (when user interacts with first field)
 * @param formName - Name identifier for the form
 */
export const trackFormStart = (formName: string = 'Contact Form') => {
  pushToDataLayer({
    event: 'form_start',
    form_name: formName,
    form_id: 'contact_form',
    form_type: 'contact',
  });

  sendGA4Event('form_start', {
    form_name: formName,
    form_id: 'contact_form',
  });
};
