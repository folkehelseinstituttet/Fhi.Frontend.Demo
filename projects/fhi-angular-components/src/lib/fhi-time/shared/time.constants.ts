export class TimeConstants {
  private static dateToday = new Date();

  // Define default min and max year for all "FHI Time" components
  static minYear = 1900;
  static maxYear = 2099;

  // TODO: maxWeek need to use the week-utility to check for 53 weeks in year...
  static minWeek = { year: this.minYear, week: 1 };
  static maxWeek = { year: this.maxYear, week: 52 };

  static minDate = new Date(this.minYear, 0);
  static maxDate = new Date(2099, 11, 31);
}
