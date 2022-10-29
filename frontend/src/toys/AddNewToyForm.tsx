import { useFormik } from "formik";
import Input from "../components/Input";

export const AddNewToyForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      imgUrl: "",
      address: "",
      description: "",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ justifyContent: "center" }}>
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
          name="email"
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
