import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import reviewData from '../data/review_data.json';
import 'chart.js/auto';

const ReviewsPieChart = ({ applyFilter, startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (applyFilter) {
      let filteredData = reviewData.filter((review) => {
        const reviewDate = new Date(review.date);
        return reviewDate >= new Date(startDate) && reviewDate <= new Date(endDate);
      });
  
      const sentimentCounts = filteredData.reduce((acc, review) => {
        const sentiment = review.sentiment;
        acc[sentiment] = (acc[sentiment] || 0) + 1;
        return acc;
      }, {});
  
      const data = {
        labels: Object.keys(sentimentCounts),
        datasets: [
          {
            data: Object.values(sentimentCounts),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
          },
        ],
      };
  
      setChartData(data);
    } else {
      const sentimentCounts = reviewData.reduce((acc, review) => {
        const sentiment = review.sentiment;
        acc[sentiment] = (acc[sentiment] || 0) + 1;
        return acc;
      }, {});
  
      const data = {
        labels: Object.keys(sentimentCounts),
        datasets: [
          {
            data: Object.values(sentimentCounts),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)', 
              'rgba(54, 162, 235, 0.7)', 
              'rgba(255, 206, 86, 0.7)', 
              'rgba(75, 192, 192, 0.7)', 
              'rgba(153, 102, 255, 0.7)', 
            ],
          },
        ],
      };
  
      setChartData(data);
    }
  }, [applyFilter, key]);
  

  const options = {
    width: 50,
    height: 50,
  };

  return (
    <div>
      {chartData && <Pie key={key} data={chartData} options={options} />}
    </div>
  );
};

export default ReviewsPieChart;

