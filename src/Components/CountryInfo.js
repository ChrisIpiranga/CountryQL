import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import NotAvailableInfo from "../Components/NotAvailable";

function CountryInfo(props) {

  const [countryCode, setCountryCode] = useState(props);

  useEffect(() => {
    setCountryCode(props);
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
    loadCountry(countryCode.countryCode)
  );

  const [country, setCountry] = useState([]);

  useEffect(() => {
    if (data) {
      setCountry(data.country);

      if (countryCode.countryCode === "BY") {
        toast.success("hi Tatsiana :)");
      } else if (countryCode.countryCode === "DE") {
        toast.success("hi Marc :)");
      }
    }
  }, [data, countryCode]);

  if (loading || error) {
    return <p className="loading">{error ? error.message : "Loading Country details..."}</p>;
  }

  return (
    <div className="countryInfo">
      <div className="countryInfoRow">
        <div className="countryInfoLabel">Name:</div>
        <div className="countryInfoValue">
          {country.name ? country.name : <NotAvailableInfo />}
        </div>
      </div>
      <div className="countryInfoRow">
        <div className="countryInfoLabel">Flag:</div>
        <div className="countryInfoValue">
          <ReactCountryFlag
            className="countryInfoFlag"
            countryCode={countryCode.countryCode}
            svg
          />
        </div>
      </div>
      <div className="countryInfoRow">
        <div className="countryInfoLabel">Native:</div>
        <div className="countryInfoValue">
          {country.native ? country.native : <NotAvailableInfo />}
        </div>
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
