import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  viewChild,
} from '@angular/core';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import {
  ControlValueAccessorBase,
  provideValueAccessor,
} from '../../directives/control-value-accessor.directive';
import { TypedNgTemplateDirective } from '../../directives/typed-ng-template.directive';
import { contextType } from '../../utils/context-type';
import { getImageUrl } from '../../utils/image-utils';
import { IconComponent } from '../icon/icon.component';
@Component({
  selector: 'mtk-image-uploader',
  imports: [
    FileUpload,
    CommonModule,
    TypedNgTemplateDirective,
    Button,
    IconComponent,
    TranslateModule,
    Skeleton,
  ],
  templateUrl: './image-uploader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(ImageUploaderComponent)],
})
export class ImageUploaderComponent extends ControlValueAccessorBase<File> {
  readonly imageUrl = model<string | null>();
  readonly loading = input(false);

  isImageAvailable = computed(() => !!this.imageUrl());
  readonly contentContextType = contextType<
    File[],
    {
      uploadedFiles: string[];
      removeFileCallback: VoidFunction;
      removeUploadedFileCallback: VoidFunction;
      chooseCallback: VoidFunction;
    }
  >();
  readonly fileUpload = viewChild<FileUpload>('fileUpload');
  readonly getImageUrl = getImageUrl;

  onDelete() {
    this.control.setValue(null);
    this.control.updateValueAndValidity();
    const uploader = this.fileUpload();
    if (!uploader) return;
    uploader.clear();
    uploader.uploadedFiles = [];
    uploader.cd.detectChanges();
  }

  onSelect(event: FileSelectEvent) {
    this.control.setValue(event.files[0]);
    const uploader = this.fileUpload();
    if (!uploader) return;
    uploader.uploadedFiles = [URL.createObjectURL(event.files[0])];
    uploader.cd.detectChanges();
    this.imageUrl.set(URL.createObjectURL(event.files[0]));
  }
}
