import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const userName = useSelector((store) => store.user.username);
  return (
    <div className="my-10 text-center">
      <h1 className="mb-4 px-4 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {userName === "" ? (
        <CreateUser />
      ) : (
        <Button to={"/menu"} type={"primary"}>
          Continue {userName}
        </Button>
      )}
    </div>
  );
}

export default Home;
