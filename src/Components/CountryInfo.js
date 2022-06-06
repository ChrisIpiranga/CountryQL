import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { LOAD_COUNTRY } from "../GraphQL/Country";

function CountryInfo(props) {

  const [countryInfo, setCountryInfo] = useState([]);
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    setCountryCode(props.countryCode);
  }, [props.countryCode]);

  const isCountryCodeValid = () => {
    return countryCode === "";
  };

  const { error, loading, data } = useQuery(LOAD_COUNTRY(countryCode), {
    skip: isCountryCodeValid(),
  });

  useEffect(() => {
    if (data) {

      setCountryInfo(data.country);

      // Easter Egg :D #################
      if (countryCode === "BY") {
        toast.success("hi Tatsiana :)");
      } else if (countryCode === "DE") {
        toast.success("hi Marc :)");
      }
      //################################
    }
  }, [countryCode, data]);

  if (loading || error) {
    return <p className="loading">{error ? error.message : "Loading Country details..."}</p>;
  }

  if (!Object.keys(countryInfo).length) return;

  return (
    <div className="countryInfo">
      <div className="countryInfoRow">
        <div>Name:</div>
        <div>{countryInfo.name}</div>
      </div>
      <div className="countryInfoRow">
        <div>Flag:</div>
        <div>
          <ReactCountryFlag
            className="countryInfoFlag"
            countryCode={countryCode}
            svg
          />
        </div>
      </div>

      {countryInfo.native && (
        <div className="countryInfoRow">
          <div>Native:</div>
          <div>{countryInfo.native}</div>
        </div>
      )}

      {countryInfo.capital && (
        <div className="countryInfoRow">
          <div>Capital:</div>
          <div>{countryInfo.capital}</div>
        </div>
      )}

      {countryInfo.currency && (
        <div className="countryInfoRow">
          <div>Currency:</div>
          <div>{countryInfo.currency}</div>
        </div>
      )}

      {countryInfo.languages.length > 0 && (
        <div className="countryInfoRow">
          <div>Language(s):</div>
          <div>
            {countryInfo.languages.map((language, index) => (
              <div key={index}>
                {language.name} [{language.code}]
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryInfo;
