import { MetadataLinkTypes } from '../constants-and-enums/metadata-link-types';

export interface MetadataLink {
  link: string;
  linkType: keyof typeof MetadataLinkTypes;
}
