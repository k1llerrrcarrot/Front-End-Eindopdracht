import React from "react"
import { VictoryBar, VictoryGroup, VictoryChart, VictoryAxis, VictoryZoomContainer, VictoryLabel, VictoryPortal, VictoryTooltip } from 'victory';

const ChartDisplay = ({ data, showEnjoyment, showDifficulty }) => {
    return (
      <VictoryChart
        width={1400}
        style={{
          parent: {
            margin: "0 auto 17% auto",
            maxWidth: "1200px"
          }
        }}
        containerComponent=
        {<VictoryZoomContainer 
          allowZoom={false}
          zoomDomain={{x: [0, 18.5], y: [0, 5]}}
        />}
      >
        <VictoryAxis 
          tickValues={data.map((item) => item.assignment)}
          tickLabelComponent={
            <VictoryPortal>
              <VictoryLabel 
                angle={-60}
                textAnchor="end"
                y={255}
              />
            </VictoryPortal>
          }
          style={{ 
            tickLabels: { fontSize: 20, },
            ticks: {stroke: "black", size: 5}
          }}
        />
        <VictoryAxis 
          dependentAxis
          domain={{y: [0, 5]}}
          style={{ 
            grid: { stroke: "grey" },
            tickLabels: { fontSize: 20 },
            ticks: {stroke: "black", size: 5}
          }}
        />
        
        <VictoryGroup 
          offset={18}
        >
          {showDifficulty ?
            <VictoryBar 
              labelComponent={<VictoryTooltip/>}
              labels={data.map(item => item.difficultyRating)}
              barWidth={18}
              data={data} 
              x="assignment" 
              y="difficultyRating"
              style={{data: {fill: "#d48840"}}}
            /> : undefined
          }

          {showEnjoyment ?
            <VictoryBar 
              labelComponent={<VictoryTooltip/>}
              labels={data.map(item => item.enjoymentRating)}
              barWidth={18}
              data={data} 
              x="assignment" 
              y="enjoymentRating"
              style={{data: {fill: "#3c5b9c"}}}
            /> : undefined
          }
        </VictoryGroup>
      </VictoryChart>
    )
}

export default ChartDisplay