import { Injectable } from "@angular/core";

@Injectable()
export class PrototypePageheaderDataService {
  getPrototypeMenuItems() {
    return [
      {
        name: 'Folkehelsestatistikk',
        nameLong: 'Folkehelsestatistikk'
      },
      {
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
      },
      {
        name: 'MSIS',
        nameLong: 'MSIS - Meldesystem for smittsomme sykdommer'
      },
      {
        name: 'SYSVAK',
        nameLong: 'SYSVAK - Nasjonalt vaksinasjonsregister'
      },
      {
        name: 'Legemiddelregisteret',
        nameLong: 'Legemiddelregisteret'
      },
      {
        name: 'Medisinsk fødselsregister (MFR)',
        nameLong: 'Medisinsk fødselsregister (MFR)'
      },
      {
        name: 'Abortregisteret',
        nameLong: 'Abortregisteret'
      },
      {
        name: 'Hjerte- og karregisteret',
        nameLong: 'Hjerte- og karregisteret'
      },
    ];
  }
}
