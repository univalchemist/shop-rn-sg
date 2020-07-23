import * as React from 'react';
import { renderForTest } from '@testUtils';
import { PaymentScreen as PaymentScreenPure } from '../PaymentScreen';
import messages from '@shops/locales/en-HK.json';
import WebView from 'react-native-webview';
import {
  act,
  fireEvent,
  flushMicrotasksQueue,
} from 'react-native-testing-library';
import {
  PAYMENT_FAILED_SCREEN,
  PAYMENT_PENDING_SCREEN,
  PAYMENT_SUCCESS_SCREEN,
} from '@shops/navigation/routes';
import { doLoginScript } from '@shops/screens/cart/PaymentScreens/PaymentScreen';
import * as Sentry from '@sentry/react-native';
jest.useFakeTimers();

const initialState = {
  accountInfo: { username: 'username', password: 'password' },
  navigation: {
    navigate: jest.fn(),
  },
  logPayment: jest.fn(),
};

jest.mock('@shops/ShopProvider', () => ({
  useShopContext: jest.fn(() => ({
    authAuthorizeUrl: 'authAuthorizeUrl',
    redirectUrl: 'redirectUrl',
    shopAuthorizeLoginUrl: 'shopAuthorizeLoginUrl',
  })),
}));

const route = {
  params: {
    paymentUrl: 'paymentUrl?callbackUrl',
    orderId: 'orderId',
  },
};

jest.mock('react-native-webview', () => {
  const React = require('react');
  const View = require('react-native').View;
  const injectJavaScriptSpy = jest.fn();

  class MockWebView extends React.Component {
    injectJavaScript = injectJavaScriptSpy;
    render() {
      return <View {...this.props} />;
    }
  }

  MockWebView.injectJavaScriptSpy = injectJavaScriptSpy;
  return MockWebView;
});

jest.mock('@sentry/react-native', () => ({
  captureMessage: jest.fn(),
}));

describe('PaymentScreenPure', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should show loading screen when process login sso', async () => {
    const Comp = renderForTest(
      <PaymentScreenPure route={route} {...initialState} />,
    );
    await flushMicrotasksQueue();
    expect(Comp.queryByText(messages['shop.payment.process'])).toBeTruthy();
    const webViewContainer = Comp.queryByTestId('webViewContainer');
    expect(webViewContainer.props.containerStyle.height).toEqual(0);
  });

  it('should should webview  when  login sso success', async () => {
    const Comp = renderForTest(
      <PaymentScreenPure route={route} {...initialState} />,
    );
    await flushMicrotasksQueue();
    const webView = Comp.queryByType(WebView);
    fireEvent(webView, 'onLoad', { nativeEvent: { url: 'paymentUrl' } });
    await flushMicrotasksQueue();
    expect(Comp.queryByText(messages['shop.payment.process'])).toBeNull();
    const webViewContainer = Comp.queryByTestId('webViewContainer');
    expect(webViewContainer.props.containerStyle.height).toEqual('100%');
  });

  it('should do login script when authorize fail', async () => {
    const Comp = renderForTest(
      <PaymentScreenPure route={route} {...initialState} />,
    );
    await flushMicrotasksQueue();
    const webView = Comp.queryByType(WebView);
    fireEvent(webView, 'onLoad', {
      nativeEvent: { url: 'shopAuthorizeLoginUrl' },
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(WebView.injectJavaScriptSpy).toHaveBeenCalledTimes(1);
    expect(WebView.injectJavaScriptSpy).toHaveBeenCalledWith(
      doLoginScript('username', 'password'),
    );
  });

  it('should navigate to payment when auth success ', async () => {
    const Comp = renderForTest(
      <PaymentScreenPure route={route} {...initialState} />,
    );
    await flushMicrotasksQueue();
    const webView = Comp.queryByType(WebView);
    fireEvent(webView, 'onLoad', {
      nativeEvent: { url: 'redirectUrl' },
    });
    await flushMicrotasksQueue();
    expect(setTimeout).toBeCalledTimes(1);
  });

  it('should handle onPostMessage properly ', async () => {
    const Comp = renderForTest(
      <PaymentScreenPure route={route} {...initialState} />,
    );
    await flushMicrotasksQueue();
    const webView = Comp.queryByType(WebView);
    fireEvent(webView, 'onMessage', {
      nativeEvent: { data: JSON.stringify({ type: 'LoginError' }) },
    });
    await flushMicrotasksQueue();
    expect(Sentry.captureMessage).toBeCalledWith('LoginAuth0Fail');
  });

  it('should navigate to get PaymentResult Success properly', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const orderRes = {
      orderIdText: 'Cxa1',
      payment: { paymentStatus: 'PAID' },
    };
    const initialState = {
      logPayment: jest.fn(),
      accountInfo: { username: 'username', password: 'password' },
      getOrder: jest.fn(() =>
        Promise.resolve({
          value: orderRes,
        }),
      ),
      getCart: jest.fn(),
    };
    const Comp = renderForTest(
      <PaymentScreenPure
        route={route}
        {...initialState}
        navigation={navigation}
      />,
    );
    await flushMicrotasksQueue();
    const webView = Comp.queryByType(WebView);

    fireEvent(webView, 'shouldStartLoadWithRequest', {
      url: 'https://httpbin.org/post',
    });

    await flushMicrotasksQueue();

    expect(navigation.navigate).toBeCalledWith(PAYMENT_SUCCESS_SCREEN, {
      order: orderRes,
    });
  });

  it('should navigate to get PaymentResult Failed properly', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const orderRes = {
      orderIdText: 'Cxa1',
      payment: { paymentStatus: 'FAILED' },
    };
    const initialState = {
      logPayment: jest.fn(),
      accountInfo: { username: 'username', password: 'password' },
      getOrder: jest.fn(() =>
        Promise.resolve({
          value: orderRes,
        }),
      ),
      getCart: jest.fn(),
    };
    const Comp = renderForTest(
      <PaymentScreenPure
        route={route}
        {...initialState}
        navigation={navigation}
      />,
    );
    await flushMicrotasksQueue();
    const webView = Comp.queryByType(WebView);
    fireEvent(webView, 'shouldStartLoadWithRequest', {
      url: 'https://httpbin.org/post',
    });
    await flushMicrotasksQueue();
    expect(navigation.navigate).toBeCalledWith(PAYMENT_FAILED_SCREEN);
  });

  it('should navigate to get PaymentResult PENDING properly', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const orderRes = {
      orderIdText: 'Cxa1',
      payment: { paymentStatus: 'PENDING' },
    };
    const initialState = {
      accountInfo: { username: 'username', password: 'password' },
      logPayment: jest.fn(),
      getOrder: jest.fn(() =>
        Promise.resolve({
          value: orderRes,
        }),
      ),
      getCart: jest.fn(),
    };
    const Comp = renderForTest(
      <PaymentScreenPure
        route={route}
        {...initialState}
        navigation={navigation}
      />,
    );
    await flushMicrotasksQueue();
    const webView = Comp.queryByType(WebView);
    fireEvent(webView, 'shouldStartLoadWithRequest', {
      url: 'https://httpbin.org/post',
    });
    await flushMicrotasksQueue();
    expect(navigation.navigate).toBeCalledWith(PAYMENT_PENDING_SCREEN);
  });
});
