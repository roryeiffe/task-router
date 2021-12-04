import { useSelector } from "react-redux";
import { useState } from "react";
import {useDispatch} from "react-redux";

const ProfileView = () => {
  // get user from redux store and set it to state;
  const temp = useSelector((state: any) => state.user);
  const [user, setUser] = useState(temp);
  // whether we want to edit the info:
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  // update the state when input changes
  function onChangeHandler(event: any) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  // submit the form:
  function onSubmitHandler(event: any) {
    // update the redux store:
    dispatch({type: 'UPDATE_USER', payload: user});
    event.preventDefault();
    setEditMode(false);
    // TODO: update the user in the database
  }
  
  // conditionally render the data or the form to edit the data:
  if (!editMode)
    return (
      <div>
        <h1>Profile</h1>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.mobile}</p>
        <p>Total: Points: {user.points} </p>
        <button onClick={() => setEditMode(true)} className="btn btn-primary">
          Edit Profile
        </button>
      </div>
    );
  else
    return (
      <div>
        <h1>Edit Profile</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="">Full Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={user.name}
              onChange={onChangeHandler}
              required
            />
          </div>
            <p>{user.email}</p>
          <div className="form-group">
            <label htmlFor="">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={user.password}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Mobile</label>
            <input
              className="form-control"
              type="phone"
              name="mobile"
              value={user.mobile}
              onChange={onChangeHandler}
              required
            />
          </div>
            <input type="submit" value="Update Profile" className="btn btn-primary" />
        </form>
        <p>Total Points: {user.points} </p>
      </div>
    );
};

export default ProfileView;
