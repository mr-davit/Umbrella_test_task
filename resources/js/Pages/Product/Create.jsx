import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    images: { },
    name: "",
    price: "",
    desc: "",
    category: [],

  });

  console.log(data)
  const onSubmit = (e) => {
    e.preventDefault();

    post(route("product.store"));
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
      <Head title="Projects" />

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
                  name="images"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("images", e.target.files)}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="product_name" value="Project Name" />

                <TextInput
                  id="product_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
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
                  className="mt-1 block w-full"
                  onChange={(e) => setData("desc", e.target.value)}
                />

                <InputError message={errors.desc} className="mt-2" />
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
                  className="mt-1 block w-full"
                  onChange={(e) => setData("price", e.target.value)}
                />


                <InputError message={errors.product_price} className="mt-2" />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("product.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
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
