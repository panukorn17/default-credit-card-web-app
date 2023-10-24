import React from 'react';
import { scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';

interface ScatterPlotProps {
    width: number;
    height: number;
    data: any[];
    xAccessor: (d: any) => number;
    yAccessor: (d: any) => number;
    title: string;
    predictions: number[];
    hasFetchedPredictions: boolean;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ predictions, hasFetchedPredictions, width, height, data, xAccessor, yAccessor, title }) => {
    // Guard against null or undefined data
    if (!data) {
        return null; // or some fallback UI
    }
    // Define scales
    const xScale = scaleLinear({
        domain: [
            Math.min(...data.map(d => xAccessor(d) || 0)), 
            Math.max(...data.map(d => xAccessor(d) || 0))
        ],
        range: [0, width],
    });

    const yScale = scaleLinear({
        domain: [
            Math.min(...data.map(d => yAccessor(d) || 0)), 
            Math.max(...data.map(d => yAccessor(d) || 0))
        ],
        range: [height, 0], 
    });

    const getColorFromPrediction = (prediction: number) => {
        if (!hasFetchedPredictions) {
            return 'steelblue'; // Default color if predictions haven't been fetched
        }
        switch (prediction) {
            case 0:
                return 'red';
            case 1:
                return 'green';
            case 2:
                return 'blue';
            default:
                return 'steelblue';
        }
    };

    return (
        <div>
            <h3>{title}</h3>
            <svg width={width} height={height}>
                <Group left={40} top={20}>
                    {Array.isArray(data) && data.map((d, i) => (
                        <Circle
                            key={i}
                            cx={xScale(xAccessor(d))}
                            cy={yScale(yAccessor(d))}
                            r={4}
                            fill={predictions && predictions.length > i ? getColorFromPrediction(predictions[i]) : 'steelblue'}
                            opacity={0.3}
                        />
                    ))}
                    <AxisBottom top={height - 40} scale={xScale} />
                    <AxisLeft scale={yScale} />
                </Group>
            </svg>
        </div>
    );
};

ScatterPlot.defaultProps = {
    data: [],
    predictions: [],
    hasFetchedPredictions: false,
};

export default ScatterPlot;
