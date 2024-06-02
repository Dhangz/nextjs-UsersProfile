import { getAllUsers } from "./api";
import AddUser from "./components/AddUser"
import UserList from "./components/UserList"



async function Home() {

  const users = await getAllUsers();
  console.log(users);

  return (
    <div >
      <div className="text-center my-5 flex flex-col gap-4">
        <AddUser />
      </div>
      <UserList users={users} />
    
    </div>
  )
}

export default Home