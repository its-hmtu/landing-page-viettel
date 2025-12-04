// Type definitions for analytics events

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    ttq?: {
      track: (eventName: string, eventParams?: Record<string, any>) => void;
      page: () => void;
    };
  }
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

export interface ContactFormEvent {
  event: string;
  form_name: string;
  form_id: string;
  form_type: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  field_name?: string;
}

export {};
