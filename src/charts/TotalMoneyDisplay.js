import React, { useState, useEffect } from 'react';
import orderData from '../data/order_data.json';
import pricingData from '../data/pricing_data.json'; 

const TotalMoneyDisplay = () => {
  const [totalMoney, setTotalMoney] = useState(null);

  useEffect(() => {
    const totalMoneyValue = calculateTotalMoney(orderData, pricingData);
    setTotalMoney(totalMoneyValue);
  }, []); 

  const calculateTotalMoney = (orders, pricing) => {
    const totalMoney = orders.reduce((acc, order) => {
      order.items.forEach((item) => {
        const pizzaType = item.type;
        const pizzaSize = item.size;
        const pizzaPrice = pricing[pizzaType]?.[pizzaSize];
        if (pizzaPrice) {
          acc += pizzaPrice;
        }
      });

      return acc;
    }, 0);

    return totalMoney.toFixed(2); 
  };

  return (
    <div>
      {totalMoney && <p>Total: ${totalMoney}</p>}
    </div>
  );
};

export default TotalMoneyDisplay;

