import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';

import { DiagramTypeIdValues } from '../constants-and-enums/diagram-type-ids';
import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import { DiagramTypeGroups } from '../constants-and-enums/diagram-type-groups';
import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { FlaggedSerie } from '../models/flagged-serie.model';
import { DiagramType } from '../models/diagram-type.model';
import { DiagramTypes } from '../constants-and-enums/fhi-diagram-types';
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
    notGeo: 'series.length === 1 && isNotGeo(this.series[0])',
    noSeriesOrNoData: 'this.series.length === 0 || this.series[0].data.length === 0',
    allDataInOneOrMoreSeriesAreFlagged: 'allDataInOneOrMoreSeriesAreFlagged',
  };

  getDiagramTypeDisabledWarningMsg(activeDiagramType: string): string {
    return this.diagramTypeDisabledWarnings[activeDiagramType];
  }

  getActiveDiagramTypeGroup(groups: DiagramTypeGroup[]): DiagramTypeGroup {
    let activeGroup: DiagramTypeGroup;
    groups.forEach((group) => {
      if (group.diagramType.active) {
        activeGroup = group;
      }
    });
    return activeGroup;
  }

  getDiagramTypeGroups(
    diagramOptions: FhiDiagramOptions,
    flaggedSeries: FlaggedSerie[],
    diagramTypeGroups: DiagramTypeGroup[],
  ): DiagramTypeGroup[] {
    this.diagramOptions = diagramOptions;
    this.series = this.diagramOptions.series;
    this.flaggedSeries = flaggedSeries;
    this.activeDiagramType = undefined;

    let groups = diagramTypeGroups ? cloneDeep(diagramTypeGroups) : cloneDeep(DiagramTypeGroups);

    groups = this.updateDiagramTypes(groups);
    groups = this.removeEmptyGroups(groups);
    groups = this.updateInactiveGroup(groups);
    groups = this.updateActiveGroup(groups);

    return groups;
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

  private updateDiagramTypes(groups: DiagramTypeGroup[]): DiagramTypeGroup[] {
    const diagramTypeSubset = this.getDiagramTypeSubset();
    groups.forEach((group) => {
      if (diagramTypeSubset !== undefined && group.diagramType?.id !== DiagramTypeIdValues.table) {
        this.removeDiagramTypesNotInSubset(group, diagramTypeSubset);
      }
      group.children.forEach((diagramType) => {
        if (this.series.length === 0 || this.series[0].data.length === 0) {
          diagramType.disabled = true;
          this.diagramTypeDisabledWarnings[diagramType.id] =
            this.diagramTypeDisabledWarningsText.noSeriesOrNoData;
        } else {
          this.disableDiagramType(diagramType);
        }
        this.setDiagramTypeToActive(diagramType, this.diagramOptions.activeDiagramType);
      });
    });
    return groups;
  }

  private getDiagramTypeSubset(): string[] {
    const chartTypeSubset: string[] | undefined =
      this.diagramOptions.controls?.navigation?.items?.chartTypes;
    const mapTypeSubset: string[] | undefined =
      this.diagramOptions.controls?.navigation?.items?.mapTypes;
    return chartTypeSubset?.concat(mapTypeSubset);
  }

  private removeEmptyGroups(groups: DiagramTypeGroup[]): DiagramTypeGroup[] {
    return groups.filter((group) => group.children?.length > 0);
  }

  private updateInactiveGroup(groups: DiagramTypeGroup[]): DiagramTypeGroup[] {
    groups.forEach((group) => {
      if (group.children.find((diagramType) => diagramType === group.diagramType) === undefined) {
        group.diagramType = group.children[0];
      }
    });
    return groups;
  }

  private updateActiveGroup(groups: DiagramTypeGroup[]): DiagramTypeGroup[] {
    let activeDiagramType: DiagramType;

    if (this.activeDiagramType) {
      activeDiagramType = this.activeDiagramType;
    } else {
      activeDiagramType = { ...DiagramTypes.table, active: true, disabled: false };
    }
    groups.forEach((group) => {
      if (
        group.children.find((diagramType) => diagramType.id === activeDiagramType.id) !== undefined
      ) {
        if (group.diagramType.id === DiagramTypes.table.id) {
          group.children[0] = activeDiagramType;
        }
        group.diagramType = activeDiagramType;
      } else {
        group.diagramType.active = false;
      }
    });
    return groups;
  }

  private removeDiagramTypesNotInSubset(group: DiagramTypeGroup, diagramTypeSubset: string[]) {
    group.children = group.children.filter((type) => diagramTypeSubset.includes(type.id));
  }

  private setDiagramTypeToActive(diagramType: DiagramType, diagramTypeId: string) {
    if (diagramType.id === diagramTypeId) {
      diagramType.active = true;
      this.activeDiagramType = diagramType;
    } else {
      diagramType.active = false;
    }
  }

  private disableDiagramType(diagramType: DiagramType) {
    switch (diagramType.id) {
      case DiagramTypeIdValues.bar:
        diagramType.disabled = this.disableBar();
        break;

      case DiagramTypeIdValues.barStacked:
        diagramType.disabled = this.disableBarStacked();
        break;

      case DiagramTypeIdValues.column:
        diagramType.disabled = this.disableColumn();
        break;

      case DiagramTypeIdValues.columnAndLine:
        diagramType.disabled = this.disableColumnAndLine();
        break;

      case DiagramTypeIdValues.columnStacked:
        diagramType.disabled = this.disableColumnStacked();
        break;

      case DiagramTypeIdValues.line:
        diagramType.disabled = this.disableLine();
        break;

      case DiagramTypeIdValues.mapFylker:
      case DiagramTypeIdValues.mapFylker2019:
      case DiagramTypeIdValues.mapFylker2023:
        diagramType.disabled = this.disableMap();
        break;

      case DiagramTypeIdValues.pie:
        diagramType.disabled = this.disablePie();
        break;

      default:
        diagramType.disabled = false;
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
    }
    return false;
  }

  private disableColumnStacked(): boolean {
    if (this.disableBar()) {
      this.diagramTypeDisabledWarnings.columnStacked =
        this.diagramTypeDisabledWarningsText.flaggedData;
      return true;
    }
    return false;
  }

  private disableLine(): boolean {
    if (this.disableBar()) {
      this.diagramTypeDisabledWarnings.line = this.diagramTypeDisabledWarningsText.flaggedData;
      return true;
    }
    return false;
  }

  private disableMap(): boolean {
    let disable: boolean;
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

  private allDataInOneOrMoreSeriesAreFlagged(series: FhiDiagramSerie[]) {
    let allFlaggedInOneOreMoreSeries = true;
    series.forEach((serie) => {
      let allFlaggedInCurrentSerie = true;
      serie.data.forEach((dataPoint) => {
        allFlaggedInCurrentSerie = !(dataPoint.y.valueOf() === 'number');
      });
      if (allFlaggedInOneOreMoreSeries && !allFlaggedInCurrentSerie) {
        allFlaggedInOneOreMoreSeries = false;
      }
    });
    return allFlaggedInOneOreMoreSeries;
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
