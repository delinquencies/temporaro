/* Separate collection discovery and purchase-interest flow. No payment credentials here. */
(()=>{
 'use strict';
 const inventory=window.TEMPO_INVENTORY||[];
 const config=window.TEMPO_COLLECTION_CONFIG||{};
 const grid=document.querySelector('#pieces-grid'),search=document.querySelector('#stock-search'),sort=document.querySelector('#stock-sort');
 const detail=document.querySelector('#piece-dialog'),interest=document.querySelector('#interest-dialog');
 const form=document.querySelector('#purchase-interest-form'),result=document.querySelector('#interest-result'),status=document.querySelector('#interest-status');
 let selected=null,interestPiece=null,prepared=null,fingerprint='',requestId='',requestCreatedAt='';
 const labels={preview:'Preview piece',available:'Available',reserved:'Reserved',sold:'Sold'};
 const normalized=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const node=(tag,className,text)=>{const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n};
 const priceLabel=p=>p.isSample?'Example listing':p.priceMinor==null?'Price on request':new Intl.NumberFormat('en-US',{style:'currency',currency:p.currency||'USD'}).format(p.priceMinor/100);
 function syncLock(){document.body.style.overflow=detail.open||interest.open?'hidden':'';}
 function listingUrl(piece){const u=new URL(location.href);u.searchParams.set('piece',piece.slug);u.hash='';return u;}
 function render(){
  const q=normalized(search.value.trim());let items=inventory.filter(p=>p.status!=='draft'&&normalized(`${p.maker} ${p.model} ${p.reference||''}`).includes(q));
  if(sort.value==='maker')items=[...items].sort((a,b)=>a.maker.localeCompare(b.maker));
  grid.replaceChildren();
  for(const p of items){
   const article=node('article','piece-card'),a=node('a');a.href=listingUrl(p);a.setAttribute('aria-label',`View ${p.maker} ${p.model}${p.isSample?' — preview listing':''}`);
   const photo=node('div','piece-photo'),img=node('img',p.imageFit==='cover'?'cover':'');img.src=p.images[0].src;img.alt=p.images[0].alt;img.width=700;img.height=875;img.loading='lazy';photo.append(img);
   const top=node('div','piece-card-topline');top.append(node('span','',p.maker),node('span','',labels[p.status]||'Ask for availability'));
   const bottom=node('div','piece-card-bottom');bottom.append(node('span','',priceLabel(p)),node('span','view-arr','↗'));
   a.append(photo,top,node('h2','',p.model),node('p','piece-card-model',p.reference?`Reference ${p.reference}`:'View the piece'),bottom);
   a.addEventListener('click',e=>{e.preventDefault();openPiece(p,true)});article.append(a);grid.append(article);
  }
  document.querySelector('#pieces-count').textContent=`${items.length} ${items.length===1?'piece':'pieces'}${inventory.every(p=>p.isSample)?' · collection preview':''}`;
  document.querySelector('#pieces-empty').hidden=items.length!==0;
 }
 function openPiece(p,push=false){
  selected=p;
  document.querySelector('#piece-title').textContent=p.model;
  document.querySelector('#detail-maker').textContent=p.maker;
  document.querySelector('#detail-status').textContent=labels[p.status]||'Ask for availability';
  document.querySelector('#detail-description').textContent=p.description;
  document.querySelector('#detail-price').textContent=p.isSample?'Price will be added with the sale listing.':priceLabel(p);
  const img=document.querySelector('#detail-image');img.src=p.images[0].src;img.alt=p.images[0].alt;img.className=p.imageFit==='cover'?'cover':'';
  document.querySelector('#detail-caption').textContent=`Image: ${p.images[0].credit}.`;
  const specs=document.querySelector('#detail-specs');specs.replaceChildren();
  const rows=[['Reference',p.reference],['Year',p.year],['Condition',p.condition],['Box',p.box==null?null:p.box?'Included':'Not included'],['Papers',p.papers==null?null:p.papers?'Included':'Not included']];
  for(const [name,value] of rows){if(value==null)continue;const row=node('div');row.append(node('dt','',name),node('dd','',String(value)));specs.append(row)}specs.hidden=!specs.childElementCount;
  document.querySelector('#detail-sample-note').hidden=!p.isSample;
  document.querySelector('#detail-interest').textContent=['sold','reserved'].includes(p.status)?'Ask about a similar watch →':'Ask about this piece →';
  if(push)history.pushState({piece:p.slug},'',listingUrl(p));
  if(!detail.open)detail.showModal();syncLock();
 }
 function openInterest(p=null){
  interestPiece=p;prepared=null;result.hidden=true;form.hidden=false;status.textContent='';
  document.querySelector('#interest-piece').textContent=p?`${p.maker} · ${p.model}${p.isSample?' — preview piece':''}`:'A question about the Tempo Raro collection';
  const live=config.interestEnabled===true&&config.interestEndpoint&&!p?.isSample;
  document.querySelector('#interest-mode-note').textContent=live?'Send us your question about the collection.':'This preview prepares an inquiry you can copy or download. It does not send it.';
  document.querySelector('#prepare-interest').textContent=live?'SEND MY INQUIRY →':'PREPARE MY INQUIRY →';
  if(!interest.open)interest.showModal();syncLock();document.querySelector('#buyer-name').focus();
 }
 function buildInquiry(){
  const fields=Object.fromEntries(new FormData(form));for(const key of Object.keys(fields))fields[key]=String(fields[key]).trim();
  const listing=interestPiece?{id:interestPiece.id,slug:interestPiece.slug,maker:interestPiece.maker,model:interestPiece.model,reference:interestPiece.reference,isSample:interestPiece.isSample,status:interestPiece.status}:null;
  const intent=interestPiece&&['reserved','sold'].includes(interestPiece.status)?'similar_watch_sourcing':listing?'purchase_interest':'collection_question';
  const fp=JSON.stringify({listing,fields,intent});if(fp!==fingerprint){fingerprint=fp;requestId=crypto.randomUUID();requestCreatedAt=new Date().toISOString()}
  return {type:'tempo-raro.collection-interest',version:1,id:requestId,createdAt:requestCreatedAt,intent,listing,contact:{name:fields.name,email:fields.email,phone:fields.phone},topic:fields.topic,message:fields.message};
 }
 function inquiryText(data){
  const p=data.listing;
  return `TEMPO RARO — COLLECTION INQUIRY\n${p?.isSample?'PREVIEW LISTING — NOT CONFIRMED INVENTORY\n':''}\n${p?`Watch: ${p.maker} ${p.model}\nListing ID: ${p.id}\n${p.reference?'Reference: '+p.reference+'\n':''}Listing status: ${p.status}\n`:'Question about the collection\n'}\nName: ${data.contact.name}\nEmail: ${data.contact.email}\nPhone: ${data.contact.phone||'Not provided'}\nInterest: ${data.topic}\n${data.intent==='similar_watch_sourcing'?'Request: Source a similar watch\n':''}\nMessage:\n${data.message||'No additional message.'}\n\nInquiry ID: ${data.id}`;
 }
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const data=buildInquiry(),button=document.querySelector('#prepare-interest');button.disabled=true;status.textContent='';
  try{
   const live=config.interestEnabled===true&&config.interestEndpoint&&!interestPiece?.isSample;
   if(live){
    const endpoint=new URL(config.interestEndpoint,location.href);if(endpoint.protocol!=='https:')throw Error('Inquiry delivery is not configured.');
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':data.id},body:JSON.stringify(data),signal:AbortSignal.timeout(12000),redirect:'error'});
    const acknowledgment=await response.json();if(!response.ok||acknowledgment.accepted!==true)throw Error('Your inquiry was not confirmed. Please try again.');
    status.textContent='Your inquiry has been sent.';
   }else{
    prepared={data,text:inquiryText(data)};document.querySelector('#interest-text').textContent=prepared.text;form.hidden=true;result.hidden=false;result.setAttribute('tabindex','-1');result.focus();
   }
  }catch(error){status.textContent=error.name==='TimeoutError'?'Delivery timed out. Please try again; no receipt was confirmed.':error.message||'Your inquiry could not be sent.';}
  finally{button.disabled=false;}
 });
 document.querySelector('#copy-interest').addEventListener('click',async()=>{if(!prepared)return;try{await navigator.clipboard.writeText(prepared.text);status.textContent='Inquiry copied. It has not been sent.';}catch{status.textContent='Please select the inquiry text and copy it manually. It has not been sent.'}});
 document.querySelector('#download-interest').addEventListener('click',()=>{if(!prepared)return;const url=URL.createObjectURL(new Blob([prepared.text],{type:'text/plain;charset=utf-8'})),a=node('a');a.href=url;a.download=`tempo-raro-interest-${prepared.data.listing?.id||'collection'}.txt`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Inquiry downloaded. It has not been sent.';});
 document.querySelector('#edit-interest').addEventListener('click',()=>{result.hidden=true;form.hidden=false;status.textContent='';document.querySelector('#buyer-message').focus()});
 document.querySelector('#detail-interest').addEventListener('click',()=>openInterest(selected));
 for(const button of document.querySelectorAll('[data-close-dialog]'))button.addEventListener('click',()=>document.getElementById(button.dataset.closeDialog).close());
 for(const dialog of [detail,interest]){
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
  dialog.addEventListener('close',()=>{syncLock();if(dialog===detail){const u=new URL(location.href);if(u.searchParams.has('piece')){u.searchParams.delete('piece');history.replaceState({},'',u)}}});
 }
 search.addEventListener('input',render);sort.addEventListener('change',render);document.querySelector('#clear-search').addEventListener('click',()=>{search.value='';render();search.focus()});
 const menu=document.querySelector('#mobile-panel'),toggle=document.querySelector('#menu-toggle');
 function closeMenu(){const wasOpen=menu.classList.contains('open');menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.querySelectorAll('main,nav,footer').forEach(x=>x.inert=false);syncLock();if(wasOpen)toggle.focus({preventScroll:true})}
 toggle.addEventListener('click',()=>{menu.classList.add('open');toggle.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';document.querySelectorAll('main,nav,footer').forEach(x=>x.inert=true);document.querySelector('#mobile-close').focus()});
 document.querySelector('#mobile-close').addEventListener('click',closeMenu);menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.querySelectorAll('[data-general-interest]').forEach(b=>b.addEventListener('click',()=>{closeMenu();openInterest()}));
 document.querySelector('#nav-inquire').addEventListener('click',()=>openInterest());
 document.addEventListener('keydown',e=>{if(!menu.classList.contains('open'))return;if(e.key==='Escape')closeMenu();if(e.key==='Tab'){const controls=[...menu.querySelectorAll('a,button')],first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 addEventListener('resize',()=>{if(matchMedia('(min-width: 1024px)').matches&&menu.classList.contains('open'))closeMenu()});
 addEventListener('popstate',()=>{const slug=new URL(location.href).searchParams.get('piece'),p=inventory.find(x=>x.slug===slug&&x.status!=='draft');if(p)openPiece(p);else{if(interest.open)interest.close();if(detail.open)detail.close()}});
 const credits=document.querySelector('#collection-credits');for(const p of inventory){const image=p.images[0],li=node('li');li.append(document.createTextNode(`${p.maker}: ${image.credit}`));if(image.sourceUrl){const a=node('a','',' · Source');a.href=image.sourceUrl;a.target='_blank';a.rel='noopener noreferrer';li.append(a)}credits.append(li)}
 document.querySelector('#year').textContent=new Date().getFullYear();render();
 const requested=new URL(location.href).searchParams.get('piece');if(requested){const p=inventory.find(x=>x.slug===requested&&x.status!=='draft');if(p)openPiece(p);else document.querySelector('#pieces-count').textContent='That piece is not in this collection. Browse the selection below.';}
})();
