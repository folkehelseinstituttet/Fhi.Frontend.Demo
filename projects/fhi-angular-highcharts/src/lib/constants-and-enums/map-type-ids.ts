// MapTypeIds represents the different topo.json maps currently supported
export enum MapTypeIds {
  mapFylker,
  mapFylker2019,
}

export const MapTypeIdValues = {
  mapFylker: MapTypeIds[MapTypeIds.mapFylker],
  mapFylker2019: MapTypeIds[MapTypeIds.mapFylker2019],
};

export const MapTypeIdValuesArray = [MapTypeIdValues.mapFylker, MapTypeIdValues.mapFylker2019];
