import { Injectable } from "@angular/core";

@Injectable()
export class TableExamplesDataService {
  getNodes() {
    return {
      productionTeam: [
        {
          id: '2003',
          firstName: 'Sigurd',
          lastName: 'Bråten',
          role: 'Designer',
        },
        {
          id: '1009',
          firstName: 'Elida',
          lastName: 'Egge',
          role: 'Producer',
        },
        {
          id: '1202',
          firstName: 'Henrik',
          lastName: 'Olsen',
          role: 'Assistant',
        },
      ]
    }
  }
}
