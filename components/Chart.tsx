import React,{useEffect,useState} from 'react'
import CanvasJSReact from '../utils/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface StateProps {
    state: string | undefined;
    stateData:any;
    name:string
  }


  interface BlackProps {
    black: any | undefined;
  
}
interface WhiteProps {
    white: any | undefined;
  
}
interface HispanicProps {
    hispanic: any | undefined;
  
}
interface AsianProps {
    asian: any | undefined;
  
}
interface UnknownProps {
    unknown: any | undefined;
  
}
interface OtherProps {
    other: any;
  
}
  interface FilteredDataProps {
    [x: string]: any;
    data: any;
   
  }


 const Chart:React.FC<StateProps> = ({state,stateData,name}) => {

    const [filteredData,setfilteredData] = useState<FilteredDataProps>({data:[]})
    const [black,setBlack] = useState<BlackProps>({black:[]})
    const [white,setWhite] = useState<WhiteProps>({white:[]})
    const [hispanic,setHispanic] = useState<HispanicProps>({hispanic:[]})
    const [asian,setAsian] =  useState<AsianProps>({asian:[]})
    const [other,setOther] = useState<OtherProps>({other:[]})
    const [unknown,setUnknown] = useState<UnknownProps>({unknown:''})
    useEffect(()=> {
       
        
        const filteredData = stateData.PoliceKillingsUS.filter((item: { state: string | undefined; }):any => item.state === state)
       // setData({state:filteredData})
        setfilteredData({data:filteredData})
        //console.log(state)
        //console.log(stateData.PoliceKillingsUS)
        console.log(filteredData)
        const black = filteredData.filter((a:any) => a.race === 'B')
        const white = filteredData.filter((a:any) => a.race === 'W')
        const asian = filteredData.filter((a:any) => a.race === 'A')
        const hispanic = filteredData.filter((a:any) => a.race === 'H' || a.race === 'N')
        const other = filteredData.filter((a:any) => a.race === 'O')
        const unknown = filteredData.filter((a:any) => a.race === '')
         
        setBlack({black:black})
        setWhite({white:white})
        setHispanic({hispanic:hispanic})
        setAsian({asian:asian})
        setOther({other:other})
        setUnknown({unknown:unknown})
        //console.log(hispanic)
        //console.log(white.length)

    },[])
    const options = {
        title: {
            text: `${name} - Total of ${filteredData.data.length}`
        },
        data: [
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [
                { label: `Black ${((black.black.length * 100)/filteredData.data.length).toFixed(1)}%`, y: black.black.length },
                { label: `White ${((white.white.length * 100)/filteredData.data.length).toFixed(1)}%`, y: white.white.length  },
                { label: `Asian ${((asian.asian.length * 100)/filteredData.data.length).toFixed(1)}%`, y: asian.asian.length  },
                { label: `Hispanic ${((hispanic.hispanic.length * 100)/filteredData.data.length).toFixed(1)} %`,  y: hispanic.hispanic.length },
                { label: `Other ${((other.other.length * 100)/filteredData.data.length).toFixed(1)}%`,  y: other.other.length },
                { label: `Unknown ${((unknown.unknown.length * 100)/filteredData.data.length).toFixed(1)}%`,  y: unknown.unknown.length }
            ]
        }
        ]
    }
    return (
    <div>
       {<CanvasJSChart options = {options}/>
            /* onRef={ref => this.chart = ref} */
        
    }
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
   {/*Array.from(filteredData.data).map((a:any)=> a.state)*/}
 
    </div>
    );
}

export default Chart


