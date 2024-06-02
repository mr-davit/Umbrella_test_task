import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";

export default function Index({auth,  categories,  success}) {

console.log(success)

  const deleteCategory = (category) => {
    if (!window.confirm("Are you sure you want to delete the category?")) {
      return;
    }
    router.delete(route("category.destroy", category.id));
  };
  return (
    <AuthenticatedLayout

      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Categories"/>

      <div className=" dark:bg-gray-800 overflow-x-auto bg-white dark:bg-neutral-700">
      </div>
     {success &&
      <div className='w-full py-4 flex justify-center items-center bg-green-500 text-white border border-b-white'>
       <h2>
        {success}
       </h2>
      </div>
     }

<div className="w-1/2 mx-auto flex justify-center">

        <Link
          href={route("category.create")}
          className="bg-green-500 mx-auto my-5 py-1 px-3 text-white  rounded shadow transition-all hover:bg-emerald-600"
        >
          Add new
        </Link>
</div>



      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900 dark:text-gray-100">

          <div className="grid grid-cols-5 grid-rows-5 gap-4">

            {categories.data.map((category) => (
             <div>

              <Link
                href={route("category.edit", category.id)}
                className="bg-green-500 py-1 px-3 text-white  rounded shadow transition-all hover:bg-emerald-600"
              >
                {category.name}
              </Link>

              <button
               onClick={(e) => deleteCategory(category)}
               className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
              >
               Delete
              </button>

             </div>



            ))}

              </div>

        </div>
      </div>

    </AuthenticatedLayout>

  );
}

