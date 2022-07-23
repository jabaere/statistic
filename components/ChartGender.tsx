import React, { useEffect, useState } from "react";
import CanvasJSReact from "../utils/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface StateProps {
  state: string | undefined;
  stateData: any;
  name: string;
}

interface Gender {
  men: any;
  women: any;
}

interface FilteredDataProps {
  [x: string]: any;
  data: any;
}

const ChartGender: React.FC<StateProps> = ({ state, stateData, name }) => {
  const [filteredData, setfilteredData] = useState<FilteredDataProps>({
    data: [],
  });
  const [gender, setGender] = useState<Gender>({ men: 0, women: 0 });
  useEffect(() => {
    const filteredData = stateData.PoliceKillingsUS.filter(
      (item: { state: string | undefined }): any => item.state === state
    );
    // setData({state:filteredData})
    setfilteredData({ data: filteredData });
    //console.log(state)
    //console.log(stateData.PoliceKillingsUS)
    //console.log(filteredData)
    const men = filteredData.filter((a: any) => a.gender === "M");
    const women = filteredData.filter((a: any) => a.gender === "F");
    //console.log(men)
    //console.log(women)

    setGender({
      men,
      women,
    });

    //console.log(hispanic)
    //console.log(white.length)
  }, []);
  const options = {
    title: {
      text: `${name} - Total of ${filteredData.data.length}`,
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: [
          {
            label: `Men ${(
              (gender.men.length * 100) /
              filteredData.data.length
            ).toFixed(1)}%`,
            y: gender.men.length,
          },
          {
            label: `Women ${(
              (gender.women.length * 100) /
              filteredData.data.length
            ).toFixed(1)}%`,
            y: gender.women.length,
          },
        ],
      },
    ],
  };
  return (
    <div>
      {
        <CanvasJSChart options={options} />
        /* onRef={ref => this.chart = ref} */
      }
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      {/*Array.from(filteredData.data).map((a:any)=> a.state)*/}
    </div>
  );
};

export default ChartGender;
