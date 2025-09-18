import React, { useEffect, useState } from "react";
import image from "../images/4.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, removeSuccess, updateProfile } from "../features/User/UserSlice";
import Loader from "../components/Loader";
import { removeErrors } from "../features/products/Product.Slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setavatar] = useState("");

  const [avatarpreview, setavatarPreview] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, user, message } = useSelector(
    (state) => state.user
  );

  console.log(loading, success, message, user, error);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
     
      setavatarPreview(user.avatar.url);
    }
  }, [dispatch, user]);

  function profileImageUpdate(e) {
    const target = e.target.files[0];
    if (!target) return null;
    setavatar(target);
    console.log(e);

    setavatarPreview(URL.createObjectURL(target));
  }

  function formsubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    if (!email || !name ) {
      return;
    }

    formData.set("email", email);
    formData.set("name", name);
    if(avatar){
      formData.set("avatar", avatar);

    }
    

    dispatch(updateProfile(formData));
  }

  if (loading) {
    return <Loader />;
  }

  useEffect(() => {
    if (success) {
      toast.success(message, { autoClose: 2000 });

      dispatch(getProfile());

      dispatch(removeSuccess());
      navigate("/profile");
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        autoClose: 2000,
      });
    }
    dispatch(removeErrors());
  }, [dispatch, error]);

  return (
    <div className="container update-container">
      <div className="form-content">
        <form onSubmit={formsubmit} className="form" encType="multipart/formdata">
          <h2>Update Profile</h2>
          <div className="input-group avatar-group">
            <input
              type="file"
              accept="image/*"
              className="file-input"
              onChange={profileImageUpdate}
            />

            <img
              src={avatarpreview ? avatarpreview : image}
              alt="User Profile"
              className="avatar"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="authBtn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
