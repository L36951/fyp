import React, { useState, useEffect } from 'react';
import ChartJS from '../Chart';

import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import List from '../List';
import NotFound from './NotFound';

const SensorDetails = () => {
  const { search } = useLocation();
  const { periodid, sensortype } = queryString.parse(search);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [accessor, setAccessor] = useState(['sensortype.sensortype', 'value', 'updatedAt', 'record.record']);
  const [header, setHeader] = useState(['#', 'Sensor Type', 'Value', 'Updated Date', 'Record Type']);

  const [testingData, setTestingData] = useState([]);
  const [error,setError]  =useState(true);
  useEffect(() => {
    (async () => {
      let result;
      try {
        const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord/query?periodid=${periodid}&sensortype=${sensortype}`);
        result = await response.json();

        //let date = new Date(result[0].updatedAt);
        //console.log(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
      } catch (error) {
        console.log(error);
        result = [];
      }
      if (result.ok) {
        setData(result.data.map((d) => { return ({ ...d, 'updatedAt': d.updatedAt.split("T")[0] }) }));
        setAllData(result.data.map((d) => { return ({ ...d, 'updatedAt': d.updatedAt.split("T")[0] }) }));

        //result=result.data.map((d)=>{return ({...d,'updatedAt':d.updatedAt.split("T")[0]})});
        result = result.data.map((d) => { return ({ ...d, 'updatedAt': d.updatedAt.split("T")[0] }) });

        let date = result[0].updatedAt;
        let open = result[0].value;
        let close = result[0].value;
        let high = result[0].value;
        let low = result[0].value;
        let arr = [];

        result.map((d, i) => {
          if (i === result.length - 1) {

            high = d.value > high ? d.value : high;
            low = d.value < low ? d.value : low;
            open = d.value;
            arr.push({ "date": new Date(date), "open": open, "close": close, "high": high, "low": low });
          } else if (d.updatedAt != date) {

            arr.push({ "date": new Date(date), "open": open, "close": close, "high": high, "low": low });
            date = d.updatedAt;
            high = d.value;
            low = d.value;
            open = d.value;
            close = d.value;
          }
          else {
            open = d.value;
            high = d.value > high ? d.value : high;
            low = d.value < low ? d.value : low;
          }

        })

        setTestingData(arr.sort((a, b) => a.date > b.date ? 1 : -1));
        setError(false);
      }
    })();
  }, []);


  const filterData = event => {
    const value = event.target.value.toLowerCase();
    const filterData = allData.filter(
      d => (`${d.value} ${d.updatedAt} ${d.record.record}`
        .toLowerCase()
        .includes(value)

      )
    );
    setData(filterData);
  }
  if(!error){
  return (
    <>
      {testingData.length > 1 ? <ChartJS allData={testingData} /> : null}


      <input className='search-box' placeholder='Search...' onChange={filterData} />
      {<List
        data={data}
        header={header}
        accessor={accessor}
      />}
    </>

  );
}else{
  return (<NotFound/>)
}
}

export default SensorDetails;