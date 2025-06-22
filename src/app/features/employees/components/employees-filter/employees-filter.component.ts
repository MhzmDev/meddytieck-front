import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { Button } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeesStore } from '../../store/employees.store';
import { ActiveEnum } from '../../../../shared/services/buisness/lookups/lookups.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { getDefinedValuesWithoutEmptyString } from '../../../../shared/utils/get-defined-values';
import { TranslationService } from '../../../../shared/services/translation/translation.service';

type SearchByValue = 'name' | 'email' | 'phoneNo' | 'identityNO';

@Component({
  selector: 'mtk-employees-filter',
  imports: [
    InputComponent,
    TranslatePipe,
    SelectComponent,
    Button,
    ReactiveFormsModule,
  ],
  templateUrl: './employees-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesFilterComponent {
  readonly employeesStore = inject(EmployeesStore);
  readonly translateService = inject(TranslateService);
  readonly translationService = inject(TranslationService);
  readonly searchByOptions = computed<{ value: SearchByValue; name: string }[]>(
    () => {
      if (!this.translationService.currentLang()) return [];
      return [
        {
          value: 'name',
          name: this.translateService.instant('SEARCH.SEARCH_BY_NAME'),
        },
        {
          value: 'email',
          name: this.translateService.instant('SEARCH.SEARCH_BY_EMAIL'),
        },
        {
          value: 'phoneNo',
          name: this.translateService.instant('SEARCH.SEARCH_BY_PHONE_NO'),
        },
        {
          value: 'identityNO',
          name: this.translateService.instant('SEARCH.SEARCH_BY_IDENTITY_NO'),
        },
      ];
    },
  );
  readonly statusOptions = computed(() => {
    if (!this.translationService.currentLang()) return [];
    return [
      {
        id: ActiveEnum.Active,
        name: this.translateService.instant('COMMON.ACTIVE'),
      },
      {
        id: ActiveEnum.Inactive,
        name: this.translateService.instant('COMMON.INACTIVE'),
      },
    ];
  });
  readonly form = new FormGroup({
    search: new FormGroup({
      searchBy: new FormControl('name' as SearchByValue | null, []),
      searchQuery: new FormControl(null as string | null, []),
    }),
    filter: new FormGroup({
      userName: new FormControl(null as string | null, []),
      userEmail: new FormControl(null as string | null, []),
      phoneNo: new FormControl(null as string | null, []),
      departmentId: new FormControl(null as number | null, []),
      areaId: new FormControl(null as number | null, []),
      status: new FormControl(null as number | null, []),
      identityNO: new FormControl(null as string | null, []),
    }),
  });

  constructor() {
    this.onSearchValueChange();
    this.linkFilterWithStore();
  }

  onSearchValueChange() {
    this.form.controls.search.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.form.controls.filter.patchValue({
          userName: null,
          userEmail: null,
          phoneNo: null,
          identityNO: null,
        });
        switch (value.searchBy) {
          case 'name':
            this.form.controls.filter.controls.userName.setValue(
              value.searchQuery ?? null,
            );
            break;
          case 'email':
            this.form.controls.filter.controls.userEmail.setValue(
              value.searchQuery ?? null,
            );
            break;
          case 'phoneNo':
            this.form.controls.filter.controls.phoneNo.setValue(
              value.searchQuery ?? null,
            );
            break;
          case 'identityNO':
            this.form.controls.filter.controls.identityNO.setValue(
              value.searchQuery ?? null,
            );
            break;
        }
      });

    this.form.controls.search.controls.searchBy.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.form.controls.search.controls.searchQuery.setValue(null);
      });
  }

  linkFilterWithStore() {
    this.employeesStore.searchBy(
      this.form.controls.filter.valueChanges.pipe(
        map(getDefinedValuesWithoutEmptyString),
      ),
    );
  }

  onClear() {
    this.form.reset({
      search: {
        searchBy: 'name',
      },
    });
  }
}
