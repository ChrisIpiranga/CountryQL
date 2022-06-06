import { gql } from "@apollo/client";
export const LOAD_COUNTRY = (countryCode) => {
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
};
