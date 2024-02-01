// Future component - Occupency component : occupency statistics
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

import '../css/occupancy.css';

function Occupency(){

    const dates = ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01'];

    return (
        <div className="occupancy">
            <h2>Taux d'occupation</h2>
            <div className="occupancy__content">
            <LineChart
                xAxis={[{ scaleType: 'point', data: dates }]}
                series={[
                    {
                    data: [80, 88, 92, 98.5, 91, 87, 93],
                    area: true,
                    },
                ]}
                width={300}
                height={200}
            />
            </div>
        </div>

        );

    }

export default Occupency;