import React, { useContext, useState, useEffect } from "react";
import PieChart, {
  Series,
  Label,
  Connector,
  Legend,
  Size,
  Export
} from "devextreme-react/pie-chart";
import { DetailsContext } from '../pages/Details/Details';

const Gasto = () => {

  const { details } = useContext(DetailsContext)

  const gastos = [];
  
  const result = details.reduce((acc, curr) => {
    if (!curr.price) return acc;
    if (acc[curr.category.name]) {
      acc[curr.category.name] += Number(curr.price);
    } else {
      acc[curr.category.name] = Number(curr.price);
    }
    return acc;
  }, {});
  const objectResult = Object.entries(result);

  for (let i = 0; i < objectResult.length; i++) {
    const newGrapExpense = {
      categoria: objectResult[i][0],
      gasto: objectResult[i][1].toFixed(2)
    }
    gastos.push(newGrapExpense)
  }
  
  const customizeLabel = (moneda) => {
    return `${moneda.argumentText}: ${moneda.valueText}€`;
  }
  const pointClickHandler = (e) => {
    toggleVisibility(e.target);
  }
  const legendClickHandler = (e) => {
    let arg = e.target;
    let item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
    toggleVisibility(item);
  }
  const toggleVisibility = (item) => {
    item.isVisible() ? item.hide() : item.show();
  }

  return (

    <PieChart
      id="pie"
      dataSource={gastos}
      palette="Ocean"
      onPointClick={pointClickHandler}
      onLegendClick={legendClickHandler}
    >
      <Series argumentField="categoria" valueField="gasto">
        <Label visible={true} customizeText={customizeLabel}>
          <Connector visible={true} width={1} />
        </Label>
      </Series>

      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="right"
        rowCount={2}
      />

      <Size width={500} />
      <Export enabled={true} />
    </PieChart>
  );
}

export default Gasto;
