import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../../../components/Forms/Buttons/LoadingButton";
import {
  isDataUpdating,
  selectUserProfile,
} from "../../../store/user/selectors";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import ButtonBorder from "../../../components/Forms/Buttons/ButtonBorder";
import { useState } from "react";
import FormError from "../../../components/Forms/FormError";
import { deleteUser } from "../../../store/user/actions";
import toast from "react-hot-toast";

export default function DeleteUserPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(isDataUpdating);
  const getUser = useSelector(selectUserProfile);
  const navigate = useNavigate();

  const [getUsername, setUsername] = useState("");

  const deleteAccount = (id) => {
    if (getUsername === getUser.username) {
      dispatch(deleteUser(id, navigate));
    } else {
      toast("username doesn't match")
    }
  };

  return (
    <article className="delete-account">
      <form>
        <Link className="return-to-profile" to="/u/settings">
          Back to Safety
        </Link>
        <h1>Delete Account</h1>
        <p>
          Once an account is deleted, There's no way to go back. To delete your
          account, write your full username (<strong>{getUser.username}</strong>
          ) below:
        </p>
        <label htmlFor="username">Your Username</label>
        <input
          type="text"
          id="username"
          value={getUsername}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        {getUsername !== getUser.username ? (
          <FormError string="Your username doesn't match" />
        ) : (
          <></>
        )}

        {!isLoading ? (
          <ButtonBorder
            title="Delete Account"
            onClick={ (e) => {
              e.preventDefault();
              deleteAccount({_id: getUser._id})}
            }
          />
        ) : (
          <LoadingButton />
        )}
      </form>
    </article>
  );
}
