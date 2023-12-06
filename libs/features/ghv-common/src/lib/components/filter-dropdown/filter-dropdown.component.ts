import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ClrDropdownModule, ClrIconModule } from '@clr/angular';
import { FilterOption } from '@ghv/viewer-data-access';

@Component({
  selector: 'ghv-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css'],
  standalone: true,
  imports: [CommonModule, ClrDropdownModule, ClrIconModule],
})
export class FilterDropdownComponent {
  @Input() name = '';
  @Input() description = '';
  @Input() current: string | null = '';
  @Input() items: FilterOption[] = [];
  @Input() toggle? = false;

  @Output() setFilter: EventEmitter<string> = new EventEmitter();

  isOpen = false;

  constructor(private elRef: ElementRef) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  handleSetFilterClick(label: string) {
    if (label === this.current) {
      if (this.toggle) {
        this.setFilter.emit('');
      } else {
        this.setFilter.emit(this.items[0].value);
      }
    } else {
      this.setFilter.emit(label);
    }
    this.isOpen = false;
  }

  handleClearFilterClick() {
    this.setFilter.emit(this.items[0].value);
    this.isOpen = false;
  }
}
