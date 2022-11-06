import axios from "axios";
import { useFormik } from "formik";
import { useRecoilValue } from "recoil";
import Input from "../components/Input";
import { userState } from "../session/sessionState";
import { createToy } from "../shared/APIs/fetchToys";

export const AddNewToyForm = () => {
  const user = useRecoilValue(userState);

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      imgUrl: "",
      address: "",
      description: "",
    },
    onSubmit: async (values) => {
      if (user) {
        createToy({ ...values, ownerId: user.id });
        // refresh toy lists states
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <h2>Add a toy</h2>
        <Input
          placeholder="McQueen"
          name="name"
          label="Name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <Input
          placeholder="Auta"
          name="category"
          label="Kategoria"
          onChange={formik.handleChange}
          value={formik.values.category}
        />
        <Input
          placeholder="url"
          name="imgUrl"
          label="Photo"
          onChange={formik.handleChange}
          value={formik.values.imgUrl}
        />
        <Input
          placeholder="Lodz 77"
          name="address"
          label="Adres"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        <Input
          placeholder="Good condition"
          name="description"
          label="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
