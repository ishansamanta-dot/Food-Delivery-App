
import React, { useContext } from 'react'
import { StoreContex } from '../contex/StoreContex'
import FoodItems from './FoodItems'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContex)

  const filteredFood = food_list.filter(
    item => category === 'All' || category === item.category
  )

  return (
    <div id="food-display" className="mt-8 scroll-mt-24">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">
        {category === 'All' ? 'Top Dishes Near You' : `${category} Dishes`}
      </h2>

      {filteredFood.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFood.map(item => (
            <FoodItems
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-gray-400">
          No food items found in this category.
        </p>
      )}
    </div>
  )
}

export default FoodDisplay
