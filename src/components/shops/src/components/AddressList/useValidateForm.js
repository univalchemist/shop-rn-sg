import { useState, useCallback } from 'react';
import { validateRequired } from '@wrappers/core/validations';
import { useIntl } from '@shops/wrappers/core/hooks';

const useValidateForm = () => {
  const intl = useIntl();
  const [errors, setErrors] = useState(null);

  const validate = useCallback(
    form => {
      const firstNameError = validateRequired(form?.firstName);
      const lastNameError = validateRequired(form?.lastName);
      const telephoneError = validateRequired(form?.telephone);
      const address1Error = validateRequired(form?.address1);
      const zipCodeError = validateRequired(form?.zipCode);
      const cityError = validateRequired(form?.city);
      const countryIdError = validateRequired(form?.countryId);

      if (
        !!firstNameError ||
        !!lastNameError ||
        !!telephoneError ||
        !!address1Error ||
        !!zipCodeError ||
        !!countryIdError ||
        !!cityError
      ) {
        const arrErrors = {
          address1: address1Error
            ? intl.formatMessage({ id: address1Error })
            : '',
          zipCode: zipCodeError ? intl.formatMessage({ id: zipCodeError }) : '',
          city: cityError ? intl.formatMessage({ id: cityError }) : '',
          firstName: firstNameError
            ? intl.formatMessage({ id: firstNameError })
            : '',
          lastName: lastNameError
            ? intl.formatMessage({ id: lastNameError })
            : '',
          telephone: telephoneError
            ? intl.formatMessage({ id: telephoneError })
            : '',
        };

        if (countryIdError) {
          arrErrors.countryId = countryIdError;
        }
        setErrors(arrErrors);
        return false;
      } else {
        setErrors(null);
        return true;
      }
    },
    [intl],
  );
  return [errors, validate];
};

export const formattedAddress = ({ form, isDefaultShipping }) => {
  const street = [form.address1];
  if (form.address2) {
    street.push(form.address2);
  }
  const region = { id: 0 };
  if (form.province) {
    region.code = form.province;
    region.region = form.province;
  }

  const resultForm = {
    firstName: form.firstName,
    lastName: form.lastName,
    telephone: form.telephone,
    regionId: 0,
    region,
    countryId: form.countryId,
    postCode: form.zipCode,
    city: form.city,
    street,
  };
  if (isDefaultShipping) resultForm.isDefaultShipping = isDefaultShipping;
  return resultForm;
};

export default useValidateForm;
