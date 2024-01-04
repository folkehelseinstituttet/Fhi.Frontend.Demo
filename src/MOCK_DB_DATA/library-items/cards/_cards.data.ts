import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { CardsIntro } from './_cards.intro';

import { Card } from './card';
import { CardShadow } from './card-shadow';
import { CardDeactive } from './card-deactive';

export const Cards: LibraryItem[] = [...Card, ...CardShadow, ...CardDeactive];

export const CardsData: LibraryItemGroup = {
  id: GROUPS.Cards.id,
  title: GROUPS.Cards.title,
  titleLang: GROUPS.Cards.titleLang,
  intro: CardsIntro,
  libraryItems: Cards,
};
