'use client';
import {useRef,useState,type FormEvent} from 'react';
import {ArrowUpRight} from 'lucide-react';

// Replace the recipient with FormSubmit's public alias after email activation.
const configuredRecipient=process.env.NEXT_PUBLIC_FORMSUBMIT_RECIPIENT || 'sanskriti04545@gmail.com';
export function ContactForm({recipient=configuredRecipient}:{recipient?:string}) {
 const [state,setState]=useState<'idle'|'sending'|'success'|'error'>('idle');
 const [feedback,setFeedback]=useState('');
 const inFlight=useRef(false);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(inFlight.current)return;
  const form=event.currentTarget;
  if(!form.reportValidity())return;
  const data=new FormData(form);
  if(data.get('_honey'))return;
  if(!recipient.trim()){
   setState('error');
   setFeedback('Online inquiries are not available yet. Please email sanskriti04545@gmail.com or call Arun Menon. Your details have not been sent.');
   return;
  }
  inFlight.current=true;
  setState('sending');setFeedback('Sending your inquiry...');
  const controller=new AbortController();
  const timeout=window.setTimeout(()=>controller.abort(),20000);
  try{
   const response=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(recipient.trim()),{
    method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify({...Object.fromEntries(data),_replyto:data.get('email'),_subject:'New celebration inquiry - Sanskriti',_template:'table',_url:window.location.href}),
    signal:controller.signal
   });
   const result=await response.json();
   if(!response.ok||(result.success!==true&&result.success!=='true'))throw new Error('not-confirmed');
   setState('success');setFeedback('Thank you. Your inquiry has been accepted for processing. For urgent plans, please call Arun Menon.');
   form.reset();
  }catch{
   setState('error');
   setFeedback('We could not confirm your inquiry was sent. Your details are still here. Please email sanskriti04545@gmail.com or call Arun Menon before submitting again.');
  }finally{window.clearTimeout(timeout);inFlight.current=false;}
 }
 return <form className="inquiry-form" action={'https://formsubmit.co/'+encodeURIComponent(recipient)} method="POST" onSubmit={submit} aria-busy={state==='sending'}>
 <span className="field-label">TELL US ABOUT YOUR CELEBRATION</span>
 <input type="text" name="_honey" tabIndex={-1} aria-hidden="true" autoComplete="off" style={{display:'none'}}/>
 <div className="form-grid"><label>Your name<input autoComplete="name" name="name" required placeholder="Full name"/></label><label>Email address<input autoComplete="email" name="email" type="email" required placeholder="you@example.com"/></label><label>Phone / WhatsApp<input autoComplete="tel" name="phone" type="tel" placeholder="Phone number"/></label><label>The occasion<select name="occasion"><option>Wedding</option><option>Engagement</option><option>House warming</option><option>Birthday celebration</option><option>Corporate event</option><option>Cultural program</option><option>Live show</option></select></label><label>Celebration date<input name="date" type="date"/></label><label>Estimated guests<input name="guests" type="number" min="1" placeholder="How many people?"/></label><label className="full-field">Your vision<textarea name="message" rows={4} placeholder="The feeling, the details, the moments you have in mind…"/></label></div>
 <button className="button button-wine" style={{marginTop:24}} type="submit" disabled={state==='sending'}>{state==='sending'?'Sending...':'Send your inquiry'} <ArrowUpRight size={17}/></button>
 {feedback&&<p className="form-feedback" role={state==='error'?'alert':'status'}>{feedback}</p>}
 </form>
}
