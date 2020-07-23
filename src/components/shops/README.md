## Config

In your parent project, if you want to use Shop module, please follow below steps:

1. Config locale: open `messages/index.js`

```
import { en_HK as shop_en_HK, zh_HK as shop_zh_HK } from '@components/shops';

const messages = {
  'en-HK': { ...en_HK, ...shop_en_HK },
  'en-UK': en_UK,
  'id-ID': id_ID,
  'zh-HK': { ...zh_HK, ...shop_zh_HK },
};
```

2. Config reducer: open `store/reducers.js`

```
import shop from '@components/shops/src/store/reducers';

const appReducer = combineReducers({
  ...
  shop,
});
```

3. Config theme: open `theme.js`

```
import shopTheme from '@components/shops/src/theme.js';

const theme = {
  ...
  shop: shopTheme,
};
```

**Note**: You can override shopTheme if you want

4. Config `jsconfig.json`

Add new paths:

```
"@shops": ["./src/components/shops/src"],
"@shops/*": ["./src/components/shops/src/*"]
```

5. Config `babel.config.js`

Add new alias

```
'@shops': ['./src/components/shops/src'],
```

6. To use shop :
- in `src/index.js` import these lines:

```
import { ShopContextProvider } from '@components/shops';

...

 <ShopContextProvider //wrap around Root Navigator
                  value={{
                    authAuthorizeUrl: Config.SHOP_AUTHORIZE_URI,
                    shopAuthorizeLoginUrl: Config.SHOP_AUTHORIZE_LOGIN_URI,
                    redirectUrl: Config.REDIRECT_URL
                  }}
                >
                  <RootNavigator />
 </ShopContextProvider>
```
- in `LoginScreen.js` when login success pass the required fields to shop 

``` 
...

import { updateAccountConfigForShop } from '@components/shops';

...
const onSubmit = async values => {
    try {
      const { value } = await login(values, ({ clientId }) => {
                 updateClientId(clientId);
               });
       //import this to pass required field for shop
       updateAccountConfigForShop({ accountInfo: values, userId: value.userId });
    } catch (error) {
       ...
    }

```
- when user logout , call logout action for shop as well
```
   ...
   
   import { logOutShop } from '@components/shops';
   
   ...

   <TrackedButton
             secondary
             title={intl.formatMessage({ id: 'logoutButtonText' })}
             onPress={() => {
               logout();
               logOutShop(); //add this
             }}
             actionParams={{
               category: categories.PROFILE_SETTINGS,
               action: 'Log out',
             }}
           />

```



## Dependencies

Add these libs into your parent project

- react-native-modal-dropdown
- react-native-collapsible
- @ptomasroos/react-native-multi-slider
- lodash
- reselect
- @react-native-community/cookies
