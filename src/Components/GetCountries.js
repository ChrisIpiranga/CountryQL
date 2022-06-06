import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_COUNTRIES } from '../GraphQL/Countrie';
import CountryInfo from './CountryInfo';

function GetCountries() {

  const { error, loading, data } = useQuery(LOAD_COUNTRIES);
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    if (data) {
      setCountries(data.countries);
    }
  }, [data])

  if (loading || error) {
    return <p className="loading">{error ? error.message : "Loading..."}</p>;
  }

  return (
    <div className="countryList">
      <label className="countryLabel">Country List:</label>
      <select
        value={countryCode}
        onChange={(event) => setCountryCode(event.target.value)}
      >
        <option key="" value="">
          Please Select
        </option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      {countryCode ? (
        <CountryInfo countryCode={countryCode} />
      ) : (
        <div className='noSelected'>No country selected</div>
      )}
    </div>
  );
}

export default GetCountries;
