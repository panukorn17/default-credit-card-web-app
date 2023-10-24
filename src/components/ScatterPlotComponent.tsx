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
    xlabel?: string;
    ylabel?: string;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ 
    predictions, 
    hasFetchedPredictions, 
    width, 
    height, 
    data, 
    xAccessor, 
    yAccessor, 
    title,
    xlabel = '', 
    ylabel = '' }) => {
    // Guard against null or undefined data
    if (!data) {
        return null; // or some fallback UI
    }
    // Define Margins
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Define scales
    const xScale = scaleLinear({
        domain: [
            0, 
            800_000
        ],
        range: [0, innerWidth],
    });

    const yScale = scaleLinear({
        domain: [
            0, 
            200_000
        ],
        range: [innerHeight, 0], 
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
                <Group left={margin.left} top={margin.top}>
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
                    <AxisBottom top={innerHeight} scale={xScale} />
                    <AxisLeft scale={yScale} />

                    {/* X Axis Title */}
                    <text
                        className="axis-title"
                        textAnchor="middle"
                        transform={`translate(${-margin.left},${innerHeight / 2}) rotate(-90)`}
                        dy=".71em"
                    >
                        {xlabel}
                    </text>

                    {/* Y Axis Title */}
                    <text
                        className="axis-title"
                        textAnchor="middle"
                        transform={`translate(${innerWidth / 2},${innerHeight + margin.bottom*0.9})`}
                    >
                        {ylabel}
                    </text>
                </Group>
            </svg>
        </div>
    );
};

ScatterPlot.defaultProps = {
    data: [],
    predictions: [],
    hasFetchedPredictions: false,
    xlabel: '',
    ylabel: '',
};

export default ScatterPlot;
