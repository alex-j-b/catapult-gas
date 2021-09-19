// React
import React, { useEffect } from 'react';
// Libs
import { ResponsiveLine } from '@nivo/line';

const Chart = ({ match, data, setTotal }) => {
    // Route params
    const params =  match.params.option ? match.params : { option: 'all' };

    // Slice desired part (each or all or d1...)
    const sliceOptions = {
        all: [0, 1],
        each: [1, data.length],
        d: [Number(params.deviceId), Number(params.deviceId) + 1]
    };
    const sliceTarget = sliceOptions[params.option];
    const targetData = data.slice(sliceTarget[0], sliceTarget[1]);

    useEffect(() => {
        // Update total liters display on option change
        const totalDisplay = targetData.length > 1 ? data[0].total : targetData[0].total;
        setTotal(totalDisplay);
    }, [params]);


    return (
        <ResponsiveLine
            data={targetData}
            margin={{ top: 60, right: 140, bottom: 50, left: 80 }}
            theme={{
                fontSize: 12,
                axis: { legend: { text: { fontSize: 16 } } }
            }}
            xScale={{ type: "time", format: "%d-%m-%Y" }}
            xFormat="time:%d-%m-%Y"
            axisBottom={{
                format: "%d-%m-%Y",
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 10
            }}
            yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
            yFormat=" >-.2f"
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 10,
                tickRotation: 0
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 50,
                    itemHeight: 40,
                    itemOpacity: 0.75,
                    symbolSize: 20,
                    symbolShape: 'circle'
                }
            ]}
        />
    )
}

export default Chart;
