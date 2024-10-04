import { Link, Outlet } from "react-router-dom";

const UserListPage = () => {
  const users = [
    { id: 1, name: "Mosh" },
    { id: 2, name: "John" },
    { id: 3, name: "Alice" },
  ];
  return (
    <div className="container m-0 p-0 d-flex flex-row gap-2">
      <ul className="list-group w-50">
        {users.map((user) => (
          <li className="list-group-item" key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>

      <Outlet />
    </div>
  );
};

export default UserListPage;
