EMIVANT COMPLETE TRACKING UPDATE

FILES
- index.html
- thank-you.html
- privacy.html
- robots.txt
- sitemap.xml

KEEP IN THE SAME GITHUB REPOSITORY ROOT
- segun-photo.jpg

WHAT IS INCLUDED
- Google Analytics 4: G-ESNQJDYE1B
- Meta Pixel: 1032810242576149
- Cookie consent with Accept and Reject
- Meta Contact events for WhatsApp, phone and email clicks
- GA4 contact events
- Confirmed Lead/generate_lead event on thank-you.html only
- No duplicate Lead event on form submission
- Thank-you page blocked from Google indexing
- Updated privacy and cookie notice

DEPLOY
1. Replace your existing index.html and thank-you.html.
2. Upload privacy.html, robots.txt and sitemap.xml.
3. Keep segun-photo.jpg at the repository root.
4. Commit to the main branch.
5. Wait for Netlify to publish.
6. Test the Netlify form.
7. In Meta Events Manager > Test events, accept cookies and test:
   - PageView
   - Contact
   - Lead
8. In GA4 Realtime, test:
   - contact
   - generate_lead

IMPORTANT
The Lead event is fired only on thank-you.html, which means it records successful form submissions rather than attempted submissions.
