// Test data designed to trigger validation errors on ALL diagram types
export const TestData12 = [
  {
    name: 'Serie 1',
    unitId: 'enhet1',
    data: [
      { name: 'InvalidGeoName1', y: 100 },
      { name: 'InvalidGeoName2', y: '.' }, // Flagged data
      { name: 'InvalidGeoName3', y: 150 },
    ],
  },
  {
    name: 'Serie 2',
    unitId: 'enhet2',
    data: [
      { name: 'InvalidGeoName1', y: 200 },
      { name: 'InvalidGeoName2', y: 250 },
      { name: 'InvalidGeoName3', y: ':' }, // Flagged data
    ],
  },
  {
    name: 'Serie 3',
    unitId: 'enhet3',
    data: [
      { name: 'InvalidGeoName1', y: 300 },
      { name: 'InvalidGeoName2', y: 350 },
      { name: 'InvalidGeoName3', y: 400 },
    ],
  },
];
