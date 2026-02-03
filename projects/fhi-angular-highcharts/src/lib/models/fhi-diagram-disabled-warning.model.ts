import { FhiDiagramRequirements } from "./fhi-diagram-requirements.model";

export interface FhiDiagramDisabledWarning {
    title?: string;
    showRequirements?: boolean;
    customRequirements?: FhiDiagramRequirements[];
}
