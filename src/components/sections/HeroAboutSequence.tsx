'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import * as React from 'react';
import { useLayoutEffect, useRef, useState ,useEffect } from 'react';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const nameString = "SATRIA ARYA DIVA";

const TECH_STACK = [
  { name: 'Next.js', icon: <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Next.js</title><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/></svg> },
  { name: 'React', icon: <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>React</title><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg> },
  { name: 'TypeScript', icon: <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TypeScript</title><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
  { name: 'Tailwind CSS', icon: <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Tailwind CSS</title><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg> },
  { name: 'GSAP', icon: <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GSAP</title><path d="M9.83,7.59C10.647,7.595 11.267,7.828 11.672,8.282C12.055,8.713 12.239,9.336 12.219,10.132L12.205,10.193C12.197,10.211 12.185,10.229 12.17,10.243C12.14,10.272 12.099,10.288 12.057,10.288L10.398,10.288C10.29,10.288 10.199,10.2 10.199,10.093C10.199,9.669 10.071,9.435 9.809,9.383L9.689,9.372C9.347,9.372 9.125,9.583 9.119,9.951C9.112,10.361 9.344,10.734 10.004,11.374C10.872,12.19 11.221,12.913 11.204,13.867C11.177,15.411 10.127,16.41 8.531,16.41C7.716,16.41 7.093,16.191 6.678,15.761C6.258,15.324 6.066,14.683 6.106,13.855C6.108,13.813 6.125,13.772 6.155,13.743C6.185,13.714 6.226,13.698 6.267,13.698L7.983,13.698C8.007,13.699 8.03,13.705 8.052,13.715C8.073,13.726 8.092,13.741 8.107,13.76C8.12,13.775 8.129,13.793 8.135,13.813C8.14,13.832 8.141,13.853 8.137,13.873C8.118,14.171 8.171,14.394 8.288,14.518C8.363,14.598 8.469,14.639 8.599,14.639C8.916,14.639 9.102,14.414 9.109,14.024C9.115,13.687 9.007,13.39 8.427,12.792C7.676,12.058 7.003,11.3 7.024,10.108C7.037,9.416 7.311,8.784 7.798,8.327C8.312,7.845 9.014,7.59 9.83,7.59ZM4.047,7.618C4.794,7.612 5.381,7.842 5.789,8.303C6.221,8.79 6.44,9.524 6.441,10.485C6.44,10.527 6.422,10.567 6.392,10.597C6.362,10.626 6.322,10.643 6.28,10.643L4.479,10.643C4.448,10.642 4.417,10.629 4.395,10.607C4.373,10.584 4.361,10.553 4.36,10.522C4.346,9.899 4.172,9.576 3.828,9.538L3.757,9.534C3.067,9.535 2.66,10.472 2.444,10.992C2.142,11.719 1.988,12.507 2.018,13.293C2.033,13.659 2.092,14.173 2.438,14.386C2.746,14.575 3.185,14.45 3.451,14.24C3.716,14.031 3.93,13.669 4.02,13.339C4.033,13.293 4.033,13.258 4.021,13.241C4.015,13.233 4.003,13.229 3.989,13.226L3.485,13.222C3.461,13.222 3.436,13.216 3.414,13.206C3.392,13.196 3.372,13.181 3.356,13.162C3.344,13.148 3.335,13.13 3.331,13.112C3.327,13.093 3.327,13.074 3.331,13.056L3.647,11.682C3.663,11.611 3.726,11.558 3.804,11.548L3.804,11.545L6.839,11.545C6.846,11.545 6.854,11.545 6.86,11.546C6.939,11.556 6.995,11.63 6.994,11.71L6.994,11.714L6.678,13.085C6.661,13.163 6.583,13.22 6.494,13.22L6.113,13.22C6.1,13.22 6.086,13.225 6.075,13.233C6.064,13.241 6.056,13.253 6.052,13.266C5.7,14.46 5.223,15.282 4.594,15.775C4.058,16.195 3.399,16.391 2.517,16.391C1.725,16.391 1.191,16.136 0.738,15.633C0.14,14.967 -0.107,13.879 0.043,12.566C0.313,10.103 1.589,7.618 4.047,7.618ZM21.016,7.75C23.026,7.75 24.03,8.662 23.999,10.461C23.962,12.569 22.678,14.119 20.745,14.477C20.47,14.527 20.191,14.547 19.912,14.545L18.978,14.541C18.963,14.541 18.948,14.547 18.937,14.558C18.926,14.568 18.92,14.583 18.92,14.598C18.92,14.608 18.922,14.618 18.928,14.627C18.933,14.636 18.941,14.643 18.95,14.648L19.744,15.062C19.809,15.096 19.835,15.153 19.82,15.226C19.815,15.249 19.618,16.139 19.613,16.159C19.596,16.237 19.533,16.282 19.442,16.282L17.739,16.282C17.715,16.282 17.69,16.277 17.668,16.267C17.646,16.257 17.626,16.241 17.61,16.223C17.598,16.208 17.589,16.191 17.585,16.173C17.58,16.155 17.581,16.135 17.585,16.116L19.481,7.875C19.5,7.789 19.581,7.751 19.653,7.751L21.016,7.75ZM17.273,7.762C17.292,7.77 17.31,7.781 17.324,7.795C17.338,7.81 17.351,7.828 17.358,7.847C17.366,7.866 17.369,7.886 17.369,7.906L17.358,16.119C17.361,16.138 17.36,16.158 17.355,16.177C17.35,16.196 17.34,16.213 17.328,16.228C17.313,16.245 17.295,16.259 17.274,16.268C17.254,16.277 17.232,16.282 17.21,16.281L15.397,16.281C15.377,16.282 15.356,16.277 15.337,16.27C15.318,16.262 15.3,16.25 15.286,16.236C15.272,16.221 15.26,16.204 15.253,16.185C15.245,16.166 15.241,16.146 15.241,16.125L15.28,15.328C15.282,15.241 15.28,15.217 15.229,15.211L15.161,15.209L13.447,15.209C13.323,15.209 13.314,15.22 13.27,15.334L12.914,16.191C12.882,16.252 12.818,16.281 12.722,16.281L10.927,16.281C10.818,16.281 10.74,16.173 10.781,16.072L14.499,7.873C14.524,7.824 14.562,7.75 14.648,7.75L17.214,7.75C17.234,7.75 17.254,7.754 17.273,7.762ZM15.5,9.985C15.492,9.953 15.466,9.956 15.445,9.998C15.43,10.028 15.416,10.06 15.405,10.091L14.121,13.274C14.114,13.294 14.109,13.31 14.105,13.322C14.104,13.328 14.103,13.335 14.104,13.341C14.105,13.347 14.108,13.353 14.111,13.358C14.115,13.363 14.12,13.367 14.126,13.37C14.131,13.373 14.137,13.376 14.143,13.376L15.215,13.39C15.334,13.38 15.34,13.374 15.352,13.253C15.354,13.21 15.506,10.022 15.5,9.985ZM20.112,9.582C20.097,9.582 20.083,9.588 20.072,9.599C20.061,9.609 20.055,9.624 20.054,9.639C20.054,9.649 20.057,9.659 20.062,9.668C20.068,9.677 20.075,9.685 20.084,9.69C20.097,9.697 20.869,10.104 20.926,10.135C20.968,10.158 20.969,10.198 20.955,10.267C20.948,10.298 20.415,12.642 20.416,12.644C20.419,12.647 20.435,12.655 20.515,12.655L20.551,12.655C21.446,12.619 21.934,11.561 21.952,10.534C21.961,9.979 21.772,9.638 21.429,9.588L21.358,9.582L20.112,9.582Z"/></svg> },
  { name: 'Git', icon: <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Git</title><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg> },
  { name: 'Framer', icon: <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Framer</title><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg> },
];

export default function HeroAboutSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroPlaceholderRef = useRef<HTMLDivElement>(null);
  const aboutPlaceholderRef = useRef<HTMLDivElement>(null);
  const flyingImgRef = useRef<HTMLDivElement>(null);
  
  const heroTextPlaceholderRef = useRef<HTMLDivElement>(null);
  const aboutTextPlaceholderRef = useRef<HTMLDivElement>(null);
  const flyingTextRef = useRef<HTMLDivElement>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Hero Text Entrance (Top) - Cinematic Blur & Scale
      gsap.fromTo(flyingTextRef.current, 
        { y: 50, opacity: 0, scale: 0.95, filter: 'blur(10px)' },
        { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
      );

      gsap.to('.scroll-indicator', {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });

      if (!flyingImgRef.current || !heroPlaceholderRef.current || !aboutPlaceholderRef.current) return;

      // Helper to calculate absolute X/Y within the wrapper container
      const getContainerOffset = (el: HTMLElement) => {
        let x = 0; let y = 0;
        let curr: HTMLElement | null = el;
        while (curr && curr !== containerRef.current) {
          x += curr.offsetLeft;
          y += curr.offsetTop;
          curr = curr.offsetParent as HTMLElement;
        }
        return { x, y };
      };

      // 2. Set the initial state of the shared image onto the Hero placeholder
      const setInitialPos = () => {
        const hp = heroPlaceholderRef.current;
        if (!hp || !flyingImgRef.current) return;
        const initialPos = getContainerOffset(hp);
        gsap.set(flyingImgRef.current, {
          width: hp.offsetWidth,
          height: hp.offsetHeight,
          x: initialPos.x,
          y: initialPos.y,
          borderRadius: '4px',
        });
      };
      
      setInitialPos();

      // 3. The SEAMLESS Scroll Transition (Image moves from Hero to About!)
      gsap.to(flyingImgRef.current, {
        width: () => aboutPlaceholderRef.current?.offsetWidth || 0,
        height: () => aboutPlaceholderRef.current?.offsetHeight || 0,
        x: () => aboutPlaceholderRef.current ? getContainerOffset(aboutPlaceholderRef.current).x : 0,
        y: () => aboutPlaceholderRef.current ? getContainerOffset(aboutPlaceholderRef.current).y : 0,
        borderRadius: '8px', 
        ease: 'none', // linear feels most natural tied to scroll scrub
        scrollTrigger: {
          trigger: '.hero-section', 
          start: 'top top', 
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true, // Forces recalculation on resize
        }
      });

      // 3.5. The SEAMLESS Scroll Transition for TEXT (Hero to About!)
      const setInitialTextPos = () => {
        const hp = heroTextPlaceholderRef.current;
        if (!hp || !flyingTextRef.current) return;
        const initialPos = getContainerOffset(hp);
        
        gsap.set(flyingTextRef.current, {
          x: initialPos.x + hp.offsetWidth / 2, // Center align in hero
          y: initialPos.y,
          xPercent: -50,
          fontSize: window.innerWidth >= 768 ? '7.5vw' : '12vw',
        });
      };
      setInitialTextPos();

      gsap.to(flyingTextRef.current, {
        x: () => aboutTextPlaceholderRef.current ? getContainerOffset(aboutTextPlaceholderRef.current).x : 0,
        y: () => aboutTextPlaceholderRef.current ? getContainerOffset(aboutTextPlaceholderRef.current).y : 0,
        xPercent: 0, // Left align in about
        fontSize: () => {
          if (!aboutTextPlaceholderRef.current) return '48px';
          return window.innerWidth >= 1024 ? '3.5vw' : '48px';
        },
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      // 4. Kinetic Typography Parallax!
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to('.web-left', {
          x: '40vw', 
          rotationZ: 15,
          skewX: -20,
          opacity: 0,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
        
        gsap.to('.dev-right', {
          x: '-20vw', 
          rotationZ: -15,
          skewX: 20,
          opacity: 0,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.to('.web-left', {
          x: '-10vw', 
          rotationZ: 10,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
        
        gsap.to('.dev-right', {
          x: '10vw', 
          rotationZ: -10,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
          }
        });
      });
      
      // 5. Highlighter Text Scrub Reveal
      gsap.to('.about-text-scrub', {
        backgroundSize: '100% 100%',
        ease: 'none',
        stagger: 0.5,
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 50%',
          end: 'center center',
          scrub: true,
        }
      });

      // 5. Massive Background Text Parallax
      gsap.to('.about-bg-text', {
        y: '-20vh',
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-background text-foreground transition-colors duration-500 overflow-hidden">
      
      {/* --- THE MASTER SHARED IMAGE --- */}
      {/* This element spans both dimensions smoothly because it is absolute purely to the sequence container! */}
      <div 
        ref={flyingImgRef} 
        className="absolute top-0 left-0 z-40 overflow-hidden pointer-events-auto cursor-pointer will-change-transform"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src='/images/satria.jpg'
          alt='Satria Arya Diva'
          fill
          className='object-cover   transition-all duration-300'
          priority
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </div>


      {/* --- THE MASTER SHARED TEXT --- */}
      <div 
        ref={flyingTextRef}
        className="absolute top-0 left-0 z-50 font-display font-black uppercase leading-none text-foreground origin-top-left whitespace-nowrap pointer-events-none will-change-transform"
      >
        {nameString}
      </div>


      {/* ==== HERO SECTION ==== */}
      <section className='hero-section relative flex h-screen w-full flex-col justify-center px-2 pt-10 md:pt-20'>

        <div className='hero-title-container z-20 w-full flex flex-col justify-center items-center px-2 overflow-visible relative' style={{ marginTop: '5vh' }}>
          {/* Invisible placeholder for the flying text */}
          <div ref={heroTextPlaceholderRef} className='w-full max-w-[95vw] h-[12vw] md:h-[7.5vw] opacity-0' />
          
          <div className='hero-subtitle mt-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-60 text-center'>
          MEDAN , SUMATERA UTARA - INDONESIA
          </div>
        </div>

        {/* CSS Grid for perfect layout centering on Desktop, Stack on Mobile */}
        <div className='relative z-30 flex-1 flex flex-col justify-center w-full'>
          <div className='w-full flex flex-col items-center justify-center gap-10 md:gap-0 md:grid md:grid-cols-3 px-4 md:px-12 mt-8 md:mt-0'>
            <div className='web-left text-center md:text-left font-display text-[15vw] md:text-[4vw] font-black uppercase leading-none z-20 w-full'>
              I AM WEB
            </div>
            
            <div className='relative flex flex-col items-center justify-center z-10 pointer-events-auto'>
              <span className='absolute -top-8 md:-top-10 font-mono text-[9px] uppercase tracking-widest opacity-70 w-max text-center'>
               
              </span>
              <div ref={heroPlaceholderRef} className='w-[60vw] h-[75vw] md:w-80 md:h-[40vh] opacity-0' />
            </div>

            <div className='dev-right text-center md:text-right font-display text-[13vw] md:text-[5vw] font-black uppercase leading-none z-20 w-full' style={{ transform: "scaleY(1.3)" }}>
              DEVELOPER
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center opacity-50 z-20'>
          <span className='font-mono text-[8px] md:text-[10px] uppercase tracking-widest mb-2'>SCROLL</span>
          <div className='scroll-indicator w-[1px] h-12 bg-foreground/50'></div>
        </div>

      </section>

      {/* ==== ABOUT SECTION ==== */}
      <section id="about" className='about-section relative min-h-screen w-full px-4 pt-28 pb-20 md:px-12 md:py-40 flex items-start md:items-center overflow-hidden'>
        
        {/* Massive Background Typography */}
     

        <div className='mx-auto flex w-full max-w-[1400px] flex-col md:flex-row justify-between gap-8 md:items-stretch md:gap-24 relative z-10'>
          
          {/* Invisible Bounding Box placeholder for About target state */}
          <div className='w-full flex justify-center md:block md:w-[45%]'>
             <div ref={aboutPlaceholderRef} className='relative aspect-3/4 w-[70vw] sm:w-[60vw] md:w-full bg-muted/10 opacity-0 rounded-2xl' />
          </div>

          {/* Right Text Column */}
          <div className='flex w-full flex-col justify-center md:w-[55%] z-20 mt-6 md:mt-0'>
            <div className='about-reveal mb-8 flex items-center space-x-6 font-mono text-[10px] uppercase tracking-widest opacity-50 md:mb-12 md:text-xs'>
              <div className='h-px w-12 bg-foreground md:w-24' />
              <span>ABOUT ME</span>
            </div>

            <div className='mb-6 md:mb-8 relative'>
              {/* Invisible placeholder for the flying text to land on */}
              <h2 ref={aboutTextPlaceholderRef} className='about-reveal font-display text-5xl font-bold uppercase md:text-5xl lg:text-[3.5vw] opacity-0'>
                Satria Arya Diva
              </h2>
            </div>

            <div className='mb-6 md:mb-8'>
              <h3 className='about-reveal font-display text-lg md:text-xl font-medium tracking-tight text-muted-foreground  '>
                A Dedicated <span className='text-foreground underline decoration-1 underline-offset-4'>UI Developer</span>
              </h3>
            </div>

            <div className='max-w-xl space-y-8 md:space-y-10 font-sans text-sm leading-relaxed font-semibold md:text-lg'>
              <p 
                className='about-text-scrub inline-block bg-gradient-to-r from-foreground to-foreground bg-no-repeat text-foreground/20' 
                style={{ backgroundSize: '0% 100%', WebkitBackgroundClip: 'text' }}
              >
                I specialize in crafting premium digital experiences and interactive designs built entirely from scratch. Rejecting cookie-cutter templates, I focus on building robust, high-performance web applications that leave a lasting impression.
              </p>
              <p 
                className='about-text-scrub inline-block bg-gradient-to-r from-foreground to-foreground bg-no-repeat text-foreground/20' 
                style={{ backgroundSize: '0% 100%', WebkitBackgroundClip: 'text' }}
              >
                With a deep obsession for smooth animations, meticulous typography, and flawless user interactions, my goal is to bridge the gap between abstract design concepts and highly functional, production-ready code.
              </p>
            </div>

            {/* TECH STACK MINI MARQUEE */}
            <div className='about-reveal mt-12 w-full overflow-hidden border-y border-border  py-4 max-w-xl'>
              <div className='flex w-max animate-[marquee_20s_linear_infinite] items-center space-x-8'>
                {[...Array(2)].map((_, i) => (
                  <div key={i} className='flex items-center space-x-8 text-sm font-medium uppercase tracking-widest opacity-90'>
                    {TECH_STACK.map((tech, j) => (
                      <React.Fragment key={j}>
                        <div className="flex items-center space-x-2">
                          {tech.icon}
                          <span>{tech.name}</span>
                        </div>
                        <span className="w-2.5 h-2.5   bg-foreground/90" />
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
              <style>{`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
              `}</style>
            </div>

            {/* HOBBIES SECTION */}
            <div className='about-reveal mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 max-w-xl'>
              <span className='font-mono text-[10px] uppercase tracking-widest opacity-50 mb-1 sm:mb-0 sm:mr-2'>
                BEYOND WORK —
              </span>
              <div className='flex flex-wrap gap-2'>
                <div className='border border-foreground/20 px-3 py-1.5 md:px-4 md:py-1.5 font-mono text-[12px] md:text-[15px] uppercase tracking-widest text-foreground/80 transition-all hover:bg-foreground hover:text-background cursor-grab'>
                  ☕ COFFEE
                </div>
                <div className='border border-foreground/20 px-3 py-1.5 md:px-4 md:py-1.5 font-mono text-[12px] md:text-[15px] uppercase tracking-widest text-foreground/80 transition-all hover:bg-foreground hover:text-background cursor-grab'>
                  💻 CODE
                </div>
                <div className='border border-foreground/20 px-3 py-1.5 md:px-4 md:py-1.5 font-mono text-[12px] md:text-[15px] uppercase tracking-widest text-foreground/80 transition-all hover:bg-foreground hover:text-background cursor-grab'>
                  🎮 GAMING
                </div>
                <div className='border border-foreground/20 px-3 py-1.5 md:px-4 md:py-1.5 font-mono text-[12px] md:text-[15px] uppercase tracking-widest text-foreground/80 transition-all hover:bg-foreground hover:text-background cursor-grab'>
                  🎧 MUSIC
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className='about-reveal mt-12 flex flex-col sm:flex-row items-center gap-4 max-w-xl pt-4'>
              <a 
                href="#contact" 
                className='group flex w-full sm:w-auto items-center justify-center rounded-full bg-foreground px-8 py-4 transition-transform active:scale-95'
              >
                <span className='relative overflow-hidden font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-background inline-flex'>
                  <span className='block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full'>
                    LET&apos;S COLLAB
                  </span>
                  <span className='absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 italic text-center'>
                    LET&apos;S COLLAB
                  </span>
                </span>
              </a>

              <a 
                href="/resume.pdf" 
                target="_blank"
                className='group flex w-full sm:w-auto items-center justify-center rounded-full border border-foreground/30 px-8 py-4 transition-all hover:bg-foreground hover:text-background active:scale-95'
              >
                <span className='relative overflow-hidden font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-background inline-flex transition-colors'>
                  <span className='block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full'>
                    SAVE MY RESUME
                  </span>
                  <span className='absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 italic text-center'>
                    SAVE MY RESUME
                  </span>
                </span>
              </a>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl aspect-3/4 md:aspect-square rounded-xl overflow-hidden shadow-2xl scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src='/images/satria.jpg'
              alt='Satria Arya Diva Modal'
              fill
              className='object-cover'
              priority
            />
            <button 
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
