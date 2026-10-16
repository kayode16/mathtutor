/* MathTutor Nigeria — consent-gated Google Analytics 4 and Meta Pixel.
   IDs retained from the already-published GitHub repository.
   Optional third-party analytics/ads are NOT loaded until accepted. */
(function(){
  'use strict';
  const CONSENT_KEY = 'emivant_cookie_consent'; // preserve previous visitors' choice
  const GA_ID = 'G-ESNQJDYE1B';
  const META_ID = '1032810242576149';
  let trackingReady=false;
  function readConsent(){try{return localStorage.getItem(CONSENT_KEY)}catch(e){return null}}
  function writeConsent(choice){try{localStorage.setItem(CONSENT_KEY,choice)}catch(e){}}
  function getSession(k){try{return sessionStorage.getItem(k)}catch(e){return null}}
  function setSession(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}
  function loadTracking(){
    if(trackingReady || readConsent()!=='accepted')return;
    trackingReady=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
    gtag('consent','default',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
    gtag('js',new Date());
    gtag('config', GA_ID, {anonymize_ip:true});
    const google=document.createElement('script');google.async=true;google.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;document.head.appendChild(google);
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_ID);fbq('track','PageView');
  }
  function trackContact(type){
    if(readConsent()!=='accepted')return;
    loadTracking();
    if(typeof gtag==='function')gtag('event','contact',{contact_method:type});
    if(typeof fbq==='function')fbq('track','Contact',{contact_method:type});
  }
  function hideWidget(){const w=document.querySelector('#mt-cookie-widget');if(w)w.hidden=true;}
  function onConsent(choice){writeConsent(choice);hideWidget();if(choice==='accepted')loadTracking();}
  function handleLead(){
    if(!document.documentElement.hasAttribute('data-mt-confirmation'))return;
    if(readConsent()!=='accepted')return;
    const submitted=Number(getSession('mt-assessment-form-sent'));
    if(!submitted||Date.now()-submitted>600000||getSession('mt-lead-tracked')==='yes')return;
    loadTracking();
    if(typeof gtag==='function')gtag('event','generate_lead',{form_name:'free-mathematics-assessment'});
    if(typeof fbq==='function')fbq('track','Lead',{source:'free_assessment_form'});
    setSession('mt-lead-tracked','yes');
  }
  function setup(){
    const widget=document.querySelector('#mt-cookie-widget');
    if(widget){
      const wantsSettings=new URLSearchParams(location.search).has('cookie-settings');
      widget.hidden=!!readConsent()&&!wantsSettings;
      document.querySelector('#mt-cookie-accept')?.addEventListener('click',()=>onConsent('accepted'));
      document.querySelector('#mt-cookie-reject')?.addEventListener('click',()=>onConsent('rejected'));
    }
    if(readConsent()==='accepted')loadTracking();
    document.querySelectorAll('a[href]').forEach(link=>{
      let type=null;const href=link.getAttribute('href')||'';
      if(href.startsWith('https://wa.me/'))type='whatsapp';else if(href.startsWith('tel:'))type='phone';else if(href.startsWith('mailto:'))type='email';
      if(type)link.addEventListener('click',()=>trackContact(type));
    });
    document.querySelector('#assessment-form')?.addEventListener('submit',()=>{
      setSession('mt-assessment-form-sent',String(Date.now()));
      setSession('mt-lead-tracked','no');
      if(readConsent()==='accepted'&&typeof gtag==='function')gtag('event','form_submit_attempt',{form_name:'free-mathematics-assessment'});
    });
    handleLead();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
