import React from "react";
import { AddNewToyForm } from "./AddNewToyForm";
import { ToysList } from "./ToysList";

export const ToysView = () => {
  return (
    <>
      <h1>List of toys</h1>
      <ToysList />
      <button>Add new toy</button>
      <AddNewToyForm />
    </>
  );
};
