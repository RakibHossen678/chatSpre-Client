import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import axios from "axios";

const Tags = () => {
  const axiosSecure = useAxiosPublic();
  const { data: Tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/categories");
      return data;
    },
  });
  return (
    <div className="my-20">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Explore Posts by Tags</h1>
      </div>
      <div className="grid grid-cols-5 gap-4 text-center my-10">
        {Tags.map((tag, idx) => (
          <div className="bg-green-50 py-6 hover:scale-110 hover:bg-green-200 rounded-md" key={idx}>
            <h1 className="text-xl font-bold ">{tag.category}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;