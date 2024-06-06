import Banner from "../../Components/Banner";
import LatesPosts from "../../Components/LatesPosts";
import Tags from "../../Components/Tags";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="w-9/12 mx-auto my-20">
        <Tags></Tags>
        <LatesPosts></LatesPosts>
      </div>
    </div>
  );
};

export default Home;
