import React from 'react';
import { renderForTest } from '@testUtils';
import {
  act,
  fireEvent,
  flushMicrotasksQueue,
} from 'react-native-testing-library';
import navigation from '@testUtils/__mocks__/navigation';

import { UploadBox } from '@wrappers/components';
import ClaimDocuments from '../ClaimDocuments';

describe('ClaimDocuments', () => {
  const documents = [
    {
      title: 'Section title 1',
      items: [
        {
          id: 'receipt-1',
          contentType: 'image',
          fileName: 'image2.png',
          uri: 'mock-uri',
        },
        {
          id: 'receipt-2',
          contentType: 'image',
          fileName: 'image2.png',
          uri: 'mock-uri',
        },
      ],
      field: 'section1',
      isDocumentSection: true,
      documentType: 'document',
    },
    {
      title: '',
      items: [
        {
          id: 'referral-1',
          contentType: 'image',
          fileName: 'image2.png',
          uri: 'mock-uri',
        },
        {
          id: 'referral-2',
          contentType: 'image',
          fileName: 'image2.png',
          uri: 'mock-uri',
        },
      ],
      field: 'section2',
      isDocumentSection: true,
      documentType: 'document',
    },
  ];

  it('should render claim documents', async () => {
    const component = renderForTest(
      <ClaimDocuments sections={documents} navigation={navigation} />,
    );
    expect(component.toJSON()).toMatchSnapshot();

    // const documents = component.queryAllByType(UploadBox);

    await flushMicrotasksQueue();
    act(() => {
      fireEvent(component.getAllByType(UploadBox)[0], 'view');
    });
    expect(navigation.navigate).toHaveBeenCalled();
  });
});
