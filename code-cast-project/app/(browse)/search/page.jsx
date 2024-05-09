import { redirect } from "next/navigation";
import { Results } from "./_components/results";


const SearchPage = ({ searchParams }) => {

    if (!searchParams.term) {
    redirect("/");
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto bg-gray-900">
      <Results term={searchParams.term}/>
    </div>
  );
};

export default SearchPage;
