import Banner from '../components/Banner';
import BestSellerBook from './BestSellerBook';
import FavBook from './FavBook';
import PromoBanner from './PromoBanner';
import OtherBooks from './OtherBooks';
import Review from './Review';


const Home=() => {
    
   
  return (
    <div className=''>
        
        <Banner/>
        <BestSellerBook/>
        <FavBook/>
        <PromoBanner/>
        <OtherBooks/>
        <Review/>
        
    </div>

  );
}

export default Home;