import { DiagramAdditionalLinkType } from '../constants-and-enums/diagram-additional-link-type';

export interface DiagramAdditionalLink {
  linkType: DiagramAdditionalLinkType;
  link: string;
}
