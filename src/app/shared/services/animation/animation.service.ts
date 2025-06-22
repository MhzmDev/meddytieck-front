import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Injectable } from '@angular/core';
import { AnimationStates, FullOptions, SimpleOptions } from './animation.model';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  static fade(options: SimpleOptions) {
    return AnimationService.advancedCustom({
      triggerName: options.triggerName ?? 'fade',
      states: options.states,
      transitions: [
        {
          stateChangeExpr: options.stateChangeExpr ?? ':enter',
          style: { opacity: '0' },
          animates: [
            {
              delay: options.delay,
              duration: options.duration,
              timingFunction: options.timingFunction,
              style: { opacity: '1' },
            },
          ],
        },
      ],
    });
  }

  static move(
    options: SimpleOptions & {
      distance?: string;
      direction: 'Up' | 'Down' | 'Left' | 'Right';
    },
  ) {
    let translate;
    switch (options.direction) {
      case 'Up':
        translate = `translateY(${options.distance ?? '5rem'})`;
        break;
      case 'Down':
        translate = `translateY(-${options.distance ?? '-5rem'})`;
        break;
      case 'Left':
        translate = `translateX(${options.distance ?? '5rem'})`;
        break;
      case 'Right':
        translate = `translateX(-${options.distance ?? '-5rem'})`;
        break;
    }
    const triggerName = options.triggerName ?? `move${options.direction}`;

    return AnimationService.advancedCustom({
      triggerName,
      states: options.states,
      transitions: [
        {
          stateChangeExpr: options.stateChangeExpr ?? ':enter',
          style: { opacity: '0', transform: translate },
          animates: [
            {
              delay: options.delay,
              duration: options.duration,
              timingFunction: options.timingFunction,
              style: { opacity: '1', transform: 'none' },
            },
          ],
        },
      ],
    });
  }

  static expand(options: SimpleOptions) {
    return AnimationService.custom({
      states: options.states,
      triggerName: options.triggerName ?? 'expand',
      duration: options.duration,
      delay: options.delay,
      stateChangeExpr: options.stateChangeExpr ?? ':enter',
      timingFunction: options.timingFunction,
      styleBefore: {
        opacity: '0',
        transform: 'scale(0.2)',
      },
      styleAfter: {
        opacity: '1',
        transform: 'none',
      },
    });
  }

  static advancedCustom(options: FullOptions) {
    const states = (options.states || []).map((st) =>
      state(st.name, style(st.style)),
    );
    // Default Common State
    states.push(state(AnimationStates.Hidden, style({ opacity: 0 })));

    const transitions = options.transitions.map((t) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let animates: any = t.animates.map((anim) =>
        animate(
          AnimationService.getTimingString(
            anim.delay,
            anim.duration,
            anim.timingFunction,
          ),
          style(anim.style || {}),
        ),
      );
      if (animates.length > 1) animates = group(animates);
      else animates = animates[0];

      return transition(t.stateChangeExpr, [style(t.style || {}), animates]);
    });
    const trig = trigger(options.triggerName, [...states, ...transitions]);

    return trig;
  }

  static custom(
    options: SimpleOptions & {
      triggerName: string;
      styleBefore: Record<string, string>;
      styleAfter: Record<string, string>;
    },
  ) {
    return AnimationService.advancedCustom({
      triggerName: options.triggerName,
      states: options.states,
      transitions: [
        {
          stateChangeExpr: options.stateChangeExpr ?? ':enter',
          style: options.styleBefore,
          animates: [
            {
              delay: options.delay,
              duration: options.duration,
              timingFunction: options.timingFunction,
              style: options.styleAfter,
            },
          ],
        },
      ],
    });
  }

  static getTimingString(
    delay?: number,
    duration?: number,
    timingFunction?: string,
  ) {
    delay = delay ?? 100;
    duration = duration ?? 400;
    timingFunction = timingFunction ?? 'ease-in-out';
    return `${duration}ms ${delay}ms ${timingFunction}`;
  }
}
