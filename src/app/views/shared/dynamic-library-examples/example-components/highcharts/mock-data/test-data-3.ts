// Test data: Serier for "Befolkning (antall og andel) - inndeling per 1.1.2024"
//   For use in a PowerPoint
export const TestData = [
  {
    name: 'Antall testet',
    data: [
      { name: '2023-51', y: 2653 },
      { name: '2023-52', y: 6806 },
      { name: '2024-1', y: 8870 },
      { name: '2024-2', y: 6925 },
    ],
  },
  {
    name: 'Antall positive',
    data: [
      { name: '2023-51', y: 341 },
      { name: '2023-52', y: 1015 },
      { name: '2024-1', y: 1343 },
      { name: '2024-2', y: 1019 },
    ],
  },
  {
    name: 'Andel positive',
    data: [
      // TODO: is number of decimals rounded by FHI Angular Highcharts or by the consumer?
      { name: '2023-51', y: 12.85337 },
      { name: '2023-52', y: 14.91331 },
      { name: '2024-1', y: 15.14092 },
      { name: '2024-2', y: 14.7148 },
    ],
  },
];
