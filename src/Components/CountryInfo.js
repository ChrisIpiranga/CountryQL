import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import NotAvailableInfo from "../Components/NotAvailable";

function CountryInfo(props) {

  const [countryLoad, setCountryLoad] = useState(props);

  useEffect(() => {
    setCountryLoad(props);
  }, [props]);

  function loadCountry(countryCode) {
    return gql`
      {
        country (code: "${countryCode}") {
          name
          native
          capital
          emoji
          currency
          languages {
            code
            name
          }
        }
      }
    `;
  }

  const { error, loading, data } = useQuery(
    loadCountry(countryLoad.countryCode)
  );

  const [country, setCountry] = useState([]);

  useEffect(() => {
    if (data) {
      setCountry(data.country);

      if (countryLoad.countryCode === "BY") {
        toast.success("hi Tatsiana :)");
      } else if (countryLoad.countryCode === "DE") {
        toast.success("hi Marc :)");
      }
    }
  }, [data]);

  if (loading || error) {
    return <p className="loading">{error ? error.message : "Loading Country details..."}</p>;
  }

  return (
    <div className="countryInfo">
      <div className="countryInfoRow">
        <div className="countryInfoLabel">Name:</div>
        <div className="countryInfoValue">{country.name}</div>
      </div>
      <div className="countryInfoRow">
        <div className="countryInfoLabel">Flag:</div>
        <div className="countryInfoValue">
          <ReactCountryFlag
            className="countryInfoFlag"
            countryCode={countryLoad.countryCode}
            svg
          />
        </div>
      </div>
      <div className="countryInfoRow">
        <div className="countryInfoLabel">Native:</div>
        <div className="countryInfoValue">{country.native}</div>
      </div>
      <div className="countryInfoRow">
        <div className="countryInfoLabel">Capital:</div>
        <div className="countryInfoValue">
          {country.capital ? country.capital : <NotAvailableInfo />}
        </div>
      </div>
      <div className="countryInfoRow">
        <div className="countryInfoLabel">Currency:</div>
        <div className="countryInfoValue">
          {country.currency ? country.currency : <NotAvailableInfo />}
        </div>
      </div>
      <div className="countryInfoRow">
        <div className="countryInfoLabel">Language(s):</div>
        <div className="countryInfoValue">
          {country.languages && country.languages.length ? (
            country.languages.map((language, index) => (
              <div key={index}>
                {language.name} ({language.code})
              </div>
            ))
          ) : (
            <NotAvailableInfo />
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryInfo;
