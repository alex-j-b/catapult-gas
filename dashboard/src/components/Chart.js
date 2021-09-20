// React
import React, { Component } from 'react';
// Libs
import _ from 'lodash';
import { ResponsiveLine } from '@nivo/line';

// Slice desired part (each or all or d1...)
const sliceData = (d, m) => {
    const params =  m.params.option ? m.params : { option: 'all' };
    const sliceOptions = {
        all: [0, 1],
        each: [1, d.length],
        d: [Number(params.deviceId), Number(params.deviceId) + 1]
    };
    const target = sliceOptions[params.option];
    const slicedData = d.slice(target[0], target[1]);

    return slicedData;
}


class Chart extends Component {
    state = {
        slicedData: sliceData(this.props.data, this.props.match)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newSlice = sliceData(nextProps.data, nextProps.match);
        // Update total liters display
        const totalDisplay = newSlice.length > 1 ? nextProps.data[0].total : newSlice[0].total;
        nextProps.setTotal(totalDisplay.toLocaleString());

        return {
            slicedData: newSlice
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props.match.params, nextProps.match.params);
    }

    componentDidMount() {
        // Update total liters display
        const totalDisplay = this.state.slicedData.length > 1 ? this.props.data[0].total : this.state.slicedData[0].total;
        this.props.setTotal(totalDisplay.toLocaleString());
    }

    render() {
        return (
            <ResponsiveLine
                data={this.state.slicedData}
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
}

export default Chart;
