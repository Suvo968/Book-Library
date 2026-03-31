import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Import autoplay styles
import { Pagination, Autoplay } from 'swiper/modules'; // Import Autoplay module
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';

const BookCards = ({ books, headline }) => {
  return (
    <div className="my-16 px-4 lg:px-24">
      <h2 className="text-5xl text-center font-bold text-black my-5">
        {headline}
      </h2>

      <div className="mt-12">
        <style>
          {`
            .swiper-pagination {
              position: relative;
              bottom: -20px;
            }

            .card-content {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 380px; /* Fixed height for consistent card size */
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              overflow: hidden;
              background-color: white;
            }

            .card-image {
              width: 100%;
              height: 200px; /* Fixed height for images */
              object-fit: cover;
            }

            .card-info {
              flex-grow: 1;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
            }

            .card-footer {
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: rgb(2 132 199);
              color: white;
              padding: 10px;
              font-size: 0.9rem; /* Slightly smaller text for footer */
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
            }

            .cart-icon {
              background-color: blue;
              padding: 4px;
              border-radius: 50%;
            }

            .price-tag {
              font-size: 1rem;
              font-weight: bold;
              color: white;
            }
          `}
        </style>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000, // Auto-slide every 2 seconds
            disableOnInteraction: false, // Continue autoplay even after user interaction
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Autoplay]} // Include Autoplay module
          className="mySwiper w-full h-full"
          style={{ paddingBottom: '40px' }}
        >
          {books.slice(0, 10).map((book) => (
            <SwiperSlide key={book._id}>
              <Link to={`/book/${book._id}`}>
                <div className="relative card-content">
                  <img
                    src={book.imageURL || 'default-image-url.jpg'} // Fallback for missing images
                    alt={`Cover image of ${book.title}`}
                    className="card-image"
                  />
                  <div className="card-info">
                    <h4 className="font-semibold text-lg">
                      {book.title || 'Untitled Book'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {book.author || 'Unknown Author'}
                    </p>
                  </div>
                  <div className="card-footer">
                    <span className="price-tag">
                      ₹{book.rentalPrice ? book.rentalPrice.toFixed(2) : 'N/A'}
                    </span>
                    <span className="cart-icon bg-blue-600 hover:bg-black p-2 rounded-full">
                      <FaCartShopping className="w-4 h-4 text-white" />
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookCards;
