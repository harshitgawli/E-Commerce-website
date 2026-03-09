import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';
const Collections = () => {

  const { products , search , showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item => item !== e.target.value));       
    }else{
      setCategory(prev=>[...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item => item !== e.target.value));       
    }else{
      setSubCategory(prev=>[...prev, e.target.value]);
    }
  }

  const applyFilters = () => {
    let updatedProducts = products.slice();

    if(showSearch && search){
      updatedProducts = updatedProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0){
      updatedProducts = updatedProducts.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      updatedProducts = updatedProducts.filter(item => subCategory.includes(item.subCategory));
    }

    setFilteredProducts(updatedProducts);
  };

  const sortProducts = () => {
      let sortedProducts = filteredProducts.slice();

      switch (sortType) {
        case "low-high":
          setFilteredProducts(sortedProducts.sort((a,b)=> a.price - b.price));
          break;
        case "high-low":
          setFilteredProducts(sortedProducts.sort((a,b)=> b.price - a.price));
          break;
        default:
          break;
      }
  }

  useEffect(() => {
    applyFilters();
  }, [category, subCategory , search , showSearch ,products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90': ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* catagory filter */}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>


         {/* Sub-catagory filter */}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>

    {/* Right side of collections page */}

    <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'ALL '} text2={'PRODUCTS'} />
        {/* Products sorting */}

        <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 px-2 text-sm'>
          <option value="relavent">Sort By: Relevence</option>
          <option value="low-high">Sort By: Price (Low to High)</option>
          <option value="high-low">Sort By: Price (High to Low)</option>
        </select>
      </div>

      {/* Map through the products and display them */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filteredProducts.map((items,index) =>(
            <ProductItems 
           key={index} 
           id={items._id}
           image={items.image} 
           name={items.name} 
           price={items.price}
           /> 
          ))
        }
      </div>
    </div>
    </div>
  )
}

export default Collections