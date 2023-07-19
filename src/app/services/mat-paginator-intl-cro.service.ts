import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatPaginatorIntlCroService
  extends MatPaginatorIntl
  implements OnDestroy
{
  destroy$: Subject<boolean> = new Subject<boolean>();
  private capitalize = new CapitalizePipe();

  override firstPageLabel = this.capitalize.transform(
    this.translocoService.translate('paginator.first-page')
  );
  override lastPageLabel = this.capitalize.transform(
    this.translocoService.translate('paginator.last-page')
  );
  override nextPageLabel = this.capitalize.transform(
    this.translocoService.translate('paginator.next-page')
  );
  override previousPageLabel = this.capitalize.transform(
    this.translocoService.translate('paginator.previous-page')
  );

  private paginatorRange = this.translocoService.translate('paginator.range');

  constructor(private translocoService: TranslocoService) {
    super();

    this.translocoService.langChanges$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.nextPageLabel = this.capitalize.transform(
          this.translocoService.translate('paginator.next-page')
        );

        this.firstPageLabel = this.capitalize.transform(
          this.translocoService.translate('paginator.first-page')
        );

        this.lastPageLabel = this.capitalize.transform(
          this.translocoService.translate('paginator.last-page')
        );

        this.previousPageLabel = this.capitalize.transform(
          this.translocoService.translate('paginator.previous-page')
        );

        this.paginatorRange =
          this.translocoService.translate('paginator.range');
      });
  }
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.paginatorRange}` + length;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return (
      startIndex + 1 + ' - ' + endIndex + ` ${this.paginatorRange} ` + length
    );
  };

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
