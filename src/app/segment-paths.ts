export class SegmentPaths {

  /*
   * Main menu
   */

  static developer = 'developer';


  /*
   * Library top level
   */

  static icons = 'icons'; // Deprecated?
  static colorsAndFonts = 'colors-fonts'; // Deprecated?

  static components = 'components';
  static modules = 'modules';
  static pageTemplates = 'page-templates';


  /*
   * Library second level
   *
   * NB! These constants has a coupling to the mock data!
   *
   *   static foo = 'foo'; (in this file) corresponds to:
   *
   *   export const FooData: LibraryItem[] = [{...}];
   *     (in file src/MOCK_DB_DATA/library-items/foo/_foo.data)
   */

  static accordion = 'accordion';
  static table = 'table';

}
