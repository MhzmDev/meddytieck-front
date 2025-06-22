import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  untracked,
  viewChild,
} from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { WITH_CACHE_CONTEXT } from '../../../core/interceptors/cache.interceptor';

@Component({
  selector: 'mtk-lottie-player',
  imports: [],
  templateUrl: './lottie-player.component.html',
  styleUrl: './lottie-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LottiePlayerComponent implements OnDestroy {
  path = input.required<string>();
  dotLottie?: import('@lottiefiles/dotlottie-web').DotLottie;
  readonly dotLottieCanvas =
    viewChild<ElementRef<HTMLCanvasElement>>('dotlottieCanvas');
  private readonly http = inject(HttpClient);

  constructor() {
    effect(() => {
      const path = this.path();
      const canvas = this.dotLottieCanvas()?.nativeElement;
      const context = new HttpContext();

      if (!path || !canvas) return;
      untracked(() => {
        this.http
          .get(path, {
            context: context.set(WITH_CACHE_CONTEXT, true),
            responseType: 'arraybuffer',
          })
          .subscribe((data) => {
            import('@lottiefiles/dotlottie-web').then((lottie) => {
              this.dotLottie = new lottie.DotLottie({
                autoplay: true,
                loop: true,
                canvas: canvas,
                data: data as import('@lottiefiles/dotlottie-web').Data,
              });
            });
          });
      });
    });
  }

  ngOnDestroy(): void {
    this.dotLottie?.destroy();
  }
}
