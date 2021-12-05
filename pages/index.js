import React from "react"
import { useForm } from 'react-hook-form';
import Image from 'next/image'
import logo from '../public/logo.svg'

export default function Home() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  async function submitHandler(data) {
    await fetch("/api/sheets", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
    reset();
  }

  async function checkNumber() {
    const recupererTableau = await fetch("/api/sheets", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    

  }


  function generateNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const autoNumber = generateNumber(0, 9999)

  function fillNumberInput() {
    let n = generateNumber(0, 9999)
    document.getElementById("numero").value = n;
  }

  return (
    <div className="bg-gray-200">
      <div className="container max-w-screen-md flex flex-col justify-center align-middle px-8 py-8 bg-neutral shadow-2xl gap-8">
        <Image
          src={logo}
          alt="Logo de l'Horlogerie Francophone"
          width={250}
          height={250}
          className="App-logo"
        />
        <h1 className="p-8 text-2xl flex justify-center">
          Horlogerie Francophone
        </h1>
        <form className="formulaire container form-control justify-center p-4 max-w-screen-sm " id="form" onSubmit={handleSubmit(submitHandler)}>
          <h3 className="mt-8 text-xl">Votre nom</h3>

          <div className="flex flex-col gap-2">
            <label className="label">Nom</label>
            <input className="input" type="text" id="nom" placeholder="Entrez votre nom" {...register("nom", { required: true, pattern: /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i })} />
          </div>
          {errors.nom && <p>Indiquez votre nom</p>}

          <div className="flex flex-col gap-2">
            <label className="label">Prénom</label>
            <input className="input" type="text" id="prenom" placeholder="Entrez votre prénom" {...register("prenom", { required: true, pattern: /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i })} />
          </div>
          {errors.prenom && <p>Indiquez votre prénom</p>}

          <h3 className="mt-8 text-xl">Vos coordonnées</h3>


          <div className="flex flex-col gap-2">
            <label className="label">Téléphone</label>
            <input className="input" type="tel" id="tel" placeholder="Entrez votre numéro de téléphone" {...register("tel", { required: true, pattern: /^[\d]+$/i, minLength: 10, maxLength: 10 })} />
          </div>
          {errors.tel && <p className="text-alert">Indiquez votre numéro de téléphone</p>}


          <div className="flex flex-col gap-2">
            <label className="label">Adresse</label>
            <input className="input" type="text" id="adresse" placeholder="Entrez votre adresse postale" {...register("adresse", { required: true })} />
          </div>
          {errors.adresse && <p>Indiquez votre adresse</p>}




          <div className="md:flex gap-8">
            <div className="flex flex-col max-w-5xl gap-2">
              <label className="label">Code postal</label>
              <input className="input" type="text" id="cp" placeholder="Entrez votre code postal" {...register("cp", { required: true, pattern: /^[\d]+$/i, minLength: 1, maxLength: 10 })} />
              {errors.cp && <p>Indiquez votre code postal</p>}
            </div>
            <div className="flex flex-grow flex-col gap-2">
              <label className="label">Ville</label>
              <input className="input" type="text" id="ville" placeholder="Entrez votre ville" {...register("ville", { required: true })} />
              {errors.ville && <p>Indiquez votre ville</p>}
            </div>

          </div>

          <h3 className="mt-8 text-xl">Choisissez un numéro</h3>

          <div id="numero-div" className="flex items-end gap-8 ">
            <input className="input max-w-5xl" defaultValue={autoNumber} type="number" id="numero" placeholder="Choisissez un numéro" {...register("numero", { required: true, min: 0, max: 9999 })} />
            {errors.numero && <p>Choisissez un autre numéro entre 0 et 9999</p>}
            <button id="randomButton" className="btn btn-primary" type="button" onClick={fillNumberInput} >🎲</button>
          </div>

          <button form="form" className="btn btn-primary p-4 mt-8" type="submit">Participer au jeu 🎉</button>
        </form>
      </div >
    </div >
  )
}