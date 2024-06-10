import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon5 from "../../../assets/icon5.png";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AddPrimaryConclusionForm from "../Forms/AddPrimaryConclusionForm";
import PrimaryConclusionDisplay from "../Forms/PrimaryConclusionDisplay";
import HeaderDossier from "../../../components/HeaderDossier";

const PrimaryConclusion = () => {
  const [primaryConclusionUpdate, setPrimaryConclusionUpdate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient;
  const color = location.state?.color;
  console.log(patient);
  const handlePrevious = () => {
    navigate("/histoire-maladie", { state: { patient, color } });
  };

  const handleNext = () => {
    navigate("/examen-clinique", { state: { patient, color } });
  };

  const handleDossier = () => {
    navigate(`/dossier/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };

  return (
    <div className="flex flex-col items-center p-10">
      <HeaderDossier handleDossier={handleDossier} />
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient {patient?.prenom} {patient?.nom}
      </div>{" "}
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon5} alt="Identité" className="mr-2 align-center w-8" />
            Conclusion primaire
          </div>
        </div>
        <div className="pb-6 m-6">
          <AddPrimaryConclusionForm
            patientId={patient?.id}
            setPrimaryConclusionUpdate={setPrimaryConclusionUpdate}
          />
          {/*<PrimaryConclusionDisplay
            patientId={patient.id}
            primaryConclusionUpdate={primaryConclusionUpdate}
          />*/}
        </div>
      </div>
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={handlePrevious}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg"
        >
          Précédent
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default PrimaryConclusion;
