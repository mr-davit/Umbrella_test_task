import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import FeaturedImageGallery from "@/Components/Carousel.jsx";
import {useState} from "react";

export default function Index({auth, products, categories, queryParams = null, success}) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("product.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const [selectedItems, setSelectedItems] = useState([])


  function checkboxHandler(e) {
    let isSelected = e.target.checked;
    let value = parseInt(e.target.value);

    if (isSelected) {
      setSelectedItems([...selectedItems, value])
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((id) => {
          return id !== value
        })
      })
    }
    searchFieldChanged( 'category' , selectedItems)
  }


  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("product.index"), queryParams);
  };

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
      <Head title="products"/>

      <div className=" dark:bg-gray-800 overflow-x-auto bg-white dark:bg-neutral-700">

        <div className="grid grid-cols-5 grid-rows-5 gap-4">

          {categories.data.map((category) => (


            <div className="inline-flex  items-center">
              <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                <input type="checkbox"
                       checked={selectedItems.includes(category.id)} value={category.id}
                       onChange={checkboxHandler}

                className=" before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border
                border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block
                before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full
                before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900
                checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id={category.id}
                key={category.id}
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
              <label className="mt-px text-white font-light cursor-pointer select-none" htmlFor="check">
                {category.name}              </label>
            </div>
          ))}
        </div>


      </div>
      {success &&
      <div className='w-full py-4 flex justify-center items-center bg-green-500 text-white border border-b-white'>
        <h2>
          {success}
        </h2>
      </div>
      }


      <div className="flex justify-end">
        <TextInput
          className="w-2/4 mx-auto"
          defaultValue={queryParams.name}
          placeholder="product Name"

          onBlur={(e) =>
            searchFieldChanged("search", e.target.value)
          }
          onKeyPress={(e) => onKeyPress("name", e)}
        />

        <Link
          href={route("product.create")}
          className="bg-green-500 py-1 px-3 text-white  rounded shadow transition-all hover:bg-emerald-600"
        >
          Add new
        </Link>
      </div>



      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900 dark:text-gray-100">
          <div className="overflow-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
              <tr className="text-nowrap">

                <th className="px-3 py-3">Image</th>

                <TableHeading
                  name="name"
                  sort_field={queryParams.sort_field}
                  sort_direction={queryParams.sort_direction}
                  sortChanged={sortChanged}
                >
                  Name
                </TableHeading>

                <TableHeading
                  name="Description"
                >
                  Desc
                </TableHeading>

                <TableHeading
                  name="price"
                  sort_field={queryParams.sort_field}
                  sort_direction={queryParams.sort_direction}
                  sortChanged={sortChanged}
                >
                  Price
                </TableHeading>

                <TableHeading
                  name="category"
                >
                  Category
                </TableHeading>

                <TableHeading
                  name="created_at"
                  sort_field={queryParams.sort_field}
                  sort_direction={queryParams.sort_direction}
                  sortChanged={sortChanged}
                >
                  Create Date
                </TableHeading>


                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
              </thead>
              <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">

              </thead>
              <tbody>


              {products.data.map((product) => (

                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={product.id}
                >
                  <td className="px-3 py-2 w-2/4">
                    <div>
                      <FeaturedImageGallery
                        images={product.images}/>

                    </div>
                  </td>
                  <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                    <Link href={route("product.show", product.id)}>
                      {product.name}
                    </Link>
                  </th>

                  <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                    {product.desc.substr(0, 30) + '...'}
                  </th>

                  <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                    {product.price}
                  </th>

                  <th className="px-3 py-2 text-gray-100 text-wrap hover:underline">

                    {
                      product.categories.map((category) => (

                        <Link href={route("category.show", category.id)}>
                          {category.name} <br/>
                        </Link>
                      ))
                    }

                  </th>

                  <td className="px-3 py-2 text-nowrap">
                    {product.created_at}
                  </td>

                  <td className="px-3 py-2 text-nowrap">
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
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <Pagination links={products.meta.links}/>

        </div>
      </div>

    </AuthenticatedLayout>

  );
}

