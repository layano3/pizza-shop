import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import orderData from '../data/order_data.json';
import pricingData from '../data/pricing_data.json'; 

const MonthlyRevChart = ({ applyFilter, startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (applyFilter) {
        let filteredData = orderData.filter((order) => {
          const orderDate = new Date(order.date);
          return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
        });
        const monthlyMoneyData = calculateMonthlyMoney(filteredData, pricingData);
        setChartData(monthlyMoneyData);
    }else{
        const monthlyMoneyData = calculateMonthlyMoney(orderData, pricingData);
        setChartData(monthlyMoneyData);
    }
  }, [applyFilter]); 

  const calculateMonthlyMoney = (orders, pricing) => {
    const monthlyRevenue = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.date);
      const monthYearKey = `${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;

      const orderTotal = order.items.reduce((total, item) => {
        const pizzaType = item.type;
        const pizzaSize = item.size;
        const pizzaPrice = pricing[pizzaType]?.[pizzaSize] || 0;

        return total + pizzaPrice;
      }, 0);

      if (!monthlyRevenue[monthYearKey]) {
        monthlyRevenue[monthYearKey] = 0;
      }

      monthlyRevenue[monthYearKey] += orderTotal;
    });

    const labels = Object.keys(monthlyRevenue);
    const data = Object.values(monthlyRevenue);

    return {
      labels,
      datasets: [
        {
          label: 'Monthly Revenue',
          data,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 0.7)',
          pointBackgroundColor: 'rgba(75, 192, 192, 1)', 
          backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        },
      ],
    };
    
  };

  return (
    <div>
      {chartData && <Line data={chartData} />}
    </div>
  );
};

export default MonthlyRevChart;
