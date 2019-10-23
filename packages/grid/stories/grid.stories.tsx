/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Grid from '../src';
import { /* mockColumns, */mockRows } from './mock-rows';
import { mockTheme } from './mock-theme';


const Div = styled.div`
height: 500px;
`;
const columns = [
  'firstName',
  'lastName',
  'fullName',
  'salesStatusId',
  'salesStatus',
  'salesStatusRejectReason',
  'salesStatusRejectReasonId',
  'tradingStatus',
  'eligibilityRejectReason',
  'eligibilityRejectReasonId',
  'isEligible',
  'country',
  'city',
  'language',
  'timeZone',
  'creationDate',
  'phoneVerification',
  'registrationDate',
  'accountCreationDate',
  'channelName',
  'isOnline',
  'isDay',
  'lastRegistrationAttemptDate',
  'lastActivityDate',
  'lastLoginDate',
  'complianceStatus',
  'initialDepositPbc',
  'redepositPbc',
  'balancePbc',
  'netCreditPbc',
  'chargebackPbc',
  'chargebackReversalPbc',
  'numberOfAccounts',
  'domainName',
  'originalDomainName',
  'phone1',
  'nameDuplicates',
  'deviceType',
  'isDuplicateChecked',
  'isDuplicateCheckedText',
  'leadId',
  'tradingPlatformId',
  'email',
  'businessUnitId',
  'businessUnit',
  'conversionAgentId',
  'conversionAgent',
  'retentionManagerId',
  'retentionManager',
  'vipManagerId',
  'vipManager',
  'closerManagerId',
  'closerManager',
  'id',
].map((el, i) => (
  {
    title: el.toUpperCase(),
    order: i,
    field: el,
    isExpandable: i === 0,
    render: /* Math.random() > 0.3 ? */ null/* : returnOne */,
    width: 200,
  }
));


storiesOf('Grid', module)
  .add(' default', () => (
    <Grid
      columns={ columns }
      rows={ mockRows }
    />
  )).add('Themed', () => (
    <Grid
      columns={ columns }
      rows={ mockRows }
      theme={ mockTheme }
    />
  )).add('WithWrapper', () => (
    <Div>
      <Grid
        columns={ columns }
        rows={ mockRows }
      />
    </Div>
  ));
