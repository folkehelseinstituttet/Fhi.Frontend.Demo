import { cloneDeep } from 'lodash-es';
import { OptionsChartTypePie } from './options-chart-type-pie';

const optionsChartTypeDonut = cloneDeep(OptionsChartTypePie);
optionsChartTypeDonut.plotOptions.pie.innerSize = '60%';

export const OptionsChartTypeDonut = optionsChartTypeDonut;
