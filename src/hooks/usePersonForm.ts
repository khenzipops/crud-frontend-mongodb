import { useState } from "react";

export function usePersonForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    religion: "",
    height: "",
    weight: "",
    location: "",
    age: "",
    gender: "",
  });

  const resetForm = () =>
    setForm({
      name: "",
      email: "",
      religion: "",
      height: "",
      weight: "",
      location: "",
      age: "",
      gender: "",
    });

  return { form, setForm, resetForm };
}
