import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay } from 'swiper/modules';
import './BannerCard.css';

// Import images using the correct relative path
import book1 from "../assets/books/book1.jpg";
import book2 from "../assets/books/book2.jpg";
import book3 from "../assets/books/book3.jpg";
import book4 from "../assets/books/book4.jpg";
import book5 from "../assets/books/book5.jpg";
import book6 from "../assets/books/book6.jpg";
import book7 from "../assets/books/book7.jpg";

const BannerCard = () => {
  return (
    <div className='banner'>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide style={{ backgroundImage: `url(${book1})` }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: `url(${book2})` }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: `url(${book3})` }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: `url(${book4})` }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: `url(${book5})` }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: `url(${book6})` }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: `url(${book7})` }}></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerCard;