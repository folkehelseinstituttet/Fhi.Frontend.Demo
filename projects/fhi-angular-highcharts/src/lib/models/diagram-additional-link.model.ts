import { DiagramAdditionalLinkType } from '../constants-and-enums/diagram-additional-link-type';

export interface AdditionalLink {
  icon?: string;
  link: string;
  linkText?: string;
  linkType: string[DiagramAdditionalLinkType];
}
