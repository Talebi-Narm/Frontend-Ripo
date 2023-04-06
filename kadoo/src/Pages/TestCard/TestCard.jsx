import React from 'react';
import CustomCard  from '../../Components/CustomCard/ProductCard';

const TestCard = () => {
    const product = {
        image: 'https://bornakombucha.com/wp-content/uploads/2020/12/%D9%85%D8%B5%D8%B1%D9%81-%DA%AF%DB%8C%D8%A7%D9%87-%DA%AF%D8%B2%D9%86%D9%87.jpg',
        name: 'product',
        count: 2,
        water: 1,
        light: 1,
        price: 5,
        growthRate: 4,
    }
  return (
    <div>
      <CustomCard product = {product}/>
    </div>
  );
};

export default TestCard;