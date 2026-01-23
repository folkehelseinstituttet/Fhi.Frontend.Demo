import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';

import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import {
  DiagramTypeGroupNames,
  DiagramTypeGroups,
} from '../constants-and-enums/diagram-type-groups';
import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { FlaggedSerie } from '../models/flagged-serie.model';
import { DiagramType } from '../models/diagram-type.model';
import { ChartTypes, DiagramTypes, MapTypes } from '../constants-and-enums/fhi-diagram-types';
import { FhiDiagramOptions, FhiDiagramTypeIds } from '../models/fhi-diagram-options.model';
import { FhiDiagramRequirements } from '../models/fhi-diagram-requirements.model';

enum msgId {
  hasFlaggedData,
  moreThanOneSeries,
  notAllUnitsFoundInSeries,
  notGeo,
  notMaxOneUnitInSeries,
  notTwoUnitsInSeries,
  notTwoUnits,
  onlyOneSerieAndAllDataAreFlagged,
}

@Injectable()
export class DiagramTypeGroupService {
  private activeDiagramType: DiagramType;
  private flaggedSeries!: FlaggedSerie[];
  private diagramOptions: FhiDiagramOptions;
  private series!: FhiDiagramSerie[];
  private diagramTypeDisabledWarnings: { [key in FhiDiagramTypeIds]?: string } = {};
  private diagramTypeDisabledWarningMessages: Record<msgId, { warning: string; message: string }> =
    {
      [msgId.hasFlaggedData]: {
        warning: 'series.length > 1 && flaggedSeries?.length !== 0',
        message: 'Det er valgt for mange kategorier med manglende data.',
      },
      [msgId.moreThanOneSeries]: {
        warning: 'series.length > 1',
        message: 'Denne visningen kan bare vise én serie om gangen. Velg bort ekstra serier.',
      },
      [msgId.notAllUnitsFoundInSeries]: {
        warning: 'notAllUnitsFoundInSeries',
        message: 'Krever at alle valgte måltall finnes i datasettet.',
      },
      [msgId.notGeo]: {
        warning: 'series.length === 1 && serieNotGeo(this.series[0])',
        message: 'Krever gyldige geografiske data for å vise en kartvisning.',
      },
      [msgId.notMaxOneUnitInSeries]: {
        warning: 'this.uniqueUnitIdCountInSeries() > 1',
        message:
          'Denne diagramtypen støtter kun ett nåltall. Sørg for at kun ett måltall er valgt.',
      },
      [msgId.notTwoUnitsInSeries]: {
        warning: 'this.uniqueUnitIdCountInSeries() !== 2',
        message: 'Krever nøyaktig to måltall med forskjellige måleenheter.',
      },
      [msgId.notTwoUnits]: {
        warning: 'diagramOptions.units?.length !== 2',
        message: 'Krever nøyaktig to måltall med definisjoner i metadata-konfigurasjonen.', // Trenger hjelp med denne fra Bernt
      },
      [msgId.onlyOneSerieAndAllDataAreFlagged]: {
        warning: 'onlyOneSerieAndAllDataAreFlagged',
        message: 'Kun én serie er valgt, og alle data er skjult eller mangler.',
      },
    };

  getDiagramTypeDisabledWarningMsg(activeDiagramType: string): string {
    return this.diagramTypeDisabledWarnings[activeDiagramType];
  }

  getDiagramRequirements(activeDiagramType: DiagramType): FhiDiagramRequirements[] {
    const requirements: FhiDiagramRequirements[] = [];
    const msg = this.diagramTypeDisabledWarningMessages;
    if (this.isAnyTypeButTable(activeDiagramType)) {
      requirements.push({
        label: msg[msgId.onlyOneSerieAndAllDataAreFlagged].message,
        isMet: !this.onlyOneSerieAndAllDataAreFlagged(activeDiagramType),
      });
    }
    if (this.isAnyTypeButTableOrColumnAndLine(activeDiagramType)) {
      requirements.push({
        label: msg[msgId.notMaxOneUnitInSeries].message,
        isMet: !this.notMaxOneUnitInSeries(activeDiagramType),
      });
    }
    if (this.isBarOrColumnType(activeDiagramType)) {
      requirements.push({
        label: msg[msgId.hasFlaggedData].message,
        isMet: !this.hasFlaggedData(activeDiagramType),
      });
    }
    if (this.isMapOrPieType(activeDiagramType)) {
      requirements.push({
        label: msg[msgId.moreThanOneSeries].message,
        isMet: !this.moreThanOneSeries(activeDiagramType),
      });
      requirements.push({
        label: msg[msgId.notTwoUnits].message,
        isMet: !this.notTwoUnits(activeDiagramType),
      });
    }
    if (this.isMapType(activeDiagramType)) {
      requirements.push({
        label: msg[msgId.notGeo].message,
        isMet: !this.notGeo(activeDiagramType),
      });
    }
    if (activeDiagramType.id === DiagramTypes.columnAndLine.id) {
      requirements.push({
        label: msg[msgId.notTwoUnits].message,
        isMet: !this.notTwoUnits(activeDiagramType),
      });
      requirements.push({
        label: msg[msgId.notTwoUnitsInSeries].message,
        isMet: !this.notTwoUnitsInSeries(activeDiagramType),
      });
      requirements.push({
        label: msg[msgId.notAllUnitsFoundInSeries].message,
        isMet: !this.notAllUnitsFoundInSeries(activeDiagramType),
      });
    }
    return requirements;
  }

  getActiveDiagramTypeGroup(groups: DiagramTypeGroup[]): DiagramTypeGroup {
    return groups.find((group) => group.diagramType.active);
  }

  getDiagramTypeGroups(
    diagramOptions: FhiDiagramOptions,
    flaggedSeries: FlaggedSerie[],
    previousDiagramTypeGroups: DiagramTypeGroup[],
  ): DiagramTypeGroup[] {
    this.diagramOptions = diagramOptions;
    this.series = diagramOptions.series;
    this.flaggedSeries = flaggedSeries;
    this.activeDiagramType = undefined;

    return this.createGroups(previousDiagramTypeGroups);
  }

  getDiagramTypeIsDisabled(groups: DiagramTypeGroup[], diagramTypeId: string): boolean {
    let disabled = false;
    groups.forEach((group) => {
      group.children.forEach((diagramType) => {
        if (diagramTypeId === diagramType.id && diagramType.disabled) {
          disabled = true;
        }
      });
    });
    if (disabled) {
      return true;
    }
    return false;
  }

  private createGroups(previousGroups: DiagramTypeGroup[]): DiagramTypeGroup[] {
    const groups: DiagramTypeGroup[] = [];
    cloneDeep(DiagramTypeGroups).forEach((group) => {
      groups.push(this.removeOrAddDiagramTypes(group));
    });
    this.updateChildrenDiagramTypeStates(groups);
    this.updateActiveDiagramType(groups);
    this.updateGroupDiagramTypeStates(groups, previousGroups);
    return groups.filter((group) => group.children?.length > 0);
  }

  private updateChildrenDiagramTypeStates(groups: DiagramTypeGroup[]) {
    groups.forEach((group) => {
      group.children.forEach((diagramType) => {
        diagramType.disabled = this.diagramTypeIsDisabled(diagramType);
        diagramType.active = this.diagramTypeIsActive(diagramType, groups);
      });
    });
  }

  private updateActiveDiagramType(groups: DiagramTypeGroup[]) {
    groups.forEach((group) => {
      const activeChild = group.children.find((diagramType) => diagramType.active);
      if (activeChild !== undefined) {
        this.activeDiagramType = activeChild;
      }
    });
  }

  private updateGroupDiagramTypeStates(
    groups: DiagramTypeGroup[],
    previousGroups: DiagramTypeGroup[],
  ) {
    groups.forEach((group, index) => {
      const activeChild = group.children.find(
        (diagramType) => diagramType.id === this.activeDiagramType.id,
      );
      const previousActiveChild = group.children.find((diagramType) => {
        if (previousGroups !== undefined) {
          return diagramType.id === previousGroups[index]?.diagramType.id;
        }
      });

      if (activeChild !== undefined) {
        group.diagramType = activeChild;
      } else if (previousActiveChild !== undefined) {
        group.diagramType = previousActiveChild;
      } else {
        group.diagramType = group.children[0];
      }
    });
  }

  private removeOrAddDiagramTypes(group: DiagramTypeGroup): DiagramTypeGroup {
    if (group.name === DiagramTypeGroupNames.table) {
      return group;
    }

    const navigation = this.diagramOptions.controls?.navigation;
    const items = navigation?.items;
    const isChart = group.name === DiagramTypeGroupNames.chart;
    const isMap = group.name === DiagramTypeGroupNames.map;

    if (!navigation || !navigation.show) {
      return group;
    }

    group.children = [];

    if ((isChart && !items?.chartTypes) || (isMap && !items?.mapTypes)) {
      return group;
    }

    if (isChart) {
      items.chartTypes.forEach((id) => {
        this.updateDiagramTypeGroup(id, group, ChartTypes, 'Chart');
      });
    }
    if (isMap) {
      items.mapTypes.forEach((id) => {
        this.updateDiagramTypeGroup(id, group, MapTypes, 'Map');
      });
    }

    return group;
  }

  private updateDiagramTypeGroup(
    id: string,
    group: DiagramTypeGroup,
    Types: DiagramType[],
    typeName: string,
  ) {
    const type = Types.find((type) => type.id === id);
    const typeExist = group.children.find((type) => type.id === id);

    if (type !== undefined && typeExist === undefined) {
      group.children.push(type);
    } else if (typeExist) {
      console.warn(typeName + ' type id: "' + id + '" is listed more than once.');
    } else {
      console.warn(typeName + ' type id: "' + id + '" is not valid.');
    }
  }

  private diagramTypeIsActive(diagramType: DiagramType, groups: DiagramTypeGroup[]): boolean {
    const activeFromOptionsNotFoundInGrops = (() =>
      groups.every(
        (group) =>
          group.children.find(
            (diagramType) => diagramType.id === this.diagramOptions.activeDiagramType,
          ) === undefined,
      ))();

    const fallbackToTable =
      diagramType.id === DiagramTypes.table.id && activeFromOptionsNotFoundInGrops;

    return diagramType.id === this.diagramOptions.activeDiagramType || fallbackToTable;
  }

  private diagramTypeIsDisabled(diagramType: DiagramType): boolean {
    if (this.isAnyTypeButTable(diagramType)) {
      if (this.onlyOneSerieAndAllDataAreFlagged(diagramType)) return true;
    }
    if (this.isAnyTypeButTableOrColumnAndLine(diagramType)) {
      if (this.notMaxOneUnitInSeries(diagramType)) return true;
    }
    if (this.isBarOrColumnType(diagramType)) {
      if (this.hasFlaggedData(diagramType)) return true;
    }
    if (this.isMapOrPieType(diagramType)) {
      if (this.moreThanOneSeries(diagramType)) return true;
    }
    if (this.isMapType(diagramType)) {
      if (this.notGeo(diagramType)) return true;
    }
    if (diagramType.id === DiagramTypes.columnAndLine.id) {
      if (this.notTwoUnits(diagramType)) return true;
      if (this.notTwoUnitsInSeries(diagramType)) return true;
      if (this.notAllUnitsFoundInSeries(diagramType)) return true;
    }

    return false;
  }

  private isBarOrColumnType(diagramType: DiagramType): boolean {
    return (
      diagramType.id === DiagramTypes.bar.id ||
      diagramType.id === DiagramTypes.barStacked.id ||
      diagramType.id === DiagramTypes.column.id ||
      diagramType.id === DiagramTypes.columnAndLine.id ||
      diagramType.id === DiagramTypes.columnStacked.id
    );
  }

  private isMapType(diagramType: DiagramType): boolean {
    return (
      diagramType.id === DiagramTypes.mapFylker.id ||
      diagramType.id === DiagramTypes.mapFylker2019.id ||
      diagramType.id === DiagramTypes.mapFylker2023.id
    );
  }

  private isMapOrPieType(diagramType: DiagramType): boolean {
    return this.isMapType(diagramType) || diagramType === DiagramTypes.pie;
  }

  private isAnyTypeButTable(diagramType: DiagramType): boolean {
    return diagramType.id !== DiagramTypes.table.id;
  }

  private isAnyTypeButTableOrColumnAndLine(diagramType: DiagramType): boolean {
    return !(
      diagramType.id === DiagramTypes.table.id || diagramType.id === DiagramTypes.columnAndLine.id
    );
  }

  private hasFlaggedData(diagramType: DiagramType): boolean {
    if (this.series.length > 1 && this.flaggedSeries?.length !== 0) {
      this.updateDisabledWarnings(diagramType.id, msgId.hasFlaggedData);
      return true;
    }
    return false;
  }

  private moreThanOneSeries(diagramType: DiagramType): boolean {
    if (this.series.length > 1) {
      this.updateDisabledWarnings(diagramType.id, msgId.moreThanOneSeries);
      return true;
    }
    return false;
  }

  private notAllUnitsFoundInSeries(diagramType: DiagramType): boolean {
    const allUnitsFoundInSeries = this.diagramOptions.units.every((unit) =>
      this.series.some((serie) => serie.unitId === unit.id),
    );

    if (!allUnitsFoundInSeries) {
      this.updateDisabledWarnings(diagramType.id, msgId.notAllUnitsFoundInSeries);
      return true;
    }
    return false;
  }

  private notGeo(diagramType: DiagramType): boolean {
    switch (diagramType.id) {
      case DiagramTypes.mapFylker.id:
        if (this.series.length === 1 && this.serieNotValidIsoCode(this.series)) {
          this.updateDisabledWarnings(diagramType.id, msgId.notGeo);
          return true;
        }
        return false;
      case DiagramTypes.mapFylker2019.id:
      case DiagramTypes.mapFylker2023.id:
        if (this.series.length === 1 && this.serieNotGeo(this.series[0])) {
          this.updateDisabledWarnings(diagramType.id, msgId.notGeo);
          return true;
        }
        return false;
      default:
        return true;
    }
  }

  private notMaxOneUnitInSeries(diagramType: DiagramType): boolean {
    if (this.uniqueUnitIdCountInSeries() > 1) {
      this.updateDisabledWarnings(diagramType.id, msgId.notMaxOneUnitInSeries);
      return true;
    }
    return false;
  }

  private notTwoUnitsInSeries(diagramType: DiagramType): boolean {
    if (this.uniqueUnitIdCountInSeries() !== 2) {
      this.updateDisabledWarnings(diagramType.id, msgId.notTwoUnitsInSeries);
      return true;
    }
    return false;
  }

  private notTwoUnits(diagramType: DiagramType): boolean {
    if (this.diagramOptions.units?.length !== 2) {
      this.updateDisabledWarnings(diagramType.id, msgId.notTwoUnits);
      return true;
    }
    return false;
  }

  private onlyOneSerieAndAllDataAreFlagged(diagramType: DiagramType): boolean {
    if (
      this.series.length === 1 &&
      this.series[0].data.every((dataPoint) => !(typeof dataPoint.y.valueOf() === 'number'))
    ) {
      this.updateDisabledWarnings(diagramType.id, msgId.onlyOneSerieAndAllDataAreFlagged);
      return true;
    }
    return false;
  }

  private updateDisabledWarnings(diagramTypeId: string, messageId: number) {
    const messages = this.diagramTypeDisabledWarningMessages;
    this.diagramTypeDisabledWarnings[diagramTypeId] = messages[messageId];
  }

  private serieNotGeo(serie: FhiDiagramSerie): boolean {
    const validGeoNames = this.getValidGeoNames();
    // Only testing first data point in serie since all data points should be valid geo
    if (
      validGeoNames.find((name) => name.toLowerCase() === serie.data[0].name.toLowerCase()) ===
      undefined
    ) {
      return true;
    }
    return false;
  }

  private uniqueUnitIdCountInSeries(): number {
    const uniqueIds = new Set<string | number>();
    this.series.filter((serie) => serie.unitId).forEach((serie) => uniqueIds.add(serie.unitId));
    return uniqueIds.size;
  }

  private serieNotValidIsoCode(serie: FhiDiagramSerie[]): boolean {
    const validIsoCodes = [
      '03',
      '11',
      '15',
      '18',
      '31',
      '32',
      '33',
      '34',
      '39',
      '40',
      '42',
      '46',
      '50',
      '55',
      '56',
    ];

    let noValidIsoCodeFound = true;
    serie[0].data.map((data) => {
      if (validIsoCodes.find((code) => code === data.dataPointId)) {
        noValidIsoCodeFound = false;
        return;
      }
    });
    return noValidIsoCodeFound;
  }

  /**
   * Returns a list of legal geo names for all maps
   *
   * PS. This gives 1 fact in 2 places, but the the maps will not change
   *     that often, and the benefit of being able to do a "disable map test"
   *     before the maps are loaded makes it worth it.
   */
  private getValidGeoNames(): string[] {
    const mapFylkerNames = [
      'Akershus',
      'Oslo',
      'Oslo (Fylke)',
      'Vestland',
      'Rogaland',
      'Trøndelag',
      'Innlandet',
      'Agder',
      'Østfold',
      'Møre og Romsdal',
      'Buskerud',
      'Vestfold',
      'Nordland',
      'Telemark',
      'Troms',
      'Finnmark',
    ];

    const mapFylker2019Names = [
      'Romsdal',
      'Sør-Trøndelag',
      'Hordaland',
      'Sogn og Fjordane',
      'Vest-Agder',
      'Østfold',
      'Nord-Trøndelag',
      'Rogaland',
      'Buskerud',
      'Vestfold',
      'Finnmark',
      'Nordland',
      'Troms',
      'Akershus',
      'Oppland',
      'Hedmark',
      'Oslo',
      'Telemark',
      'Aust-Agder',
    ];

    const mapFylker2023Names = [
      'Vestland',
      'Møre og Romsdal',
      'Agder',
      'Nordland',
      'Viken',
      'Rogaland',
      'Troms og Finnmark',
      'Trøndelag',
      'Oslo',
      'Vestfold og Telemark',
      'Innlandet',
    ];

    return mapFylkerNames.concat(mapFylkerNames, mapFylker2019Names, mapFylker2023Names);
  }
}
