import React from "react";
import { makeStyles } from "@material-ui/core/styles";import
{
  ComposedChart,
  Line,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  title,
  Legend,
  ResponsiveContainer,
} from "recharts";

const noDataStyle = {
    textAlign: 'center',
    fontSize: 'x-large',
    position: 'relative',
    top: '39%',
    fontFamily: 'Segoe UI',
}

function ChartComponent(props) {
  const { data, type, color, dataKey, layout } = props;
  if (data.length < 1)
  {
    return (<div style={noDataStyle}>
      No Data Available
    </div> )
  }

  return (
    <ResponsiveContainer>
      {type === "bar" ? (
        <ComposedChart width={600} height={300} data={data}
                  margin={{ top: 0, right: 0, bottom: 0, left: 5 }} data={data} layout={layout}>
          <CartesianGrid stroke="#f5f5f5" />
                  <XAxis type="number" tick={{ fontSize: "11", angle: 0 }}/>
                  <YAxis type="category" dataKey={dataKey[0]} tick={{ fontSize: "11", angle:-45 }}/>
                  <Tooltip />
          <Legend />
          <Bar  barSize={30} dataKey={dataKey[1]} fill={color.primary} />
        </ComposedChart>
      ) : type === "stackedbar" ? (
        <ComposedChart data={data} layout={layout}>
          <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey={dataKey[0]} tick={{ fontSize: "11", angle: 0 }}/>
                      <YAxis tick={{ fontSize: "11", angle: -45  }}/>
          <Tooltip />
          <Legend />
          <Bar
            barSize={30}
            dataKey={dataKey[1]}
            stackId="a"
            fill={color.primary}
          />
          <Bar
            barSize={30}
            stackId="a"
            dataKey={dataKey[2]}
            fill={color.secondary}
          />
        </ComposedChart>
      ) : type === "linebar" ? (
        <ComposedChart data={data} layout={layout}>
          <CartesianGrid stroke="#f5f5f5" />
                          <XAxis dataKey={dataKey[0]} tick={{ fontSize: "11", angle: 0}}/>
                          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" tick={{ fontSize: "11", angle: -45 }}/>
                          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tick={{ fontSize: "11", angle: -45 }}/>
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            barSize={30}
            dataKey={dataKey[1]}
            fill={color.primary}
          />
          <Line yAxisId="right" dataKey={dataKey[2]} stroke={color.secondary} />
        </ComposedChart>
      ) : type === "GroupedBar" ? (
        <ComposedChart data={data} layout={layout}>
          <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey={dataKey[0]} tick={{ fontSize: "11", angle: 0 }}/>
                              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" tick={{ fontSize: "11", angle: -45 }}/>
                              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tick={{ fontSize: "11", angle: -45 }}/>
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey={dataKey[1]} fill="#8884d8" />
          <Bar yAxisId="right" dataKey={dataKey[2]} fill="#82ca9d" />
        </ComposedChart>
      ) : null}
    </ResponsiveContainer>
  );
}

export default ChartComponent;
