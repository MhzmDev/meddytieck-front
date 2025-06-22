import { ActivatedRoute } from '@angular/router';

export function getRouteLastChild(firstChild: ActivatedRoute): ActivatedRoute {
  let route = firstChild;
  let child: ActivatedRoute | null = route;
  while (child) {
    if (child.firstChild) {
      child = child.firstChild;
      route = child;
    } else {
      child = null;
    }
  }
  return route;
}
