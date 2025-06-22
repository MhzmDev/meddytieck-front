import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { Image } from 'primeng/image';

@Component({
  selector: 'mtk-image',
  imports: [NgOptimizedImage, CommonModule, Image],
  templateUrl: './image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
  `,
})
export class ImageComponent {
  src = input.required<string>();
  addPlaceholder = input(false, { transform: booleanAttribute });
  ngStyle = input<Record<string, string>>({});
  ngClass = input<string | string[] | Set<string> | Record<string, unknown>>();
  imageClass = input<string>();
  styleClass = input<string>();
  priority = input(false, { transform: booleanAttribute });
  fill = input(false, { transform: booleanAttribute });
  width = input<number>();
  height = input<number>();
  alt = input.required<string>();
  preview = input(false, { transform: booleanAttribute });
  url = linkedSignal({ source: () => this.src(), computation: (src) => src });
  isPlaceholder = output<boolean>();
  isError = output<boolean>();
  loaded = output();

  onHandleError() {
    this.isError.emit(true);
    if (!this.addPlaceholder()) return;
    this.isPlaceholder.emit(true);

    this.url.set('assets/imgs/placeholder.svg');
  }

  onLoad() {
    this.loaded.emit();
  }

  protected readonly String = String;
}
