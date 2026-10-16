(() => {
  'use strict';
  const cfg = window.MathTutorContent || {};
  const preview = window.MathTutorPreview === true || new URLSearchParams(location.search).has('preview');
  const $ = q => document.querySelector(q);
  const el = (tag, css, content) => { const node=document.createElement(tag); if(css)node.className=css; if(content!==undefined)node.textContent=content; return node; };
  const getId = url => {
    try { const u=new URL(url); let id='';
      if(['youtu.be','www.youtu.be'].includes(u.hostname)) id=u.pathname.slice(1).split('/')[0];
      else if(['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(u.hostname))
        id=u.pathname==='/watch' ? u.searchParams.get('v') : u.pathname.split('/')[2];
      return /^[\w-]{11}$/.test(id || '') ? id : null;
    } catch { return null; }
  };
  const gallery=$('#youtube-gallery');
  if (gallery) {
    (cfg.youtubeVideos || []).forEach((v,i)=>{
      const id=getId(v.url); if(!id)return;
      const card=el('article','video-card');
      const poster=el('div','video-poster');
      poster.classList.add('video-poster-has-thumb');
      const thumb=el('img','video-thumb');thumb.src=`https://i.ytimg.com/vi/${id}/hqdefault.jpg`;thumb.alt='';thumb.loading='lazy';thumb.decoding='async';
      thumb.addEventListener('error',()=>thumb.hidden=true);
      poster.append(thumb);
      const btn=el('button','video-play','▶');btn.type='button';btn.setAttribute('aria-label',`Play YouTube video ${i+1}`);
      btn.addEventListener('click',()=>{
        const frame=document.createElement('iframe');frame.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
        frame.title=v.title || `MathTutor Nigeria video ${i+1}`;
        frame.loading='lazy';frame.referrerPolicy='strict-origin-when-cross-origin';frame.allowFullscreen=true;
        frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        poster.replaceChildren(frame);poster.classList.add('is-playing');
      });
      poster.append(btn);
      const body=el('div','video-body');body.append(el('span','video-tag','WATCH & LEARN'),el('h3','',v.title||`Featured video ${i+1}`),el('p','',v.description||'View this video from our selected YouTube links.'));
      const link=el('a','video-external','View on YouTube ↗');link.href=`https://www.youtube.com/watch?v=${id}`;link.target='_blank';link.rel='noopener noreferrer';body.append(link);
      card.append(poster,body);gallery.append(card);
    });
    if(gallery.children.length)$('#videos').hidden=false;
  }
  const feedback=$('#testimonial-gallery');
  if(feedback) {
    let unpublished=0;
    (cfg.whatsappTestimonials||[]).forEach(t=>{
      const path=String(t.image||'');
      if(!/^assets\/testimonials\/[\w-]+\.(webp|png|jpe?g)$/i.test(path))return;
      if(!(t.approvedForPublication || (preview&&t.previewBeforeConsent)))return;
      const box=el('figure','testimonial-card');
      if(!t.approvedForPublication) {box.classList.add('approval-pending');unpublished++;}
      const link=el('a','testimonial-image-link');link.href=path;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label','Open privacy-cropped testimonial image');
      const pic=document.createElement('img');pic.src=path;pic.alt=t.alt||'An anonymised WhatsApp message about tutoring';pic.loading='lazy';pic.decoding='async';
      link.append(pic);box.append(link,el('figcaption','',t.caption||'Learner feedback'));
      if(!t.approvedForPublication)box.append(el('div','approval-tag','PREVIEW — approval needed before publishing'));
      feedback.append(box);
    });
    const section=$('#testimonials');
    if(feedback.children.length) {
      section.hidden=false;
      if(unpublished) {
        const note=el('p','preview-banner','DESIGN PREVIEW: These four anonymised WhatsApp screenshots are visible only in preview. Get each sender’s permission (and guardian permission for minors) before enabling them on the live website.');
        feedback.before(note);
      }
    } else document.querySelectorAll('a[href="#testimonials"]').forEach(link=>link.hidden=true);
  }
  const google=cfg.googleBusiness||{};
  const businessLink=$('#google-profile-link');
  if(businessLink && /^https:\/\/(share\.google|(?:www\.)?google\.com\/maps\/)/.test(google.profileUrl||'')) businessLink.href=google.profileUrl;
  const fallback=$('#google-fallback-link');
  if(fallback && /^https:\/\/(www\.)?google\.com\/maps\//.test(google.fallbackMapsUrl||'')) fallback.href=google.fallbackMapsUrl;
  const review=$('#google-review-link');
  if(review && google.reviewRequestUrl){
    try{const u=new URL(google.reviewRequestUrl);if(u.protocol==='https:' && /(^|\.)(google\.com|g\.page)$/.test(u.hostname)){review.href=u.href;review.hidden=false;}}catch{}
  }
})();