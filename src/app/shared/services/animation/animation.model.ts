export interface State {
  name: string;
  style: Record<string, string>;
}

export interface FullOptions {
  triggerName: string;
  states?: State[];
  transitions: {
    stateChangeExpr: string;
    style?: Record<string, string>;
    animates: {
      timingFunction?: string;
      delay?: number;
      duration?: number;
      style?: Record<string, string>;
    }[];
  }[];
}

export interface SimpleOptions {
  states?: State[];
  triggerName?: string;
  duration?: number;
  delay?: number;
  stateChangeExpr?: string;
  timingFunction?: string;
}

export enum AnimationStates {
  Hidden = 'hiddenState',
  Visible = 'visibleState',
}
