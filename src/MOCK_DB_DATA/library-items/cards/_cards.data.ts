import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { Card } from './card';
import { CardShadow } from './card-shadow';
import { CardDeactive } from './card-deactive';

export const CardData: LibraryItem[] = [...Card, ...CardShadow, ...CardDeactive];
