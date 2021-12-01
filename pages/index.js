import React from "react"
import { useForm } from 'react-hook-form';


// The following component is an example of your existing Input Component
const Input = ({ label, id, register, required }) => (
  <>
    <div className="inputfield">
      <label>{label}</label>
      <input id={id} placeholder={label} {...register(id, { required })} />
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
        <Input label="Nom" id="nom" register={register} required />
        <Input label="Prénom" id="prenom" register={register} required />
        <Input label="Téléphone" id="tel" register={register} required />
        <Input label="Code postal" id="cp" register={register} required />
        <Input label="Adresse" id="adresse" register={register} required />
        <Input label="Ville" id="ville" register={register} required />
        <Input label="Numéro" id="numero" register={register} required />

        <button type="submit">Submit!</button>
      </form>
    </div>
  )
}