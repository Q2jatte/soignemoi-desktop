import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

import '../css/occupancy.css';

function Occupency(){

return (
    <div className="occupancy">
        <h2>Taux d'occupation</h2>
        <div className="occupancy__content">
        <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
                {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
                },
            ]}
            width={500}
            height={300}
        />
        </div>
    </div>

    );

}

export default Occupency;