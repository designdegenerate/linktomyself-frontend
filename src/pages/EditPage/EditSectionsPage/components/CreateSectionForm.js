import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../../../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../../../components/Forms/Buttons/SubmitButton";
import { createSection } from "../../../../store/user/actions";
import { isDataUpdating } from "../../../../store/user/selectors";
import determineSection from "./determineSection";

export default function CreateSectionForm(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(isDataUpdating);
  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

  const categories = [
    "quotes",
    "books",
    "films",
    "tvShows",
    "games",
    "podcasts",
    "albums",
    "artwork",
    "food",
    "drinks",
    "bars",
    "restaurants",
    "places",
    "musicians",
    "artists",
    "directors",
    "actors",
  ];

  const {
    register,
    reset,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    
    let type;
    const getType = determineSection(data);

    getType.image ? type = "gallery" : type = "list";

    dispatch(createSection(data.section, type));

    reset();
  };

  return (
    <form className="create-section" onSubmit={handleSubmit(onSubmit)}>
      <h3>Create Section</h3>
        <select {...register("section", { value: "quotes"})} name="section" id="section">
          {categories.map((cat) => {
            return (
              <option key={cat} value={cat}>
                {cat === "tvShows" ? "TV Shows" : capitalize(cat)}
              </option>
            );
          })}
        </select>

      {isLoading ? <LoadingButton /> : <SubmitButton title="Create" />}
    </form>
  );
}
