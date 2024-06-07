export enum DiagramTypeIds {
  bar,
  barStacked,
  column,
  columnAndLine,
  columnStacked,
  line,
  map, // TODO: remove in v5
  mapFylker,
  mapFylker2019,
  mapFylker2023,
  pie,
  table,
}

export const DiagramTypeIdValues = {
  bar: DiagramTypeIds[DiagramTypeIds.bar],
  barStacked: DiagramTypeIds[DiagramTypeIds.barStacked],
  column: DiagramTypeIds[DiagramTypeIds.column],
  columnAndLine: DiagramTypeIds[DiagramTypeIds.columnAndLine],
  columnStacked: DiagramTypeIds[DiagramTypeIds.columnStacked],
  line: DiagramTypeIds[DiagramTypeIds.line],
  mapFylker: DiagramTypeIds[DiagramTypeIds.mapFylker],
  mapFylker2019: DiagramTypeIds[DiagramTypeIds.mapFylker2019],
  mapFylker2023: DiagramTypeIds[DiagramTypeIds.mapFylker2023],
  pie: DiagramTypeIds[DiagramTypeIds.pie],
  table: DiagramTypeIds[DiagramTypeIds.table],
};

export enum ChartTypeIds {
  bar,
  barStacked,
  column,
  columnAndLine,
  columnStacked,
  line,
  pie,
}

// MapTypeIds represents the different topo.json maps currently supported,
export enum MapTypeIds {
  mapFylker,
  mapFylker2019,
  mapFylker2023,
}

export const MapTypeIdValues = {
  mapFylker: MapTypeIds[MapTypeIds.mapFylker],
  mapFylker2019: MapTypeIds[MapTypeIds.mapFylker2019],
  mapFylker2023: MapTypeIds[MapTypeIds.mapFylker2023],
};
