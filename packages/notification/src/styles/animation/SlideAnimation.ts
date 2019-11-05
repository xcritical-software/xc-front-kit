import { css } from 'styled-components';


export const SlideAnimation = css`
 @keyframes Toastify__slideInRight {
   from {
     transform: translate3d(110%, 0, 0);
     visibility: visible;
   }
   to {
     transform: translate3d(0, 0, 0);
   }
 }

 @keyframes Toastify__slideInLeft {
   from {
     transform: translate3d(-110%, 0, 0);
     visibility: visible;
   }
   to {
     transform: translate3d(0, 0, 0);
   }
 }

 @keyframes Toastify__slideInUp {
   from {
     transform: translate3d(0, 110%, 0);
     visibility: visible;
   }
   to {
     transform: translate3d(0, 0, 0);
   }
 }

 @keyframes Toastify__slideInDown {
   from {
     transform: translate3d(0, -110%, 0);
     visibility: visible;
   }
   to {
     transform: translate3d(0, 0, 0);
   }
 }

 @keyframes Toastify__slideOutRight {
   from {
     transform: translate3d(0, 0, 0);
   }
   to {
     visibility: hidden;
     transform: translate3d(110%, 0, 0);
   }
 }

 @keyframes Toastify__slideOutLeft {
   from {
     transform: translate3d(0, 0, 0);
   }
   to {
     visibility: hidden;
     transform: translate3d(-110%, 0, 0);
   }
 }

 @keyframes Toastify__slideOutDown {
   from {
     transform: translate3d(0, 0, 0);
   }
   to {
     visibility: hidden;
     transform: translate3d(0, 500px, 0);
   }
 }

 @keyframes Toastify__slideOutUp {
   from {
     transform: translate3d(0, 0, 0);
   }
   to {
     visibility: hidden;
     transform: translate3d(0, -500px, 0);
   }
 }

 .Toastify__slide-enter--top-left,
 .Toastify__slide-enter--bottom-left {
   animation-name: Toastify__slideInLeft;
 }

 .Toastify__slide-enter--top-right,
 .Toastify__slide-enter--bottom-right {
   animation-name: Toastify__slideInRight;
 }

 .Toastify__slide-enter--top-center {
   animation-name: Toastify__slideInDown;
 }

 .Toastify__slide-enter--bottom-center {
   animation-name: Toastify__slideInUp;
 }

 .Toastify__slide-exit--top-left,
 .Toastify__slide-exit--bottom-left {
   animation-name: Toastify__slideOutLeft;
 }

 .Toastify__slide-exit--top-right,
 .Toastify__slide-exit--bottom-right {
   animation-name: Toastify__slideOutRight;
 }

 .Toastify__slide-exit--top-center {
   animation-name: Toastify__slideOutUp;
 }

 .Toastify__slide-exit--bottom-center {
   animation-name: Toastify__slideOutDown;
 }
`;
