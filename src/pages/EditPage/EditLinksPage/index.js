import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../../components/Forms/Buttons/SubmitButton";
import TextField from "../../../components/Forms/TextFields/TextField";
import LinkField from "../../../components/Forms/TextFields/LinkField";
import { isDataUpdating, selectUserPage } from "../../../store/user/selectors";
import "./style.scss";
import ButtonBorder from "../../../components/Forms/Buttons/ButtonBorder";
import { updateData } from "../../../store/user/actions";

export default function EditLinksPage() {
  const dispatch = useDispatch();
  const userPage = useSelector(selectUserPage);
  const isLoading = useSelector(isDataUpdating);
  const { permaLinks } = userPage;

  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
  } = useForm();

  const {
    register: registerNewLink,
    formState: { errors: errorsNewLink },
    handleSubmit: handleSubmitNewLink,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onSubmitNewLink = (data) => {
    const newLink = [
      {
      permaLinks: {
        newLink: {
          title: data.title,
          link: data.link,
          }
        }
      }
    ]

  console.log(newLink);

  dispatch(updateData(newLink));
  }



  return (
    <article className="edit-links">
      <h1>Edit Links</h1>
      <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
        {permaLinks.length === 0 ? (
          <div className="content-empty">
            <div>
              <h2>You have no links yet!</h2>
              <p>Add some using the button below</p>
            </div>
          </div>
        ) : (
          <>
            {permaLinks.map((link) => {
              return (
                <div key={link._id}>
                  <TextField
                    name={`title_${link._id}`}
                    title="Title"
                    errors={errors[`title_${link._id}`]?.message}
                    register={register(`title_${link._id}`, {
                      required: {
                        value: true,
                        message: "Required",
                      },
                      value: link.text,
                    })}
                  />
                  <LinkField
                    name={`link_${link._id}`}
                    title="URL"
                    errors={errors[`link_${link._id}`]?.message}
                    register={register(`link_${link._id}`, {
                      required: {
                        value: true,
                        message: "Required",
                      },
                      value: link.link,
                    })}
                  />
                  {isLoading ? (
                    <LoadingButton />
                  ) : (
                    <div class="edit-links-btn-row">
                      <SubmitButton title="Apply" />
                      <ButtonBorder title="Delete" />
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </form>
      <details>
        <summary>Add a link</summary>
        <form
          className="edit-form"
          onSubmit={handleSubmitNewLink(onSubmitNewLink)}
        >
          <TextField
            name="title"
            title="Title"
            placeholder="Website"
            errors={errorsNewLink.title?.message}
            register={registerNewLink("title", {
              required: {
                value: true,
                message: "Required",
              },
            })}
          />
          <LinkField
            name="link"
            title="URL"
            placeholder="example.com"
            errors={errorsNewLink.link?.message}
            register={registerNewLink("link", {
              required: {
                value: true,
                message: "Required",
              },
            })}
          />
          {isLoading ? <LoadingButton /> : <SubmitButton title="Add Link" />}
        </form>
      </details>
    </article>
  );
}
