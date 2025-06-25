import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  SecurityContext,
  untracked,
} from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { catchError, EMPTY, map } from 'rxjs';
import DOMPurify from 'dompurify';
import { WITH_CACHE_CONTEXT } from '../../../core/interceptors/cache.interceptor';

@Component({
  selector: 'mtk-icon',
  imports: [],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
  },
})
export class IconComponent {
  readonly icon = input.required<string>();
  readonly overrideSize = input(false, { transform: booleanAttribute });
  readonly overrideColor = input(false, { transform: booleanAttribute });

  private readonly http = inject(HttpClient);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly sanitizer = inject(DomSanitizer);

  private _icon: string | null = null;

  constructor() {
    effect(() => {
      const icon = this.icon();
      if (!icon) return;
      untracked(() => {
        this.updateIcon(icon);
        this._icon = icon;
      });
    });
  }

  private updateIcon(icon: string) {
    if (this._icon === icon) return;
    this.removeIcon();
    this.setIcon(icon);
  }

  private removeIcon() {
    this.elementRef.nativeElement.innerHTML = '';
  }

  private setIcon(icon: string) {
    const url = `./icons/${icon}.svg`;
    console.log(`Attempting to load icon: ${icon} from URL: ${url}`);

    this.getSanitizedSvgFromUrl(url).subscribe(
      (svgElement) => {
        console.log(`Successfully loaded icon: ${icon}`);
        this.elementRef.nativeElement.appendChild(svgElement);
      },
      (error) => {
        console.error(`Failed to load icon: ${icon}`, error);
      }
    );
  }

  private getSanitizedSvgFromUrl(url: string) {
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    const sanitizedUrl = this.sanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      safeUrl as SafeValue,
    );
    if (!sanitizedUrl) {
      console.error('Unsafe icon Url');
      return EMPTY;
    }
    const context = new HttpContext().set(WITH_CACHE_CONTEXT, true);
    return this.http.get(sanitizedUrl, { responseType: 'text', context }).pipe(
      map((svgStr) => this.sanitizedSvgFromString(svgStr)),
      map((svgStr) => this.svgElementFromString(svgStr)),
      map((svgEl) => this.setSvgAttributes(svgEl)),
      map((svgEl) =>
        this.overrideColor() ? this.overrideSvgColor(svgEl) : svgEl,
      ),
      catchError((error) => {
        console.error(`Error loading SVG from URL: ${url}`, error);
        return EMPTY;
      }),
    );
  }

  private svgElementFromString(str: SafeValue): SVGElement {
    const div = document.createElement('DIV');
    div.innerHTML = str as string;
    const svg = div.querySelector('svg') as SVGElement;

    if (!svg) {
      throw Error('<svg> tag not found');
    }

    return svg;
  }

  private sanitizedSvgFromString(svgStr: SafeValue): SafeValue {
    const sanitizedSvgLiteral = DOMPurify.sanitize(svgStr as string, {
      USE_PROFILES: { svg: true },
    });
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedSvgLiteral);
  }

  private setSvgAttributes(svg: SVGElement): SVGElement {
    svg.setAttribute('fit', '');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('focusable', 'false'); // Disable IE11 default behavior to make SVGs focusable.
    if (this.overrideSize()) {
      svg.setAttribute('height', '100%');
      svg.setAttribute('width', '100%');
    }
    return svg;
  }

  private overrideSvgColor(svg: SVGElement): SVGElement {
    const children = svg.querySelectorAll('*');
    children.forEach((child) => {
      if (child.getAttribute('fill')) {
        child.setAttribute('fill', 'currentColor');
      }
      if (child.getAttribute('stroke')) {
        child.setAttribute('stroke', 'currentColor');
      }
    });
    return svg;
  }
}
