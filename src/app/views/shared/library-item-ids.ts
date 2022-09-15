
// The id value is set in const LibraryItemIds at the bottom of this file

const AccordionIds = {
  Accordion: undefined,
  AccordionFlush: undefined,
  AccordionFlushFhi: undefined
}

const AlertsIds = {
  Alert: undefined,
  AlertDismissible: undefined
}

const BadgeIds = {
  BadgeCircular: undefined,
  BadgeRounded: undefined
}

const ButtonsIds = {
  ButtonPrimary: undefined,
  ButtonSecondary: undefined,
  ButtonFlat: undefined
}

const ColorIds = {
  ColorSystem: undefined,
  ColorBootstrap: undefined,
  ColorFonts: undefined
}

const FormsIds = {
  FormInput: undefined,
  FormTextarea: undefined,
  FormValidation: undefined,
  FormCheckbox: undefined,
  FormRadio: undefined,
  FormSelect: undefined,
  FormSwitch: undefined
}

export const IconsIds = {
  IconSet: undefined
}

export const ModalIds = {
  Modal: undefined
}

export const PaginationIds = {
  Pagination: undefined
}

export const SearchIds = {
  Search: undefined
}

export const TableIds = {
  Table: undefined,
  TableSelectableRow: undefined,
  TableSortable: undefined
}

export const TagsIds = {
  TagCategory: undefined,
  TagFilterOption: undefined,
  TagMultipleSelection: undefined,
  TagSingleSelection: undefined,
  TagState: undefined
}

export const ToastIds = {
  Toast: undefined
}

export const TooltipIds = {
  Tooltip: undefined
}

export const TypographyIds = {
  HeadingLevels: undefined,
  TypographicHierarchy: undefined
}

const libraryItemIds = {
  ...AccordionIds,
  ...AlertsIds,
  ...BadgeIds,
  ...ButtonsIds,
  ...ColorIds,
  ...FormsIds,
  ...IconsIds,
  ...ModalIds,
  ...PaginationIds,
  ...SearchIds,
  ...TableIds,
  ...TagsIds,
  ...ToastIds,
  ...TooltipIds,
  ...TypographyIds
}


export const LibraryItemIds = (() => {
  let n = 0;
  Object.keys(libraryItemIds).forEach((key) => {
    libraryItemIds[key] = 'library-item-' + ++n;
  });
  return libraryItemIds;
})();
