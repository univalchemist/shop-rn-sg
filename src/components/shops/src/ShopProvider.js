import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const ShopContext = createContext({
  authAuthorizeUrl: null,
  redirectUrl: null,
  shopAuthorizeLoginUrl: null,
});

export const ShopContextProvider = ({ children, value }) => {
  const { authAuthorizeUrl, redirectUrl, shopAuthorizeLoginUrl } = value;

  return (
    <ShopContext.Provider
      value={{
        authAuthorizeUrl,
        shopAuthorizeLoginUrl,
        redirectUrl,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  return useContext(ShopContext);
};

ShopContextProvider.propTypes = {
  value: PropTypes.shape({
    shopAuthorizeLoginUrl: PropTypes.string.isRequired,
  }),
};
