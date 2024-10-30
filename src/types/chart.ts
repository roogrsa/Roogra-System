export interface ChartData {
  series: number[];
  labels: string[];
  statesData: { label: string; count: number; color: string }[];
  total: number;
}