import { animate, animation, keyframes, style } from '@angular/animations';

import { ANIMATION } from './constants';

type FadeDirection = 'in' | 'out';
type SlideDirection = 'horizontal' | 'vertical';
type SlideState = 'expand' | 'collapse';

interface FadeInOutParams {
  time?: number;
  opacityStart?: number;
  opacityEnd?: number;
}

interface SlideInOutParams {
  time?: number;
  widthStart?: number | string;
  heightStart?: number | string;
  widthEnd?: number | string;
  heightEnd?: number | string;
}

type GetFadeInOutParamsProps = FadeInOutParams & {
  direction: FadeDirection;
};

type GetSlideInOutParamsProps = SlideInOutParams & {
  direction: SlideDirection;
  state: SlideState;
};

// FADE IN OUT
export const getFadeInOutParams: (
  props: GetFadeInOutParamsProps
) => FadeInOutParams = ({ direction, ...params }) => {
  const defaultParams: FadeInOutParams = {
    time: ANIMATION.DEFAULT_TIME,
    opacityStart: direction === 'in' ? 0 : 1,
    opacityEnd: direction === 'in' ? 1 : 0,
  };

  return {
    ...defaultParams,
    ...params,
  };
};

export const fadeInOutAni = animation([
  animate(
    '{{ time }}ms ease-in-out',
    keyframes([
      style({
        opacity: '{{ opacityStart }}',
      }),
      style({
        opacity: '{{ opacityEnd }}',
      }),
    ])
  ),
]);

// SLIDE IN OUT
export const getSlideInOutParams: (
  props: GetSlideInOutParamsProps
) => SlideInOutParams = ({ direction, state, ...props }) => {
  const defaultParams: SlideInOutParams = {
    time: ANIMATION.DEFAULT_TIME,
    widthStart: direction === 'horizontal' && state === 'expand' ? 0 : '*',
    heightStart: direction === 'vertical' && state === 'expand' ? 0 : '*',
    widthEnd: direction === 'horizontal' && state === 'collapse' ? 0 : '*',
    heightEnd: direction === 'vertical' && state === 'collapse' ? 0 : '*',
  };

  return {
    ...defaultParams,
    ...props,
  };
};

export const slideInOutAni = animation([
  animate(
    '{{ time }}ms ease-in-out',
    keyframes([
      style({
        width: '{{ widthStart }}',
        height: '{{ heightStart }}',
      }),
      style({
        width: '{{ widthEnd }}',
        height: '{{ heightEnd }}',
      }),
    ])
  ),
]);
