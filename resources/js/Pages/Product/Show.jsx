import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, usePage} from "@inertiajs/react";
import FeaturedImageGallery from "@/Components/Carousel.jsx";

export default function Show({auth, product, success}) {
 const deleteProduct = (product) => {
  if (!window.confirm("Are you sure you want to delete the product?")) {
   return;
  }
  router.delete(route("product.destroy", product.id));
 };


 return (

  <AuthenticatedLayout

   user={auth.user}
   header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
  >

   <Head title={product.name}/>

   <div className="w-1/2 mx-auto bg-gray-500/75 h-full">
    <div>
     <FeaturedImageGallery
      images_url={product.images_url}/>
    </div>
    <p className="mt-2 text-gray-600 underline">Name</p>

    <div className="p-4 border-gray-500 bg-gray-600 rounded-md dark:text-gray-300 border-2 shadow-sm my-2">
     <h1>{product.name}</h1>
    </div>
    <p className="mt-2 text-gray-600 underline">Description</p>
    <div className="p-4 border-gray-500 bg-gray-600 rounded-md dark:text-gray-300 border-2 shadow-sm my-2">
     <p>{product.desc}</p>
    </div>
    <p className="mt-2 text-gray-600 underline">Price </p>
    <div className="p-4 border-gray-500 bg-gray-600 rounded-md dark:text-gray-300 border-2 shadow-sm my-2">
     <h1 className="text-red-600">{product.price}</h1>
    </div>
    <p className="mt-2 text-gray-600 underline">Categories </p>
    <div className="p-4 border-gray-500 bg-gray-600 rounded-md dark:text-gray-300 border-2 shadow-sm my-2">
     {product.categories.map((category) => (
      <Link href={route("category.show", category.id)}>
       <h1 className="underline pointer">{category.name}</h1>

      </Link>

     ))}
    </div>

    <Link
     href={route("product.edit", product.id)}
     className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
    >
     Edit
    </Link>
    <button
     onClick={(e) => deleteProduct(product)}
     className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
    >
     Delete
    </button>
   </div>


  </AuthenticatedLayout>
 )
};
