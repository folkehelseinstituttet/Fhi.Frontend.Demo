import { MetadataLinkType } from '../constants-and-enums/metadata-link-types';

export interface MetadataLink {
  link: string;
  linkType: string[MetadataLinkType];
}
