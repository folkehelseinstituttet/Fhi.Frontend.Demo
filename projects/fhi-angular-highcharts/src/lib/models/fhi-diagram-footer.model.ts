import { FhiDiagramFlag } from './fhi-diagram-flag.model';

export interface FhiDiagramFooter {
  credits?: {
    href?: string;
    text: string;
  };
  disclaimer?: string;
  flags?: FhiDiagramFlag[];
  lastUpdated?: string;
}
