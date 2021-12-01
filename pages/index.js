import React from "react"
import { useForm } from 'react-hook-form';


// The following component is an example of your existing Input Component
const Input = ({ label, register, required }) => (
  <>
    <div className="inputfield">
      <label>{label}</label>
      <input placeholder={label} {...register(label, { required })} />
    </div>

  </>
);

export default function Home() {

  const { register, handleSubmit } = useForm();

  async function submitHandler(data) {
    await fetch("/api/sheets", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
  }

  return (
    <div className="container">
      <h1 fontSize="2xl" fontWeight="bold">
        Your response matters!
      </h1>

      <form className="formulaire" onSubmit={handleSubmit(submitHandler)}>
        <Input label="Nom" register={register} required />
        <Input label="Prénom" register={register} required />
        <Input label="Téléphone" register={register} required />
        <Input label="Code postal" register={register} required />
        <Input label="Adresse" register={register} required />
        <Input label="Ville" register={register} required />
        <Input label="Numéro" register={register} required />

        <button type="submit">Submit!</button>
      </form>
    </div>
  )
}