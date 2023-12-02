import { useEffect, useState } from "react"
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from "swiper";
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useParams } from "react-router-dom"



function Listing() {
    SwiperCore.use([Navigation])
    const params = useParams()
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    
    useEffect(()=>{
        const fetchListing = async () =>{
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                console.log('this is res url', res)
                const data = await res.json();
                // if(data.success === false){
                //     setError(true);
                //     setLoading(false);
                //     return;
                // }
                // setListing(data)
                // setLoading(false)
                // setError(false)
                if (res.ok) {
                    setListing(data);
                    setError(false);
                  } else {
                    setError(true);
                    console.error(`Error fetching listing: ${res.status} - ${data.message}`);
                  }
                
            } catch (error) {
                setError(true);
                console.error("Error fetching listing:", error);
                // setLoading(false);
            } finally {
                setLoading(false);
              }
        };


        fetchListing();
    },[params.listingId]);
    console.log(loading)
  return (
    <main>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && <p className="text-center my-7 text-2xl">Something went wrong</p>}
        {listing && !loading && !error && listing.imgUrls && <img src={listing.imgUrls} alt="listing"/>}
        {/* 
        (
            <div>
        <Swiper navigation>
            {listing.imgUrls.map((url)=>(
               <SwiperSlide key={url}>
                <div className="h-[500px]" style={{background: `url(${url}) center no-repeat`}}></div>
               </SwiperSlide>
            ))}
        </Swiper>
        </div>
        
        ) } */}
        </main>
  )
}

export default Listing