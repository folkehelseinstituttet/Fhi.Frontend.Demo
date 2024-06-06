import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';

import { DiagramTypeIdValues } from '../constants-and-enums/diagram-type-ids';
import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import { DiagramTypeGroups } from '../constants-and-enums/diagram-type-groups';
import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { FhiDiagramUnit } from '../models/fhi-diagram-unit.model';
import { FlaggedSerie } from '../models/flagged-serie.model';
import { DiagramType } from '../models/diagram-type.model';
import { DiagramTypes } from '../constants-and-enums/fhi-diagram-types';
import { FhiDiagramOptions } from '../models/fhi-diagram-options.model';

@Injectable()
export class DiagramTypeGroupService {
  private activeDiagramType: DiagramType;
  private diagramTypeGroups!: DiagramTypeGroup[];
  private flaggedSeries!: FlaggedSerie[];

  private diagramOptions: FhiDiagramOptions;

  private series!: FhiDiagramSerie[];
  private units!: FhiDiagramUnit[];

  getActiveDiagramType(): DiagramType {
    return this.activeDiagramType;
  }

  getActiveDiagramTypeGroup(): DiagramTypeGroup {
    let activeGroup: DiagramTypeGroup;
    this.diagramTypeGroups.forEach((group) => {
      if (group.diagramType.active) {
        activeGroup = group;
      }
    });
    return activeGroup;
  }

  getDiagramTypeGroups(): DiagramTypeGroup[] {
    return this.diagramTypeGroups;
  }

  updateDiagramTypeGroups(
    diagramOptions: FhiDiagramOptions,

    diagramTypeId: string,
    series: FhiDiagramSerie[],
    units: FhiDiagramUnit[],

    flaggedSeries: FlaggedSerie[],
    diagramTypeGroups: DiagramTypeGroup[],
  ) {
    this.diagramOptions = diagramOptions;

    this.series = series;
    this.units = units;

    this.flaggedSeries = flaggedSeries;
    this.activeDiagramType = undefined;
    this.diagramTypeGroups = diagramTypeGroups
      ? cloneDeep(diagramTypeGroups)
      : cloneDeep(DiagramTypeGroups);

    this.loopGroupsAndUpdateDiagramTypes(diagramTypeId);
    this.removeEmptyGroups();
    this.updateInactiveGroup();
    this.updateActiveGroup();
  }

  diagramTypeIsDisabled(diagramTypeId: string): boolean {
    let disabled = false;
    this.diagramTypeGroups.forEach((group) => {
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

  private loopGroupsAndUpdateDiagramTypes(diagramTypeId: string) {
    const diagramTypeSubset = this.getDiagramTypeSubset();
    this.diagramTypeGroups.forEach((group) => {
      if (diagramTypeSubset !== undefined && group.diagramType?.id !== DiagramTypeIdValues.table) {
        this.removeDiagramTypesNotInSubset(group, diagramTypeSubset);
      }
      group.children.forEach((diagramType) => {
        this.disableDiagramType(diagramType);
        this.setDiagramTypeToActive(diagramType, diagramTypeId);
      });
    });
  }

  private getDiagramTypeSubset(): string[] {
    const chartTypeSubset: string[] | undefined =
      this.diagramOptions.controls?.navigation?.items?.chartTypes;
    const mapTypeSubset: string[] | undefined =
      this.diagramOptions.controls?.navigation?.items?.mapTypes;
    return chartTypeSubset?.concat(mapTypeSubset);
  }

  private removeEmptyGroups() {
    this.diagramTypeGroups = this.diagramTypeGroups.filter((group) => group.children?.length > 0);
  }

  private updateInactiveGroup() {
    this.diagramTypeGroups.forEach((group) => {
      if (group.children.find((diagramType) => diagramType === group.diagramType) === undefined) {
        group.diagramType = group.children[0];
      }
    });
  }

  private updateActiveGroup() {
    let activeDiagramType: DiagramType;

    if (this.activeDiagramType) {
      activeDiagramType = this.activeDiagramType;
    } else {
      activeDiagramType = { ...DiagramTypes.table, active: true, disabled: false };
    }
    this.diagramTypeGroups.forEach((group) => {
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
    return this.series.length > 1 && this.flaggedSeries.length !== 0;
  }

  private disableBarStacked(): boolean {
    return this.disableBar();
  }

  private disableColumn(): boolean {
    return this.disableBar();
  }

  private disableColumnAndLine(): boolean {
    return this.disableBar() || this.units.length < 2;
  }

  private disableColumnStacked(): boolean {
    return this.disableBar();
  }

  private disableLine(): boolean {
    return (
      this.getNumberOfDataPointsPrSerie() === 1 ||
      (this.series.length > 1 && this.flaggedSeries.length !== 0)
    );
  }

  private disableMap(): boolean {
    return this.series.length > 1 || (this.series.length === 1 && this.isNotGeo(this.series[0]));
  }

  private disablePie(): boolean {
    return this.series.length > 1;
  }

  private getNumberOfDataPointsPrSerie(): number {
    // Using series[0] since all series should have the same length
    return this.series[0].data.length;
  }

  private isNotGeo(serie: FhiDiagramSerie): boolean {
    const validGeoNames = this.getValidGeoNames();

    // Only testing first data point in serie since all data points should be valid geo
    if (validGeoNames.find((name) => name === serie.data[0].name) === undefined) {
      return true;
    }
    return false;
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
      'Vestland',
      'Møre og Romsdal',
      'Agder',
      'Nordland',
      'Vikeng',
      'Rogaland',
      'Troms og Finnmark',
      'Trøndelag',
      'Oslo',
      'Vestfold og Telemark',
      'Innlandet',
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

    return mapFylkerNames.concat(mapFylker2019Names);
  }
}
