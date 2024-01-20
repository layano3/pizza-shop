import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import orderData from '../data/order_data.json';

const OrdersBarChart = ({ applyFilter, startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);
  const [pizzaTypeFilter, setPizzaTypeFilter] = useState('');
  const [pizzaSizeFilter, setPizzaSizeFilter] = useState('');

  const pizzaTypes = [...new Set(orderData.flatMap((order) => order.items.map((item) => item.type)))];
  const pizzaSizes = [...new Set(orderData.flatMap((order) => order.items.map((item) => item.size)))];

  useEffect(() => {
    if (applyFilter) {
      let filteredData = orderData.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
      });
  
      const ordersByStore = filteredData.reduce((acc, order) => {
        const store = order.store;
        acc[store] = (acc[store] || 0) + 1;
        return acc;
      }, {});
  
      const orderChartLabels = Object.keys(ordersByStore);
      const orderChartValues = Object.values(ordersByStore);
  
      const data = {
        labels: orderChartLabels,
        datasets: [
          {
            label: 'Number of Orders',
            data: orderChartValues,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
        ],
      };
  
      if (pizzaTypeFilter || pizzaSizeFilter) {
        const filteredOrderData = orderData.filter(order =>
          (!pizzaTypeFilter || order.items.some(item => item.type === pizzaTypeFilter)) &&
          (!pizzaSizeFilter || order.items.some(item => item.size === pizzaSizeFilter))
        );
  
        const filteredOrdersByStore = filteredOrderData.reduce((acc, order) => {
          const store = order.store;
          acc[store] = (acc[store] || 0) + 1;
          return acc;
        }, {});
  
        const filteredOrderChartLabels = Object.keys(filteredOrdersByStore);
        const filteredOrderChartValues = Object.values(filteredOrdersByStore);
  
        data.labels = filteredOrderChartLabels;
        data.datasets[0].data = filteredOrderChartValues;
      }
  
      setChartData(data);
    } else {
      const ordersByStore = orderData.reduce((acc, order) => {
        const store = order.store;
        acc[store] = (acc[store] || 0) + 1;
        return acc;
      }, {});
  
      const orderChartLabels = Object.keys(ordersByStore);
      const orderChartValues = Object.values(ordersByStore);
  
      const data = {
        labels: orderChartLabels,
        datasets: [
          {
            label: 'Number of Orders',
            data: orderChartValues,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
          },
        ],
      };
  
      if (pizzaTypeFilter || pizzaSizeFilter) {
        const filteredOrderData = orderData.filter(order =>
          (!pizzaTypeFilter || order.items.some(item => item.type === pizzaTypeFilter)) &&
          (!pizzaSizeFilter || order.items.some(item => item.size === pizzaSizeFilter))
        );
  
        const filteredOrdersByStore = filteredOrderData.reduce((acc, order) => {
          const store = order.store;
          acc[store] = (acc[store] || 0) + 1;
          return acc;
        }, {});
  
        const filteredOrderChartLabels = Object.keys(filteredOrdersByStore);
        const filteredOrderChartValues = Object.values(filteredOrdersByStore);
  
        data.labels = filteredOrderChartLabels;
        data.datasets[0].data = filteredOrderChartValues;
      }
  
      setChartData(data);
    }
  }, [applyFilter, pizzaTypeFilter, pizzaSizeFilter]);
  

  return (
    <div>
      <div className='filters'>
        <label>Pizza Type: </label>
        <select onChange={(e) => setPizzaTypeFilter(e.target.value)}>
          <option value="">All</option>
          {pizzaTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label>Pizza Size: </label>
        <select onChange={(e) => setPizzaSizeFilter(e.target.value)}>
          <option value="">All</option>
          {pizzaSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div>
        {chartData && <Bar data={chartData} />}
      </div>
    </div>
  );
};

export default OrdersBarChart;