import React, { useRef, useState, useEffect } from 'react';
import { Box } from '@shops/wrappers/components';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';
import { getOrder, getCart } from '@shops/store/actions';
import { Loader } from '@cxa-rn/components';
import {
  PAYMENT_FAILED_SCREEN,
  PAYMENT_PENDING_SCREEN,
  PAYMENT_SUCCESS_SCREEN,
} from '@shops/navigation/routes';
import { useShopContext } from '@shops/ShopProvider';
import { useIntl } from '@shops/wrappers/core/hooks';
import * as Sentry from '@sentry/react-native';
import { logPayment } from '@shops/screens/log/actions';

//attemp 3
//also before shop FE calling to callbackUrl, it will navigate to this url
//https://benefits.cxa2dev.com/payment-purchase-result
//so we can base on this url to getResult,that will make the app run smoothly even on android s9
// or whatever device that don't call onShouldStartWithNextRequest with out callbackUrl

export const doLoginScript = (username, password) => `
  setTimeout(function() {
    doLogin(
      "${username}",
      "${password}"
    );
  });
  true;
`;

const callbackUrl = 'https://httpbin.org/post'; //can be anyURL
const PAYMENT_SUCCESS = 'PAID';
const PAYMENT_FAILED = 'FAILED';
const PAYMENT_PENDING = 'PENDING';
const loginErrorTypeByAuth0 = 'LoginError';

export const PaymentScreen = ({
  route: {
    params: { paymentUrl, orderId },
  },
  accountInfo,
  getOrder,
  getCart,
  navigation,
  logPayment,
}) => {
  const { shopAuthorizeLoginUrl } = useShopContext();
  const webViewRef = useRef(null);
  const [uri] = useState(
    paymentUrl +
      '&clientId=' +
      accountInfo?.clientname +
      '&callbackUrl=' +
      callbackUrl,
  );
  const [isUnAuthorize, setUnAuthorize] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const intl = useIntl();
  const paymentUrlPure = paymentUrl?.substr(0, paymentUrl.indexOf('?'));
  //attempt 2, create ref to make sure getPaymentResult call 1
  const isAlreadyGetResult = useRef(false);

  useEffect(() => {
    if (isUnAuthorize && accountInfo && webViewRef.current) {
      const { username, password } = accountInfo;
      webViewRef.current.injectJavaScript(doLoginScript(username, password));
    }
  }, [isUnAuthorize, accountInfo, webViewRef]);

  const onWebLoaded = async event => {
    const { nativeEvent } = event;
    const { url } = nativeEvent;
    logPayment({ onWebLoaded: url });
    //samsung s9 don't run onShouldStartWithNextRequest so we check callback here also
    if (url.startsWith(callbackUrl)) {
      getPaymentResult();
    } else if (url.startsWith(shopAuthorizeLoginUrl)) {
      setTimeout(() => {
        setUnAuthorize(true);
      }, 1000);
    } else if (url.startsWith(paymentUrlPure)) {
      setLoading(false);
    }
  };

  const onShouldStartWithNextRequest = request => {
    const { url } = request;
    logPayment({ onShouldStartWithNextRequest: url });
    if (url.startsWith(callbackUrl)) {
      getPaymentResult();
      //attempt 1, after getPaymentResult, stop request from webview
      return false;
    }
    return true;
  };

  const getPaymentResult = async () => {
    if (isAlreadyGetResult.current) return;
    isAlreadyGetResult.current = true;
    try {
      setLoading(true);
      const { value } = await getOrder(orderId);
      getCart();
      if (value.payment) {
        switch (value.payment?.paymentStatus) {
          case PAYMENT_SUCCESS:
            navigation.navigate(PAYMENT_SUCCESS_SCREEN, { order: value });
            break;
          case PAYMENT_FAILED:
            navigation.navigate(PAYMENT_FAILED_SCREEN);
            break;
          case PAYMENT_PENDING:
            navigation.navigate(PAYMENT_PENDING_SCREEN);
        }
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const onWebPostMessage = event => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === loginErrorTypeByAuth0) {
      Sentry.captureMessage('LoginAuth0Fail');
    }
  };

  return (
    <>
      {isLoading && (
        <Box flex={1}>
          <Loader
            primary
            loadingText={intl.formatMessage({ id: 'shop.payment.process' })}
          />
        </Box>
      )}
      <WebView
        testID="webViewContainer"
        ref={webViewRef}
        containerStyle={{
          flex: 0,
          height: isLoading ? 0 : '100%',
        }}
        source={{ uri }}
        originWhitelist={['*']}
        onLoad={onWebLoaded}
        onShouldStartLoadWithRequest={onShouldStartWithNextRequest}
        onMessage={onWebPostMessage}
        androidHardwareAccelerationDisabled={true}
      />
    </>
  );
};
const mapStateToProps = ({ shop: state }) => {
  return { ...state.ssoLogin };
};

export default connect(mapStateToProps, {
  getOrder,
  getCart,
  logPayment,
})(PaymentScreen);
