import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, useForm} from "@inertiajs/react";
import {useRef, useState} from "react";
import FeaturedImageGallery from "@/Components/Carousel.jsx";

export default function Edit({auth, categories, product}) {



  const handleCheckboxChange = (e) => {
    const value = parseInt(e.target.value); // Convert value to number to match category IDs
    if (e.target.checked) {
      setData(prevState => {
        const newCategories = [...prevState.categories, value];
        return { ...prevState, categories: newCategories };
      });
    } else {
      setData(prevState => {
        const newCategories = prevState.categories.filter(category => category !== value);
        return { ...prevState, categories: newCategories };
      });
    }
  };
  const handleCheckboxChangeImage = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setData(prevState => {
        const newImages = [...prevState.images, value];
        return { ...prevState, images: newImages };
      });
    } else {
      setData(prevState => {
        const newImages = prevState.images.filter(image => image !== value);
        return { ...prevState, images: newImages };
      });
    }
  };



  const {data, setData, post, errors, reset} = useForm({
    images: [],
    image_files: [],
    name: product.name ||  "",
    price: product.price ||  "",
    desc: product.desc ||  "",
    categories: product.categories.map(category => category.id),
   _method: "PUT",

  });

  const fileInputRef = useRef(null);


  // console.log(data.image_files)
  console.log(data.images)
  console.log(data.image_files)

  // console.log(product.images)
  const onSubmit = (e) => {
    e.preventDefault();
    setData("image_files", null );
    setData("images", [] );
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    post(route("product.update", product.id))  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit {product.name}
          </h2>
        </div>
      }
    >
      <Head title="Projects"/>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div>
                <InputLabel
                  htmlFor="product_image_path"
                  value="Project Image"
                />
                <TextInput
                  id="product_image_path"
                  type="file"
                  multiple
                  ref={fileInputRef}
                  name="image_files"
                  className="mt-1 block w-full"
                  onChange={(e) =>  setData("image_files", e.target.files)}
                />
                <InputError message={errors.image} className="mt-2"/>
              </div>

              {/*<FeaturedImageGallery*/}
              {/*  images_url={product.images_url}/>*/}

              <h1 className="text-xl text-white">Select Image To Delete</h1>
              {product.images.map((image) => (


                <div className="inline-flex items-center">
                  <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                    <input type="checkbox"

                           onChange={handleCheckboxChangeImage}
                           name="image"
                           className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border
                border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block
                before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full
                before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900
                checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                           key={image.path}
                           value={image.id}
                           // checked={data.categories.includes(category.id)}
                      />
                    <span
                      className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                   stroke="currentColor" stroke-width="1">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
              </svg>
              </span>
                  </label>
                  <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="check">
                    <img className="w-20 h-20" src={image.path} alt=""/>
                  </label>

                </div>

              ))}
              <div className="mt-4">
                <InputLabel htmlFor="product_name" value="Project Name"/>

                <TextInput
                  id="product_name"
                  type="text"
                  name="name"
                  value={data.name}
                  required
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2"/>
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="product_description"
                  value="Project Description"
                />

                <TextAreaInput
                  id="product_description"
                  name="description"
                  value={data.desc}
                  required
                  className="mt-1 block w-full"
                  onChange={(e) => setData("desc", e.target.value)}
                />

                <InputError message={errors.desc} className="mt-2"/>
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="product_price"
                  value="Product Price"
                />

                <input type="number"
                       placeholder="enter price"
                       id="product_price"
                       name="product_price"
                       value={data.price}
                       required
                       className="mt-1 block w-full"
                       onChange={(e) => setData("price", e.target.value)}
                />


                <InputError message={errors.price} className="mt-2"/>
              </div>

              <div className="mt-4 text-right">


                <div className=" overflow-x-auto bg-white dark:bg-neutral-700">

                  <div className="grid grid-cols-5 grid-rows-5 gap-4">

                    {categories.data.map((category) => (


                      <div className="inline-flex items-center">
                        <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                          <input type="checkbox"

                                 onChange={handleCheckboxChange}
                                 name="categories"
                                 className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border
                border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block
                before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full
                before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900
                checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                 key={category.id}
                                 value={category.id}
                                 checked={data.categories.includes(category.id)}                          />
                          <span
                            className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                   stroke="currentColor" stroke-width="1">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
              </svg>
              </span>
                        </label>

                        <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="check">
                          {category.name}              </label>

                      </div>

                    ))}
                    <InputError message={errors.categories} className="mt-2"/>

                  </div>


                </div>
                <Link
                  href={route("product.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button
                  className="bg-green-500 border py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
