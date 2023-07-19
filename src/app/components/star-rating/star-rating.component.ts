import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="star-rating">
      <span class="star" *ngFor="let star of filledStars" [innerHTML]="getStarIcon(true)"></span>
      <span class="star" *ngFor="let star of emptyStars" [innerHTML]="getStarIcon(false)"></span>
    </div>
  `,
  styles: [`
    .star-rating {
      display: inline-block;
    }

    .star {
      color: gold;
    }
  `]
})
export class StarRatingComponent implements OnChanges {
  @Input() rating!: string | undefined;
  filledStars: boolean[] = [];
  emptyStars: boolean[] = [];

  ngOnChanges(): void {
    if (this.rating !== undefined) {
      this.updateStars();
    }
  }

  private updateStars(): void {
    const firstDigit = this.getFirstDigit(this.rating);
    const ratingValue = parseInt(firstDigit, 10) || 0;

    this.filledStars = Array(ratingValue).fill(true);
    this.emptyStars = Array(10 - ratingValue).fill(false);
  }

  private getFirstDigit(value: string | undefined): string {
    if (value && value.length > 0) {
      const firstChar = value.charAt(0);
      if (this.isNumeric(firstChar)) {
        return firstChar;
      }
    }
    return '';
  }

  private isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }

  getStarIcon(isFilled: boolean): string {
    return isFilled ? '&#9733;' : '&#9734;'; // Estrela cheia ou estrela vazia
  }
}
