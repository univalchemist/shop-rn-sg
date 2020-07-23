import React from 'react';
import { renderForTest } from '@testUtils';

import ClaimDetailsList from '../ClaimDetailsList';

describe('ClaimDetailsList', () => {
  const sectionsList = [
    {
      title: 'Section title 1',
      items: [
        {
          label: 'Item 1 label',
          value: 'Item 1 value',
        },
        {
          label: 'Item 2 label',
          value: undefined,
        },
        {
          label: 'Item 2 label',
          value: undefined,
          tags: ['test'],
        },
      ],
    },
    {
      title: undefined,
      items: [
        {
          label: 'Item 3 label',
          value: 'Item 3 value',
        },
      ],
    },
  ];

  it('should render sections list', () => {
    const component = renderForTest(
      <ClaimDetailsList sectionsList={sectionsList} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
