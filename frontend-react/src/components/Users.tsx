import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { CanceledError } from "../services/api-client";
import UserService, { User, initUser } from "../services/user-service";

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<User>(initUser);
  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = UserService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrors((err as AxiosError).message);
      });
    return () => cancel();
  }, []);

  function deleteUser(user: User) {
    const originialUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    UserService.delete(user.id).catch((err) => {
      setErrors(err.message);
      setUsers(originialUsers);
    });
  }
  function handleFormSubmit() {
    user.id == 0 ? addUser() : updateUser();
  }
  function updateUser() {
    const originialUsers = [...users];
    const updatedUser = { ...user };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    UserService.update(updatedUser)
      .catch((err) => {
        setErrors(err.message);
        setUsers(originialUsers);
      })
      .finally(() => {
        resetUserModalInput();
        closeUserModal();
      });
  }
  function addUser() {
    const originialUsers = [...users];
    const newUser = { ...user };
    setUsers([newUser, ...users]);

    UserService.add(newUser)
      .then((res) => setUsers([res.data, ...users]))
      .catch((err) => {
        setErrors(err.message);
        setUsers(originialUsers);
      })
      .finally(() => {
        resetUserModalInput();
        closeUserModal();
      });
  }
  function resetUserModalInput() {
    setUser(initUser);
  }

  function editUser(user: User) {
    const editingUser = { ...user };
    setUser(editingUser);
  }
  function closeUserModal() {}
  return (
    <>
      <div className="container">
        {errors && <p>{errors}</p>}
        {isLoading ? (
          <div className="spinner-border"></div>
        ) : (
          <>
            <button
              className="btn btn-primary my-3"
              data-bs-toggle="modal"
              data-bs-target="#userModal"
              onClick={resetUserModalInput}
            >
              Add
            </button>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn-outline-secondary btn"
                          data-bs-toggle="modal"
                          data-bs-target="#userModal"
                          onClick={() => editUser(user)}
                        >
                          Update
                        </button>
                        <button
                          className="btn-outline-danger btn"
                          onClick={() => deleteUser(user)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="userModal"
        aria-labelledby="userModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userModalLabel">
                {user.id == 0
                  ? "Add User"
                  : `Update User ${user.name}#${user.id}`}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input type="hidden" name="id" id="id" value={user.id} />
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                    className="form-control"
                    id="phone"
                    value={user.phone}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
                    className="form-control"
                    id="address"
                    value={user.address}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFormSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
    </>
  );
}
export default Users;
