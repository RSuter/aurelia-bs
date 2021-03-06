﻿import { inject } from 'aurelia-framework';
import { observable } from 'aurelia-binding';

import { DialogBase } from '../dialog';
import { BsColumn } from '../grid/column';
import { BsGrid, BsGridDataRequest, BsGridDataResponse } from '../grid/grid';
import { BsTextbox } from '../textbox';
import { BsSelectGrid } from './select-grid';
import { BsSettings } from '../settings';
import { SelectionMode } from '..';

export interface IDialogButton {
  name?: string;
  title: string;
  isDefault?: boolean;
}

let translations = {
  'de': {
    'buttonCancel': 'Abbrechen',
    'buttonNoSelection': 'Keine Auswahl',
    'buttonSelectAll': 'Alle auswählen',
    'buttonUnselectAll': 'Alle deselektieren',
    'buttonOk': 'OK'
  },
  'en': {
    'buttonCancel': 'Cancel',
    'buttonNoSelection': 'No Selection',
    'buttonSelectAll': 'Select All',
    'buttonUnselectAll': 'Unselect All',
    'buttonOk': 'OK'
  }
};

@inject(Element)
export class BsSelectGridDialog extends DialogBase {
  translations = translations[BsSettings.language];

  @observable
  title: string;

  @observable
  filter = '';

  @observable
  items: any[] | null = [1, 2, 3];

  @observable
  required: boolean;

  @observable
  value: any | null | undefined = undefined;

  @observable
  values: any[] | null | undefined = undefined;

  grid: BsGrid;
  filterBox: BsTextbox;
  columns: BsColumn[];
  itemHeight: number;

  @observable
  loadData: (request: BsGridDataRequest) => Promise<BsGridDataResponse>;

  @observable
  defaultSortColumn: string;

  @observable
  defaultSortOrder: 'asc' | 'desc' | undefined = undefined;

  @observable
  selectionMode: SelectionMode;

  @observable
  displayPath: string | null = null;

  @observable
  tabindex: number = 0;

  @observable
  useKeyEvents: boolean;

  activate(selectGrid: BsSelectGrid) {
    this.title = selectGrid.label;
    this.items = selectGrid.items;
    this.itemHeight = selectGrid.itemHeight;
    this.required = selectGrid.required;
    this.columns = selectGrid.columns;
    this.loadData = selectGrid.loadData;
    this.defaultSortColumn = selectGrid.defaultSortColumn;
    this.defaultSortOrder = selectGrid.defaultSortOrder;
    this.selectionMode = selectGrid.selectionMode;
    this.displayPath = selectGrid.displayPath;
    this.values = selectGrid.values;
    this.tabindex = selectGrid.tabindex;
    this.useKeyEvents = selectGrid.useKeyEvents;
  }

  attached() {
    this.grid.columns = this.columns;
    this.grid.itemHeight = this.itemHeight;
    this.grid.selectionMode = this.selectionMode;
    this.grid.columnsChanged();
    this.filterBox.focus();
  }

  enterPressed() {
    if (this.selectionMode === SelectionMode.multiple) {
      if (this.grid.displayedItems && this.grid.displayedItems.length === 1) {
        let value = this.grid.displayedItems[0];
        if (this.values) {
          if (this.values.find(v => v === value)) {
            this.values = this.values.filter(v => v !== value);
          } else {
            this.values.push(value);
          }
        } else {
          this.values = [value];
        }
      }
    } else {
      if (this.grid.displayedItems && this.grid.displayedItems.length === 1) {
        this.value = this.grid.displayedItems[0];
        this.close();
      }
    }

  }

  valueChanged() {
    if (this.selectionMode === SelectionMode.single) {
      if (this.value) {
        this.close();
      }
    }
  }

  none() {
    if (this.selectionMode === SelectionMode.multiple) {
      this.values = [];
    } else {
      this.value = null;
      this.close();
    }
  }

  cancel() {
    if (this.selectionMode === SelectionMode.multiple) {
      this.values = undefined;
      this.close();
    } else {
      this.value = undefined;
      this.close();
    }
  }

  selectAll() {
    if (this.selectionMode === SelectionMode.multiple) {
      this.values = this.grid.items;
    }
  }

  ok() {
    this.close();
  }
}
