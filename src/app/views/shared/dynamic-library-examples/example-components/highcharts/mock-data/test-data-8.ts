// Test data: "Agens"
//   For use when creating new diagramtype: "Dual axes, line and column"
export const TestData = [
  {
    name: 'Antall testet',
    scale: 'foo',
    data: [
      { name: '2023-51', y: 2653 },
      { name: '2023-52', y: 6806 },
      { name: '2024-1', y: 8870 },
      { name: '2024-2', y: 6925 },
    ],
  },
  {
    name: 'Antall positive',
    scale: 'foo',
    data: [
      { name: '2023-51', y: 341 },
      { name: '2023-52', y: 1015 },
      { name: '2024-1', y: 1343 },
      { name: '2024-2', y: 1019 },
    ],
  },
  {
    name: 'Andel positive',
    scale: 'bar',
    data: [
      // TODO: where is 0.x calculated to a percent value (* 100)?
      { name: '2023-51', y: 0.1285337 },
      { name: '2023-52', y: 0.1491331 },
      { name: '2024-1', y: 0.1514092 },
      { name: '2024-2', y: 0.147148 },
    ],
  },
];
