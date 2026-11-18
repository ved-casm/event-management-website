import type React from 'react';
import {render,screen,within} from '@testing-library/react';
import Home from './page';
import About from './about/page';
import Gallery from './gallery/page';
import Contact from './contact/page';
import {SiteShell} from './site-shell';
jest.mock('next/navigation',()=>({usePathname:()=>'/gallery'}));
beforeAll(()=>{Object.defineProperty(window,'matchMedia',{writable:true,value:(q:string)=>({matches:true,media:q,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}})})});
const pages:[string,()=>React.JSX.Element][]=[['home',Home],['about',About],['gallery',Gallery],['contact',Contact]];
describe('Every page',()=>{
  test.each(pages)('%s renders one h1 and no em dash',(_n,Page)=>{const {container}=render(<Page/>);expect(container.querySelectorAll('h1')).toHaveLength(1);expect(container.textContent).not.toMatch(/\u2014/)});
  test.each(pages)('%s images are AVIF with alt text',(_n,Page)=>{const {container}=render(<Page/>);container.querySelectorAll('img').forEach(i=>{expect(i.getAttribute('src')).toMatch(/\.avif$/);expect(i.hasAttribute('alt')).toBe(true)})});
  test('no photo is used twice across the site (logo exempt)',()=>{const seen:string[]=[];pages.forEach(([_n,Page])=>{const {container,unmount}=render(<Page/>);container.querySelectorAll('img').forEach(i=>{const s=i.getAttribute('src')!;if(!s.includes('logo'))seen.push(s)});unmount()});expect(new Set(seen).size).toBe(seen.length)});
});
describe('Gallery',()=>{
  test('shows all seven services with a description and contact link',()=>{render(<Gallery/>);['Wedding','Wedding engagement','House warming','Birthday celebration','Corporate events','Cultural programs','Live show'].forEach(t=>expect(screen.getByRole('heading',{level:3,name:t})).toBeInTheDocument());expect(screen.getAllByRole('link',{name:/^Discuss /})).toHaveLength(7);expect(document.querySelectorAll('.event-copy')).toHaveLength(7)});
  test('uses the Gallery name, not Celebrations, as the page eyebrow',()=>{render(<Gallery/>);expect(screen.getByText('OUR GALLERY')).toBeInTheDocument()});
});
describe('Site shell',()=>{
  test('uses the new complete logo in header and footer',()=>{const {container}=render(<SiteShell><p>x</p></SiteShell>);expect(screen.getAllByAltText('Sanskriti Fest - Events & Planners')).toHaveLength(2);expect(container.querySelector('.brand b')).not.toBeInTheDocument();expect(container.querySelector('.footer-logo img')).toHaveAttribute('src','/images/logo-transparent.avif')});
  test('prioritizes the small header logo and defers footer artwork',()=>{const {container}=render(<SiteShell><p>x</p></SiteShell>);expect(container.querySelector('.brand img')).toHaveAttribute('fetchPriority','high');expect(container.querySelector('.brand img')).toHaveAttribute('src','/images/logo-header.avif');expect(container.querySelector('.footer-logo img')).toHaveAttribute('loading','lazy')});
  test('keeps the regional signature in the hero, not the header',()=>{const {container}=render(<SiteShell><Home/></SiteShell>);expect(container.querySelector('.brand-origin')).toBeNull();expect(container.querySelector('.hero-origin')).toHaveTextContent("From God's own country");expect(container.querySelector('.hero-copy>.eyebrow')).toBeNull()});
  test('navigation has the four pages with Gallery active',()=>{render(<SiteShell><p>x</p></SiteShell>);const nav=screen.getByRole('navigation',{name:'Main navigation'});[['Home','/'],['Our story','/about'],['Gallery','/gallery'],['Connect','/contact']].forEach(([t,h])=>expect(within(nav).getByRole('link',{name:t})).toHaveAttribute('href',h));expect(within(nav).getByRole('link',{name:'Gallery'})).toHaveClass('active')});
  test('call bar shows the supplied number and a tel link',()=>{render(<SiteShell><p>x</p></SiteShell>);expect(screen.getByRole('link',{name:/Call Arun Menon/})).toHaveAttribute('href','tel:9048704545')});
});
describe('Contact page',()=>{
  test('lists Arun Menon, email and does not link unverified socials',()=>{render(<Contact/>);expect(screen.getByRole('heading',{name:'Arun Menon'})).toBeInTheDocument();expect(screen.getByRole('link',{name:'sanskriti04545@gmail.com'})).toHaveAttribute('href','mailto:sanskriti04545@gmail.com');expect(screen.queryByRole('link',{name:/Instagram|Facebook/})).not.toBeInTheDocument()});
});
