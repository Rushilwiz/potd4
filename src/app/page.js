import VisitorForm from "@/components/VisitorForm";
import VisitorTable from "@/components/VisitorTable";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4">
        <h1 className="text-4xl font-bold">welcome to the visitor management system</h1>
      </div>
      <div className="flex flex-col gap-4 px-4">
        <VisitorForm />
        <VisitorTable />
      </div>
    </>
  );
}
