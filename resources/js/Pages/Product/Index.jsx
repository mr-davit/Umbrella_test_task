import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

export default function Index ({auth,products}) {
 return (
  <AuthenticatedLayout

   user={auth.user}
   header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
   >
   <Head title="Projects" />


   <div>
    <pre>{JSON.stringify(products,undefined,2)}</pre>
   </div>
  </AuthenticatedLayout>

  );
}

