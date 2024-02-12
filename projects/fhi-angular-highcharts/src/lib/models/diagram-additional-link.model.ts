import { DiagramMetadataLinkType } from '../constants-and-enums/diagram-additional-link-type';

export interface MetadataLink {
  link: string;
  linkType: string[DiagramMetadataLinkType];
}
