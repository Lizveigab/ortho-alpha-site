/* Ortho Alpha: Ads WhatsApp click, never a confirmed appointment. */
(function () {
  'use strict';
  if (window.__oaAdsWhatsAppInstalled) return;
  window.__oaAdsWhatsAppInstalled = true;
  // Preview/local visits must not pollute the clinic's conversions.
  if (!['orthoalpha.com.br', 'www.orthoalpha.com.br'].includes(location.hostname)) return;
  const adsId = 'AW-18593554233';
  const destination = adsId + '/3jxZCMOR274dELm-jKJF';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', adsId, {
    allow_enhanced_conversions: false,
    allow_ad_personalization_signals: false,
    page_location: location.origin + location.pathname,
    page_title: 'Ortho Alpha'
  });
  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + adsId;
    document.head.appendChild(script);
  }
  document.addEventListener('click', function (event) {
    const link = event.target && event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    let target;
    try { target = new URL(link.href, location.href); } catch (_) { return; }
    const isWhatsApp = target.protocol === 'whatsapp:' ||
      (target.protocol === 'https:' && ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(target.hostname));
    if (!isWhatsApp) return;
    // No link URL, phone, prefilled message, patient identity or clinical fields.
    window.gtag('event', 'conversion', {
      send_to: destination,
      page_location: location.origin + location.pathname,
      page_title: 'Ortho Alpha'
    });
    // Preserve normal navigation and new-tab behavior.
  }, true);
})();
