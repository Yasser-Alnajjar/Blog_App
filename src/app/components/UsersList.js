import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../../redux/slices/users/usersSlice";
const UsersList = () => {
  const users = useSelector((state) => selectAllUsers(state));
  console.log(users);
  const renderUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));
  return (
    <section>
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>Users</h2>
      <ul className="userList">{renderUsers}</ul>
    </section>
  );
};

export default UsersList;
