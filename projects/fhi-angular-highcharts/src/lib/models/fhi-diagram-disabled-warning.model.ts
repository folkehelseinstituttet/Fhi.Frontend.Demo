import { FhiDiagramRequirements } from './fhi-diagram-requirements.model';

export interface FhiDiagramDisabledWarning {
  /** The title of the disabled warning
   * If no provided, no title will be displayed
   */
  title?: string;
  /** Whether to show the auto generated requirements
   * @default false
   */
  showRequirements?: boolean;
  /** Custom requirements
   * These will be displayed above the auto generated requirements, or generic warning message depending on showRequirements
   * @default []
   */
  customRequirements?: FhiDiagramRequirements[];
}
