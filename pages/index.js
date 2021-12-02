import React from "react"
import { useForm } from 'react-hook-form';


// The following component is an example of your existing Input Component
const Input = ({ label, id, register, required }) => (
  <>
    <div className="inputfield">
      <label className="label">{label}</label>
      <input className="input" id={id} placeholder={label} {...register(id, { required })} />
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
    <div className="bg-gray-200">
      <div className="container max-w-screen-md flex flex-col justify-center align-middle px-8  bg-neutral shadow-2xl gap-8">
        <h1 className="p-8 text-2xl">
          Horlogerie Francophone
        </h1>
        <form className="formulaire container form-control justify-center p-4 max-w-screen-sm " id="form" onSubmit={handleSubmit(submitHandler)}>
          <h3 className="mt-8">Votre nom</h3>
          <Input label="Nom" id="nom" register={register} required />
          <Input label="Prénom" id="prenom" register={register} required />
          <h3 className="mt-8">Coordonnées</h3>
          <Input label="Téléphone" id="tel" register={register} required />
          <Input label="Code postal" id="cp" register={register} required />
          <Input label="Adresse" id="adresse" register={register} required />
          <Input label="Ville" id="ville" register={register} required />
          <h3 className="mt-8">Choisissez un numéro</h3>
          <div id="numero-div" className="flex items-end gap-8 ">
            <Input className="max-w-5xl" label="Numéro" id="numero" register={register} required />
            <button className="btn btn-primary">🎲</button>
          </div>

          <button form="form" className="btn btn-primary p-4 mt-8" type="submit">Submit!</button>
        </form>
      </div>
    </div>
  )
}