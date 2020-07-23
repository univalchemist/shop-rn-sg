import reducer from '../reducer';
import * as types from '../types';

jest.mock('@services/secureStore', () => ({
  save: jest.fn(),
  fetch: jest.fn(),
}));

const validAccessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNlbUxNMjA5aTA0V1o2aXNRMHNUQUszMDBiYVN2RjZQdUhJSGdMT25lMDgifQ.eyJyb2xlIjoiIiwianRpIjoiSGdjdVFoRXc1dm92eEFuNHhPbHFiIiwic3ViIjoiNDk1IiwiaWF0IjoxNTkxMDg0MzQ0LCJleHAiOjE1OTM2NzYzNDQsInNjb3BlIjoib3BlbmlkIEFMTCBwcm9maWxlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmN4YTJkZXYuY29tLyIsImF1ZCI6ImN4YTJvbmN4YTEiLCJhenAiOiIxMzlmNjY1N2ZkZjhhNTZiMzg2ZDcyY2ViNzdmNDM1YiIsImd0eSI6InBhc3N3b3JkIiwiaHR0cDovL2Rpc3RyaWJ1dGlvbi1hdXRoLXNlcnZpY2UuY3hhdHdvLmNvbS9jbGllbnRpZCI6ImN4YTJvbmN4YTEiLCJodHRwOi8vZGlzdHJpYnV0aW9uLWF1dGgtc2VydmljZS5jeGF0d28uY29tL3BlbmRpbmdfYWN0aW9uIjpudWxsLCJodHRwOi8vZGlzdHJpYnV0aW9uLWF1dGgtc2VydmljZS5jeGF0d28uY29tL2V4dGVybmFsaWQiOiJjeGEyb25jeGExXzE1OSJ9.SOtPdnAza7ecwf68Dt6Zw_Xvxl9V65yuQeE6KX6NPB8fjbVTF71g2h94rslcc3GYPBh9Q2T3Y4WgJohZaUn5TrE7lGhP-_xM_aD9mNuMrBveG00O7AiCqg2YF1sGYUl_O4mPIiLNqIETklxmoKHNekybbnTMtLxHubBQpGkv62LEKez3tgm_JclyNcsIk1lh809Q9YKOJmwwhG1lPygsAkyFMF9usP-sAPz0agZQlknOs7VMr_PZHt8w9J7WjczUTDE6dRzh3r5LktlanLTqcE3cefcUdB54N8IZZ35eWjYp_lFaXsv-PGAA2cIJspRK1O85HorC1aGVCNxwmh6-4g';

describe('Reducer Users', () => {
  it('should handle LOGIN_SUCCESS action for employee', () => {
    expect(
      reducer(undefined, {
        type: types.LOGIN_SUCCESS,
        payload: {
          clientId: 'testclient',
          userId: '3',
          username: 'test@email.com',
          accessToken: validAccessToken,
        },
      }),
    ).toMatchObject({
      clientId: 'testclient',
      userId: '3',
      username: 'test@email.com',
    });
  });

  it('should handle LOGIN_SUCCESS action for dependent spouse', () => {
    expect(
      reducer(undefined, {
        type: types.LOGIN_SUCCESS,
        payload: {
          clientId: 'testclient',
          userId: '3',
          username: 'test@email.com',
          accessToken: validAccessToken,
        },
      }),
    ).toMatchObject({
      clientId: 'testclient',
      userId: '3',
      username: 'test@email.com',
    });
  });

  it('should handle LOGIN_SUCCESS action for dependent child', () => {
    expect(
      reducer(undefined, {
        type: types.LOGIN_SUCCESS,
        payload: {
          clientId: 'testclient',
          userId: '3',
          username: 'test@email.com',
          accessToken: validAccessToken,
        },
      }),
    ).toMatchObject({
      clientId: 'testclient',
      userId: '3',
      username: 'test@email.com',
    });
  });

  it('should update the preferred locale state', () => {
    const action = {
      type: types.UPDATE_MEMBER_PROFILE_SUCCESS,
      payload: {
        preferredLocale: 'zh-HK',
      },
    };

    expect(reducer(undefined, action)).toMatchObject({
      preferredLocale: 'zh-HK',
    });
  });

  it('should handle GET_MEMBER_PROFILE_SUCCESS action for employee', () => {
    expect(
      reducer(undefined, {
        type: types.GET_MEMBER_PROFILE_SUCCESS,
        payload: {
          clientId: 'testclient',
          preferredLocale: 'en-HK',
          relationships: [
            {
              memberId: '2',
              role: 'Dependent',
              relationshipToEmployee: 'Spouse',
              relationshipCategory: 'Spouse',
            },
          ],
          relationshipToEmployee: 'Self',
          role: 'Employee',
          memberId: '3',
        },
      }),
    ).toMatchObject({
      preferredLocale: 'en-HK',
      membersMap: {
        '2': {
          memberId: '2',
          role: 'Dependent',
          relationshipToEmployee: 'Spouse',
          relationshipCategory: 'Spouse',
        },
        '3': {
          memberId: '3',
          role: 'Employee',
          relationshipToEmployee: 'Self',
        },
      },
      membersProfileOrder: ['3', '2'],
    });
  });

  it('should handle GET_MEMBER_PROFILE_SUCCESS action for dependent spouse', () => {
    expect(
      reducer(undefined, {
        type: types.GET_MEMBER_PROFILE_SUCCESS,
        payload: {
          clientId: 'testclient',
          preferredLocale: 'en-HK',
          relationships: [
            {
              memberId: '2',
              username: 'test@mail.com',
              role: 'Employee',
              relationshipToEmployee: 'Self',
              relationshipCategory: 'Self',
            },
          ],
          relationshipToEmployee: 'Spouse',
          relationshipCategory: 'Spouse',
          role: 'Dependent',
          memberId: '3',
        },
      }),
    ).toMatchObject({
      preferredLocale: 'en-HK',
      membersMap: {
        '3': {
          memberId: '3',
          role: 'Dependent',
          relationshipToEmployee: 'Spouse',
          relationshipCategory: 'Spouse',
        },
        '2': {
          memberId: '2',
          role: 'Employee',
          relationshipToEmployee: 'Self',
          relationshipCategory: 'Self',
        },
      },
      membersProfileOrder: ['2', '3'],
    });
  });

  it('should handle GET_MEMBER_PROFILE_SUCCESS action for dependent child', () => {
    expect(
      reducer(undefined, {
        type: types.GET_MEMBER_PROFILE_SUCCESS,
        payload: {
          clientId: 'testclient',
          preferredLocale: 'en-HK',
          relationships: [
            {
              memberId: '2',
              role: 'Employee',
              relationshipToEmployee: 'Self',
              relationshipCategory: 'Self',
            },
          ],
          relationshipToEmployee: 'Child',
          relationshipCategory: 'Child',
          role: 'Dependent',
          memberId: '3',
        },
      }),
    ).toMatchObject({
      preferredLocale: 'en-HK',
      membersMap: {
        '3': {
          memberId: '3',
          role: 'Dependent',
          relationshipToEmployee: 'Child',
          relationshipCategory: 'Child',
        },
        '2': {
          memberId: '2',
          role: 'Employee',
          relationshipToEmployee: 'Self',
          relationshipCategory: 'Self',
        },
      },
      membersProfileOrder: ['2', '3'],
    });
  });

  it('should handle UPDATE_EDM_OPTED_OUT_START', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_EDM_OPTED_OUT_START,
      }),
    ).toMatchObject({
      isEdmOptedOut: true,
    });
  });

  it('should handle UPDATE_EDM_OPTED_OUT_ERROR', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_EDM_OPTED_OUT_ERROR,
      }),
    ).toMatchObject({
      isEdmOptedOut: true,
    });
  });

  it('should handle UPDATE_EDM_OPTED_OUT_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_EDM_OPTED_OUT_SUCCESS,
        payload: {
          isEdmOptedOut: false,
        },
      }),
    ).toMatchObject({
      isEdmOptedOut: false,
    });
  });

  it('should handle UPDATE_AGREEMENT_TERMS_CONDITIONS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_AGREEMENT_TERMS_CONDITIONS_SUCCESS,
        payload: {
          isTermsAccepted: true,
          isEdmOptedOut: false,
        },
      }),
    ).toMatchObject({
      isTermsAccepted: true,
      isEdmOptedOut: false,
    });
  });
});
