import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import ReviewsPieChart from './charts/ReviewsPieChart';
import OrdersBarChart from './charts/OrdersBarChart';
import TotalMoneyDisplay from './charts/TotalMoneyDisplay';
import MonthlyRevChart from './charts/MonthlyRevChart';
import './App.css';

const Home = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [setPizzaTypeFilter] = useState(null);
  const [setPizzaSizeFilter] = useState(null);

  const [applyFilter, setApplyFilter] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handlePizzaTypeChange = (type) => {
    setPizzaTypeFilter(type);
  };

  const handlePizzaSizeChange = (size) => {
    setPizzaSizeFilter(size);
  };

  const handleApplyFilter = () => {
    setApplyFilter(false);
    setTimeout(() => {
      setApplyFilter(true);
    });
  };

  const headerSpring = useSpring({
    from: { opacity: 0, marginTop: -50 },
    to: { opacity: 1, marginTop: 0 },
  });

  return (
    <animated.div className="home-container" style={headerSpring}>
      <header className="header">
        <h1>A Slice of Pi Pizza Shop</h1>
        <p>Your Pizza Sales Dashboard</p>
      </header>

      <div className="date-filters">
        <label>Start Date:</label>
        <input type="date" onChange={(e) => handleStartDateChange(e.target.value)} />
        <label>End Date:</label>
        <input type="date" onChange={(e) => handleEndDateChange(e.target.value)} />

        <button onClick={handleApplyFilter}>Apply Filter</button>
      </div>

      <div className="chart-container">
        <div className="chart">
          <h2>Customer Reviews</h2>
          <ReviewsPieChart applyFilter={applyFilter} startDate={startDate} endDate={endDate} />
        </div>

        <div className="chart">
          <h2>Orders by Location</h2>
          <OrdersBarChart
            onPizzaTypeChange={handlePizzaTypeChange}
            onPizzaSizeChange={handlePizzaSizeChange}
            applyFilter={applyFilter}
            startDate={startDate}
            endDate={endDate}
          />
        </div>

        <div className="chart">
          <h2>Total Money Made</h2>
          <TotalMoneyDisplay />
        </div>

        <div className="chart">
          <h2>Monthly Money Made</h2>
          <MonthlyRevChart applyFilter={applyFilter} startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </animated.div>
  );
};

export default Home;

