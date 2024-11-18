import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { FhiTreeViewNavigationItem as Item } from './fhi-tree-view-navigation-item.model';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'fhi-tree-view-navigation',
  templateUrl: './fhi-tree-view-navigation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FhiTreeViewNavigationComponent implements OnChanges {
  @Input() items: Item[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'].currentValue !== undefined) {
      this.createIds(this.items, 1);
    }
  }

  toggleExpanded(item: Item) {
    item.isExpanded = !item.isExpanded;
  }

  private createIds(items: Item[], id: number) {
    items.forEach((item) => {
      if (item.id === undefined) {
        item.id = id++;
      }
      if (item.children && item.children.length > 0) {
        this.createIds(item.children, (id - 1) * 10 + 1);
      }
    });
  }
}
