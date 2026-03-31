import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// React icons
import { FaStar } from 'react-icons/fa6';
import { Avatar } from "flowbite-react";
import proPic from "../assets/profile.jpg";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const reviews = [
  {
    rating: 5,
    text: "A beautifully crafted story that keeps you hooked from start to finish. The character development is fantastic, and the plot twists are completely unexpected. This book will make you think long after you've turned the last page. Highly recommend it to anyone who loves emotional depth and strong narratives.",
    name: "Emma Roberts",
    position: "Writer & Book Enthusiast",
    image: proPic,
  },
  {
    rating: 4,
    text: "An engaging adventure that takes you to places you could never have imagined. The world-building is exceptional, and the characters are well-developed. The only downside was the pacing in the middle of the book, but it picks up again towards the end. Still, an enjoyable read that I would recommend to fans of fantasy.",
    name: "Tom Harris",
    position: "Fiction Lover & Blogger",
    image: proPic,
  },
  {
    rating: 5,
    text: "A perfect blend of mystery and romance! This book had me on the edge of my seat with its unexpected twists. The chemistry between the leads is palpable, and the suspense builds up beautifully. It’s one of those books you can’t put down. Definitely going to read more from this author!",
    name: "Sarah Clark",
    position: "Romance Novels Reviewer",
    image: proPic,
  },
  {
    rating: 4,
    text: "An insightful exploration of human nature. The author’s writing style is poignant, and the themes explored in this book are thought-provoking. It may not be for everyone due to its introspective nature, but if you enjoy philosophical reads, this one is definitely worth your time.",
    name: "Michael Turner",
    position: "Book Club Leader",
    image: proPic,
  },
  {
    rating: 5,
    text: "An absolute masterpiece! From the opening lines, I was hooked. The plot is complex yet easy to follow, and the characters feel incredibly real. This book explores themes of loss, hope, and resilience, and I found myself emotionally invested from start to finish. A must-read!",
    name: "Olivia Miller",
    position: "Literary Critic & Author",
    image: proPic,
  },
  {
    rating: 3,
    text: "While the book has a great premise, I found the pacing to be a bit slow in parts. The characters are interesting, but some of their decisions didn’t always make sense to me. It's a decent read, but it didn't quite live up to my expectations.",
    name: "David Scott",
    position: "Casual Reader",
    image: proPic,
  },
  {
    rating: 5,
    text: "A gripping psychological thriller that keeps you guessing until the very end. The author has a knack for creating suspense and building tension in every chapter. The twist in the final act left me breathless. If you love thrillers that make you think and feel, this book is a must-read!",
    name: "Lucas Reed",
    position: "Crime Fiction Enthusiast",
    image: proPic,
  },
  {
    rating: 4,
    text: "This historical fiction novel transports you to another time and place, blending rich details with compelling characters. While the pacing can be slow at times, the historical accuracy and depth of the story make it an enriching experience. A solid read for history buffs!",
    name: "Rachel Adams",
    position: "History Lover & Blogger",
    image: proPic,
  },
  {
    rating: 5,
    text: "A heartwarming and inspiring story about overcoming adversity. The characters are wonderfully relatable, and the narrative is both touching and uplifting. I laughed, I cried, and I felt deeply connected to the journey of the protagonist. A feel-good read that will stay with you long after you’ve finished.",
    name: "Anna Lewis",
    position: "Fiction Reviewer & Motivational Speaker",
    image: proPic,
  },
  {
    rating: 4,
    text: "An enchanting fantasy novel with a rich world full of magic, mystery, and danger. The plot is intriguing, though at times a little predictable, but the world-building more than makes up for it. Perfect for fans of epic fantasy who love immersive, magical worlds.",
    name: "Chris Hunter",
    position: "Fantasy Aficionado & Reviewer",
    image: proPic,
  },
  {
    rating: 5,
    text: "An exceptional memoir that takes you deep into the author's life experiences. It’s both heartbreaking and inspiring, showing the resilience of the human spirit. The writing is raw and honest, making it easy to connect with the author’s journey. Highly recommend this to anyone looking for an emotionally charged and empowering read.",
    name: "Lisa Williams",
    position: "Memoir Enthusiast & Social Advocate",
    image: proPic,
  },
];

const Review = () => {
  return (
    <div className="my-12 px-4 lg:px-24">
      <h2 className="text-5xl font-bold text-center mb-10 leading-snug">Our Customers</h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{
            delay: 1000, // Time in milliseconds between automatic slides
            disableOnInteraction: false, // Continue autoplay after user interaction
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border">
              <div className="space-y-6">
                {/* Rating */}
                <div className="text-amber-500 flex gap-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Review Text */}
                <div className="mt-7">
                  <p className="mb-5">{review.text}</p>
                  <Avatar
                    alt={`avatar of ${review.name}`}
                    img={review.image}
                    rounded
                    className="w-10 mb-4"
                  />
                  <h5 className="text-lg font-medium">{review.name}</h5>
                  <p className="text-base">{review.position}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
