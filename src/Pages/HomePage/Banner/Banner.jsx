import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className="relative">
      {/* Static Search Bar */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
        <h1 className="text-5xl font-semibold text-white mb-4">Welcome to HostelHub</h1>
        <p className="text-lg text-white mb-6">
          Your go-to platform for university hostel services.
        </p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for meals..."
            className="input input-bordered text-white w-80 p-4 rounded-l-md"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-r-md">
            Search
          </button>
        </div>
      </div>

      {/* Background Swiper */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="relative h-[500px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/518332246.jpg?k=852d9e83009ac082a7bb8366d5e27fb1f21801ea9cb6dde9c14e1aa99c49ea63&o=&hp=1')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-70"></div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="relative h-[500px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://thumbs.dreamstime.com/b/luxury-hotel-room-master-bedroom-creative-ai-design-background-instagram-facebook-wall-painting-photo-wallpaper-backgrounds-325040660.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-70"></div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="relative h-[500px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/620719916.webp?k=616cefe723433fd501f4fe89c7f415ce49822b10d769c7a725f8e35b39be66af&o=')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-70"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
