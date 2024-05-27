import React from "react";


export default function FeaturedImageGallery({images}) {
 const data = images.map(image => ({
  imagelink: image.path
 }));

 const [active, setActive] = React.useState(
data.imagelink
 );

 return (
  <div className="grid gap-2">
   <div>
    <img
     className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[280px]"
     src={active}
     alt=""
    />
   </div>
   <div className="grid grid-cols-4 gap-2">
    {data.map(({ imagelink }, index) => (
     <div key={index}>
      <img
       onClick={() => setActive(imagelink)}
       src={imagelink}
       className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
       alt="gallery-image"
      />
     </div>
    ))}
   </div>
  </div>
 );
}
