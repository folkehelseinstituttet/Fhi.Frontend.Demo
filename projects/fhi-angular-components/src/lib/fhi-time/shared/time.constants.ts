import { getYear } from 'date-fns';

export class TimeConstants {
  private static dateToday = new Date();

  // Define default min and max year for all "FHI Time" components
  static minYear = 1900;
  static maxYear = getYear(this.dateToday);

  static minDate = new Date(this.minYear, 0);
  static maxDate = this.dateToday;
}
