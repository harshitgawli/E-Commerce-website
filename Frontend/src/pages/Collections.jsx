import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';

const Collections = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilters = () => {
    let updatedProducts = products.slice();
    if (showSearch && search) {
      updatedProducts = updatedProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      updatedProducts = updatedProducts.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      updatedProducts = updatedProducts.filter(item => subCategory.includes(item.subCategory));
    }
    setFilteredProducts(updatedProducts);
  };

  const sortProducts = () => {
    let sortedProducts = filteredProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilteredProducts(sortedProducts.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilteredProducts(sortedProducts.sort((a, b) => b.price - a.price));
        break;
      default:
        break;
    }
  }

  useEffect(() => { applyFilters(); }, [category, subCategory, search, showSearch, products]);
  useEffect(() => { sortProducts(); }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t border-gray-200'>

      {/* ── Filter Sidebar ── */}
      <div className='min-w-60'>

        {/* Filter Toggle Button */}
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-sm font-semibold tracking-widest flex items-center cursor-pointer gap-2 text-gray-700 hover:text-black transition-colors'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div className={`mt-4 rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='px-4 py-3 text-[10px] font-semibold tracking-widest text-gray-400 border-b border-gray-100 bg-gray-50'>
            CATEGORIES
          </p>
          <div className='flex flex-col gap-1 px-4 py-3'>
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label
                key={cat}
                className='flex items-center gap-3 py-1.5 cursor-pointer group'
              >
                <input
                  className='w-3.5 h-3.5 accent-black cursor-pointer'
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                />
                <span className='text-sm text-gray-600 group-hover:text-black transition-colors'>
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sub-Category Filter */}
        <div className={`mt-4 rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='px-4 py-3 text-[10px] font-semibold tracking-widest text-gray-400 border-b border-gray-100 bg-gray-50'>
            TYPE
          </p>
          <div className='flex flex-col gap-1 px-4 py-3'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
              <label
                key={type}
                className='flex items-center gap-3 py-1.5 cursor-pointer group'
              >
                <input
                  className='w-3.5 h-3.5 accent-black cursor-pointer'
                  type="checkbox"
                  value={type}
                  onChange={toggleSubCategory}
                />
                <span className='text-sm text-gray-600 group-hover:text-black transition-colors'>
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Active Filters Count */}
        {(category.length > 0 || subCategory.length > 0) && (
          <p className='mt-3 text-[11px] text-gray-400 tracking-wide'>
            {category.length + subCategory.length} filter{category.length + subCategory.length > 1 ? 's' : ''} active
          </p>
        )}
      </div>

      {/* ── Right Side ── */}
      <div className='flex-1'>

        {/* Header Row */}
        <div className='flex justify-between items-center mb-6'>
          <div className='text-base sm:text-2xl'>
            <Title text1={'ALL '} text2={'PRODUCTS'} />
          </div>

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border border-gray-200 rounded-lg px-3 py-2 text-xs tracking-wide text-gray-600 bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:border-black transition-colors cursor-pointer'
          >
            <option value="relavent">Sort: Relevance</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Results Count */}
        <p className='text-xs text-gray-400 tracking-widest mb-4'>
          {filteredProducts.length} PRODUCTS FOUND
        </p>

        {/* Product Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {filteredProducts.map((item, index) => (
            <div
              key={index}
              className='rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-300 bg-white overflow-hidden'
            >
              <ProductItems
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className='flex flex-col items-center justify-center py-24 text-gray-300'>
            <p className='text-5xl mb-4'>🛍️</p>
            <p className='text-sm tracking-widest'>NO PRODUCTS FOUND</p>
            <p className='text-xs mt-1 text-gray-300'>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Collections