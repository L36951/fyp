import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import { scaleTime } from "d3-scale";
import MadeData from "./Data";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { utcDay } from "d3-time";
import { fitWidth } from "react-stockcharts/lib/helper";
import { timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

var ChartJS = (props) => {
    const { type, width, ratio,allData } = props;
 
    const { search } = useLocation();
    const { periodid, sensortype } = queryString.parse(search);
    const [testing,setTesting] =useState(null);
 //   const testingData = ConvertData(allData);

   useEffect(()=>{
       console.log(type);
       console.log(width);
       console.log(ratio);
       console.log(allData);
        
    
   })
   

   
    const xAccessor = (d) => {
        return d.date;
    };

    return (
        
        <div className="ChartJS">
            {allData!=null? <ChartCanvas
                height={400}
                ratio={ratio}
                width={width}
                margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                type={type}
                data={allData}
                seriesName="MSFT"
                xAccessor={xAccessor}
                xScale={scaleTime()}
                xExtents={[new Date(),  new Date(2021,1,15)]}
            >
                <Chart id={1} yExtents={(d) => [d.high, d.low]}>
                    <XAxis axisAt="bottom" orient="bottom" ticks={10} />
                    <YAxis axisAt="left" orient="left" ticks={5} />
                    <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
                </Chart>
            </ChartCanvas>:null}
          
            
        </div>
    );
};

ChartJS.prototype = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

ChartJS.defaultProps = {
    type: "svg",
};

ChartJS = fitWidth(ChartJS);

export default ChartJS;