import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    refreshUser();
    history.push("/");
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newDisplayName === "") return;
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
    refreshUser();
  };

  return (
    <div className="container">
      <form className="profileForm" onSubmit={onSubmit}>
        <input
          className="formInput"
          autoFocus
          type="text"
          placeholder={newDisplayName}
          onChange={onChange}
        />
        <button
          type="submit"
          value="Update Profile"
          style={{
            marginTop: 10,
          }}
        >
          Update Profile
        </button>
      </form>
      <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
