import React, { useEffect ,useContext ,useState} from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';


const Product = () => {

  const {productId} = useParams();
  const { products ,currency , addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        console.log(item);
        
        return null;
      }
    });
  };

  useEffect(() => { 
    fetchProductData();
  }, [productId , products]);
  
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-[18.7%] '>
            {
              productData.image.map((item, index) => (
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
            <div className='w-full sm:w-[80%] '>
              <img className='w-full h-auto' src={image} alt="" />
            </div>
        </div>

        {/* product details */}
        <div className='flex-1 '>
            <h2 className='font-medium text-2xl mt-2'>{productData.name}</h2>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-5" />
              <img src={assets.star_icon} alt="" className="w-5" />
              <img src={assets.star_icon} alt="" className="w-5" />
              <img src={assets.star_icon} alt="" className="w-5" />
              <img src={assets.star_dull_icon} alt="" className="w-5" />
              <p className='pl-3'>(156)</p>

            </div>
            <p className='text-3xl font-medium mt-5'> {currency}{productData.price.toFixed(2)}    </p>
            <p className='text-sm font-light mt-5 text-gray-600 md-4/5'>{productData.description}</p>

            <div className='flex flex-col gap-4 my-8'>
              <p>SELECT SIZE</p>
              <div className='flex gap-2'>
                  {
                    productData.sizes.map((item, index) => (
                      <button onClick={()=>setSize(item)} key={index} className={`border border-gray-500 px-4 py-2 rounded-full ${size === item ? 'bg-gray-500 text-white' : ''}`}    >
                        {item}
                      </button>
                    ))

                  }
              </div>
            </div>
            <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-500'>
              ADD TO CART
            </button>
            <hr className='mt-8 sm:w-4/5 text-gray-500'/>

            <div className='text-sm text-gray-500 flex flex-col gap-1 mt-5'>
                  <p>100% Original Product.</p>
                  <p>Delivered within 4 days.</p>
                  <p>Return within 7 days.</p>
            </div>
        </div>
      </div>
    </div>
  ) : <div className='opacity-0'>

  </div>
}

export default Product
