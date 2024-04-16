import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';

import { DiagramTypeIdValues } from '../constants-and-enums/diagram-type-ids';
import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import { DiagramTypeGroups_NEW } from '../constants-and-enums/diagram-type-groups';
import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { FlaggedSerie } from '../models/flagged-serie.model';
import { DiagramType } from '../models/diagram-type.model';
import { DiagramTypes } from '../constants-and-enums/fhi-diagram-types';

@Injectable()
export class DiagramTypeGroupService {
  // TODO: The premise for the new diagramTypeGroups is that "map types" is implementend the same
  //       way as "chart types", ie. that FhiDiagramOptions.mapTypeId is deprecated, and diferent
  //       maps has it own type in DiagramTypes, not just one type with id "map" as is the case today.
  private activeDiagramType: DiagramType;
  private diagramTypeGroups!: DiagramTypeGroup[];
  private flaggedSeries!: FlaggedSerie[];
  private series!: FhiDiagramSerie[];

  getDiagramTypeGroups(): DiagramTypeGroup[] {
    return this.diagramTypeGroups;
  }

  updateDiagramTypeGroups(
    diagramTypeId: string,
    diagramTypeSubset: string[] | undefined,
    flaggedSeries: FlaggedSerie[],
    series: FhiDiagramSerie[],
  ) {
    this.flaggedSeries = flaggedSeries;
    this.series = series;
    this.resetStateOfAllGroups();
    this.loopAndUpdateGroups(diagramTypeSubset, diagramTypeId);
    this.removeEmptyGroups();
    this.setActiveGroup();
  }

  private resetStateOfAllGroups() {
    this.activeDiagramType = undefined;
    this.diagramTypeGroups = cloneDeep(DiagramTypeGroups_NEW);
  }

  private loopAndUpdateGroups(diagramTypeSubset: string[], diagramTypeId: string) {
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

  private removeEmptyGroups() {
    this.diagramTypeGroups = this.diagramTypeGroups.filter(
      (group) => group.diagramType !== undefined,
    );
  }

  private setActiveGroup() {
    const activeDiagramType: DiagramType = this.activeDiagramType
      ? this.activeDiagramType
      : { ...DiagramTypes.table, active: true };

    this.diagramTypeGroups.forEach((group) => {
      if (group.children.find((type) => type.id === activeDiagramType.id) !== undefined) {
        group.diagramType = activeDiagramType;
      }
    });
  }

  private removeDiagramTypesNotInSubset(group: DiagramTypeGroup, diagramTypeSubset: string[]) {
    group.children = group.children.filter((type) => diagramTypeSubset.includes(type.id));
    group.diagramType = group.children[0];
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
      case DiagramTypeIdValues.map:
        diagramType.disabled = this.diagramTypeMapDisabled();
        break;

      case DiagramTypeIdValues.line:
        diagramType.disabled = this.diagramTypeLineDisabled();
        break;

      case DiagramTypeIdValues.pie:
        diagramType.disabled = this.diagramTypePieDisabled();
        break;

      default:
        diagramType.disabled = false;
    }
  }

  private diagramTypeMapDisabled(): boolean {
    return this.series.length > 1 || (this.series.length === 1 && this.isNotGeo(this.series[0]));
  }

  private isNotGeo(serie: FhiDiagramSerie): boolean {
    const validGeoNames = this.getValidGeoNames();

    // Only testing first data point in serie since all data points should be valid geo
    if (validGeoNames.find((name) => name === serie.data[0].name) === undefined) {
      return true;
    }
    return false;
  }

  private diagramTypeLineDisabled(): boolean {
    return (
      this.getNumberOfDataPointsPrSerie() === 1 ||
      (this.series.length > 1 && this.flaggedSeries.length !== 0)
    );
  }

  private diagramTypePieDisabled(): boolean {
    return this.series.length > 1;
  }

  private getNumberOfDataPointsPrSerie(): number {
    // Using series[0] since all series should have the same length
    return this.series[0].data.length;
  }

  /**
   * @returns a list of leagal geo names for all maps
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
