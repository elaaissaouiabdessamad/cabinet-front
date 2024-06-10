import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icon3 from "../../../assets/icon3.png";
import MedicalService from "../../../services/medical.service";
import HeaderDossierShow from "../../../components/HeaderDossierShow";

const CaseHistoryShow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [antecedents, setAntecedents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAntecedents = async () => {
      try {
        setLoading(true);
        const response =
          await MedicalService.getAllAntecedentsByMedicalDossierId(patient.id);
        setAntecedents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAntecedents();
  }, [patient.id]);

  const handlePrevious = () => {
    navigate("/show/motif-hospitalisation", { state: { patient, color } });
  };

  const handleNext = () => {
    navigate("/show/histoire-maladie", { state: { patient, color } });
  };

  const handleDossierShow = () => {
    navigate(`/dossier/show/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };

  return (
    <div className="flex flex-col items-center p-10">
      <HeaderDossierShow handleDossierShow={handleDossierShow} />
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient {patient?.prenom} {patient?.nom}
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon3} alt="Identité" className="mr-2 align-center w-8" />
            Antécédents
          </div>
        </div>
        <div className="p-6">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <div>
              {antecedents.map((antecedent, index) => (
                <div
                  key={index}
                  className="mb-4 border border-gray-200 p-4 rounded-lg"
                >
                  <h3 className="mb-2">
                    <strong>Personal: </strong>
                    {antecedent.personal}
                  </h3>
                  <p className="mb-2">
                    <strong>Familial: </strong> {antecedent.familial}
                  </p>
                  <p>
                    <strong>Cardiovascular Risk Factors:</strong>{" "}
                    {antecedent.cardiovascularRiskFactors}
                  </p>
                </div>
              ))}
              {antecedents.length === 0 && (
                <p className="text-center">No antecedents found.</p>
              )}
            </div>
          )}
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

export default CaseHistoryShow;
