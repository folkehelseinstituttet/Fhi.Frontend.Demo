export enum DiagramTypeIds {
  bar,
  barStacked,
  column,
  columnAndLine,
  columnStacked,
  line,
  map,
  mapFylker,
  mapFylker2019,
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
  map: DiagramTypeIds[DiagramTypeIds.map],
  mapFylker: DiagramTypeIds[DiagramTypeIds.mapFylker],
  mapFylker2019: DiagramTypeIds[DiagramTypeIds.mapFylker2019],
  pie: DiagramTypeIds[DiagramTypeIds.pie],
  table: DiagramTypeIds[DiagramTypeIds.table],
};

export enum ChartTypeIds {
  bar,
  barStacked,
  column,
  columnStacked,
  line,
  pie,
}

// MapTypeIds represents the different topo.json maps currently supported,
export enum MapTypeIds {
  mapFylker,
  mapFylker2019,
}

export const MapTypeIdValues = {
  mapFylker: MapTypeIds[MapTypeIds.mapFylker],
  mapFylker2019: MapTypeIds[MapTypeIds.mapFylker2019],
};
