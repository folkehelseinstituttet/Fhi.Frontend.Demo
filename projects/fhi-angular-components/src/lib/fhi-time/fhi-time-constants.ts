// TODO: FhiTimeConstants -> something local...
export class FhiTimeConstants {
  // TODO: i18n

  // Datepicker

  // Weekpicker
  static weekpickerPlaceholder = 'åååå-uu';
  static weekpickerLabel = 'Velg uke';
  static weekpickerDelimiter = '-';

  // Week range
  static weekRangeLabelFrom = 'Fra uke';
  static weekRangeLabelTo = 'Til uke';

  // TODO: rename and/or move these
  static maxWeek = { year: new Date().getFullYear() + 1, week: 52 };
  static minWeek = { year: 1900, week: 1 };
  static monthNames = [
    'Januar',
    'Februar',
    'Mars',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
}
