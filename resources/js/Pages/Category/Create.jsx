import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, useForm} from "@inertiajs/react";
import {useState} from "react";

export default function Create({auth, categories}) {



  const {data, setData, post, errors, reset} = useForm({
    name: "",
  });


  console.log(data)
  const onSubmit = (e) => {
    e.preventDefault();

    post(route("category.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Project
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




         <div className="mt-4">
          <InputLabel htmlFor="category" value="Category name"/>

          <TextInput
           id="category_name"
           type="text"
           name="name"
           value={data.name}
           required
           className="mt-1 block w-full"
           isFocused={true}
           onChange={(e) => setData("name", e.target.value)}
          />
          <InputError message={errors.name} className="mt-2"/>

          <Link
           href={route("category.index")}
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
