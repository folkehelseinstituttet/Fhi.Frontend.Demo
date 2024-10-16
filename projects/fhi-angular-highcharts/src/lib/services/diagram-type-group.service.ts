import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';

import { DiagramTypeIdValues } from '../constants-and-enums/diagram-type-ids';
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

@Injectable()
export class DiagramTypeGroupService {
  private activeDiagramType: DiagramType;
  private flaggedSeries!: FlaggedSerie[];
  private diagramOptions: FhiDiagramOptions;
  private series!: FhiDiagramSerie[];
  private diagramTypeDisabledWarnings: { [key in FhiDiagramTypeIds]?: string } = {};
  private diagramTypeDisabledWarningsText = {
    flaggedData: 'series.length > 1 && flaggedSeries?.length !== 0',
    moreThanOneSeries: 'series.length > 1',
    notTwoUnits: 'diagramOptions.units?.length !== 2',
    notMinTwoUnitsInSeries: 'this.uniqueUnitIdCountInSeries() < 2',
    notGeo: 'series.length === 1 && isNotGeo(this.series[0])',
    noSeriesOrNoData: 'this.series.length === 0 || this.series[0].data.length === 0',
    allDataInOneOrMoreSeriesAreFlagged: 'allDataInOneOrMoreSeriesAreFlagged',
  };

  getDiagramTypeDisabledWarningMsg(activeDiagramType: string): string {
    return this.diagramTypeDisabledWarnings[activeDiagramType];
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

  diagramTypeIsDisabled(groups: DiagramTypeGroup[], diagramTypeId: string): boolean {
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
        if (this.series.length === 0 || this.series[0].data.length === 0) {
          diagramType.disabled = true;
          this.diagramTypeDisabledWarnings[diagramType.id] =
            this.diagramTypeDisabledWarningsText.noSeriesOrNoData;
        } else {
          diagramType.disabled = this.getDisabledState(diagramType);
        }
        diagramType.active = this.getActiveState(diagramType, groups);
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

      if (activeChild !== undefined) {
        group.diagramType = activeChild;
      } else if (previousGroups !== undefined && previousGroups[index]?.diagramType !== undefined) {
        group.diagramType = group.children.find(
          (diagramType) => diagramType.id === previousGroups[index].diagramType.id,
        );
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
        group.children.push(ChartTypes.find((type) => type.id === id));
      });
    }
    if (isMap) {
      items.mapTypes.forEach((id) => {
        group.children.push(MapTypes.find((type) => type.id === id));
      });
    }

    return group;
  }

  private getActiveState(diagramType: DiagramType, groups: DiagramTypeGroup[]) {
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

  private getDisabledState(diagramType: DiagramType) {
    switch (diagramType.id) {
      case DiagramTypeIdValues.bar:
        return this.disableBar();

      case DiagramTypeIdValues.barStacked:
        return this.disableBarStacked();

      case DiagramTypeIdValues.column:
        return this.disableColumn();

      case DiagramTypeIdValues.columnAndLine:
        return this.disableColumnAndLine();

      case DiagramTypeIdValues.columnStacked:
        return this.disableColumnStacked();

      case DiagramTypeIdValues.mapFylker:
      case DiagramTypeIdValues.mapFylker2019:
      case DiagramTypeIdValues.mapFylker2023:
        return this.disableMap();

      case DiagramTypeIdValues.pie:
        return this.disablePie();

      default:
        return false;
    }
  }

  private disableBar(): boolean {
    if (this.series.length > 1 && this.flaggedSeries?.length !== 0) {
      this.diagramTypeDisabledWarnings.bar = this.diagramTypeDisabledWarningsText.flaggedData;
      return true;
    }
    return false;
  }

  private disableBarStacked(): boolean {
    if (this.disableBar()) {
      this.diagramTypeDisabledWarnings.barStacked =
        this.diagramTypeDisabledWarningsText.flaggedData;
      return true;
    }
    return false;
  }

  private disableColumn(): boolean {
    if (this.disableBar()) {
      this.diagramTypeDisabledWarnings.column = this.diagramTypeDisabledWarningsText.flaggedData;
      return true;
    }
    return false;
  }

  private disableColumnAndLine(): boolean {
    if (this.disableBar()) {
      this.diagramTypeDisabledWarnings.columnAndLine =
        this.diagramTypeDisabledWarningsText.flaggedData;
      return true;
    } else if (this.diagramOptions.units?.length !== 2) {
      this.diagramTypeDisabledWarnings.columnAndLine =
        this.diagramTypeDisabledWarningsText.notTwoUnits;
      return true;
    } else if (this.uniqueUnitIdCountInSeries() < 2) {
      this.diagramTypeDisabledWarnings.columnAndLine =
        this.diagramTypeDisabledWarningsText.notMinTwoUnitsInSeries;
      return true;
    }
    return false;
  }

  private uniqueUnitIdCountInSeries() {
    const uniqueIds = new Set<string | number>();
    this.series.filter((serie) => serie.unitId).forEach((serie) => uniqueIds.add(serie.unitId));
    return uniqueIds.size;
  }

  private disableColumnStacked(): boolean {
    if (this.disableBar()) {
      this.diagramTypeDisabledWarnings.columnStacked =
        this.diagramTypeDisabledWarningsText.flaggedData;
      return true;
    }
    return false;
  }

  private disableMap(): boolean {
    let disable = false;
    let message: string;

    if (this.series.length > 1) {
      disable = true;
      message = this.diagramTypeDisabledWarningsText.moreThanOneSeries;
    } else if (this.series.length === 1 && this.isNotGeo(this.series[0])) {
      disable = true;
      message = this.diagramTypeDisabledWarningsText.notGeo;
    } else if (this.allDataInOneOrMoreSeriesAreFlagged(this.series)) {
      disable = true;
      message = this.diagramTypeDisabledWarningsText.allDataInOneOrMoreSeriesAreFlagged;
    }
    this.diagramTypeDisabledWarnings.mapFylker =
      this.diagramTypeDisabledWarnings.mapFylker2019 =
      this.diagramTypeDisabledWarnings.mapFylker2023 =
        message;
    return disable;
  }

  private disablePie(): boolean {
    if (this.series.length > 1) {
      this.diagramTypeDisabledWarnings.pie = this.diagramTypeDisabledWarningsText.moreThanOneSeries;
      return true;
    }
    return false;
  }

  private isNotGeo(serie: FhiDiagramSerie): boolean {
    const validGeoNames = this.getValidGeoNames();

    // Only testing first data point in serie since all data points should be valid geo
    if (validGeoNames.find((name) => name === serie.data[0].name) === undefined) {
      return true;
    }
    return false;
  }

  private allDataInOneOrMoreSeriesAreFlagged(series: FhiDiagramSerie[]): boolean {
    let allDataInOneSerieFlagged = false;
    series.forEach((serie) => {
      if (serie.data.every((dataPoint) => !(typeof dataPoint.y.valueOf() === 'number'))) {
        allDataInOneSerieFlagged = true;
      }
    });
    return allDataInOneSerieFlagged;
  }

  /**
   * Returns a list of leagal geo names for all maps
   *
   * PS. This gives 1 fact in 2 places, but the the maps will not change
   *     that often, and the benefit of being able to do a "disable map test"
   *     before the maps are loaded makes it worth it.
   */
  private getValidGeoNames(): string[] {
    const mapFylkerNames = [
      'Akershus',
      'Oslo',
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

    return mapFylkerNames.concat(mapFylker2019Names, mapFylker2023Names);
  }
}
