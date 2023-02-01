import { Injectable } from "@angular/core";

@Injectable()
export class PrototypePageheaderDataService {
  getNodes() {
    return {
      name: 'Dødsårsaksregisteret',
      nameLong: 'Dødsårsaksregisteret statistikkbank',
      subMenu: [
        {
          name: 'Alle dødsårsaker'
        },
        {
          name: 'Demens'
        },
        {
          name: 'Hjerte- og karsykdom'
        },
        {
          name: 'Kreft'
        },
        {
          name: 'Selvmord'
        },
        {
          name: 'Ulykker'
        },
        {
          name: 'Dødssted'
        },
        {
          name: 'Fylker'
        }
      ]
    }
  }
}
