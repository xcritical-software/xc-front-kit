import React, { ReactElement } from 'react';
import ChartLineIcon from 'mdi-react/ChartLineIcon';
import BookIcon from 'mdi-react/BookIcon';
import SecurityIcon from 'mdi-react/SecurityIcon';
import AccountCircleIcon from 'mdi-react/AccountCircleIcon';
import CreditCardIcon from 'mdi-react/CreditCardIcon';
import EarthIcon from 'mdi-react/EarthIcon';
import BookOpenOutlineIcon from 'mdi-react/BookOpenOutlineIcon';


const AffiliatesPage = (): ReactElement => <div style={ { width: '100vw', height: '100vh', backgroundColor: 'rgb(30,230,30)' } }>Affiliates page</div>;
const LandingsPage = (): ReactElement => <div style={ { width: '100vw', height: '100vh', backgroundColor: 'rgb(30,230,30)' } }>Landings page</div>;
const StartPage = (): ReactElement => <div style={ { width: '100vw', height: '100vh', backgroundColor: 'rgb(30,130,130)' } }>Start page</div>;

const ManagersPage = (): ReactElement => <div style={ { width: '100vw', height: '100vh', backgroundColor: 'rgb(230,30,30)' } }>Managers page</div>;
const RolesPage = (): ReactElement => <div style={ { width: '100vw', height: '100vh', backgroundColor: 'rgb(30,130,30)' } }>Roles page</div>;
const PayoutsPage = (): ReactElement => <div style={ { width: '100vw', height: '100vh', backgroundColor: 'rgb(100,230,30)' } }>Payouts page</div>;
const RedirectPage = (): ReactElement => <div style={ { width: '100vw', height: '100vh', backgroundColor: 'rgb(30,30,130)' } }>Redirect page</div>;
const FailedPage = (): ReactElement => <div style={ { width: '100vw', height: '100vh', backgroundColor: 'rgb(30,30,230)' } }>Failed page</div>;
const LeadsPage = (): ReactElement => <div style={ { width: '100vw', height: '100vh', backgroundColor: 'rgb(130,130,30)' } }>Leads page</div>;


export const routerConfig = [
  {
    path: '/',
    exact: true,
    title: 'Start Dashboard',
    Icon: ChartLineIcon,
    component: StartPage,
  },
  {
    path: '/affiliates',
    exact: true,
    title: 'Affiliates Dashboard',
    Icon: ChartLineIcon,
    component: AffiliatesPage,
  },
  {
    path: '/landings',
    exact: true,
    title: 'Landings Dashboard',
    Icon: BookIcon,
    component: LandingsPage,
  },
  {
    path: '/managers',
    exact: true,
    title: 'Managers Dashboard',
    Icon: AccountCircleIcon,
    component: ManagersPage,
  },
  {
    path: '/roles',
    exact: true,
    title: 'Roles Dashboard',
    Icon: SecurityIcon,
    component: RolesPage,
  },
  {
    path: '/payouts',
    exact: true,
    title: 'Payouts Dashboard',
    Icon: CreditCardIcon,
    component: PayoutsPage,
  },
  {
    path: '/redirect-domains',
    exact: true,
    title: 'Redirect Domains Dashboard',
    Icon: EarthIcon,
    inMenu: true,
    component: RedirectPage,
  },
  {
    path: '/failed-attempts-logs',
    exact: true,
    title: 'Failed Attempts Dashboard',
    Icon: BookOpenOutlineIcon,
    component: FailedPage,
  },
  {
    path: '/leads',
    exact: true,
    title: 'Leads Dashboard',
    Icon: AccountCircleIcon,
    component: LeadsPage,
  },
  {
    path: '/',
    exact: true,
    title: 'Start Dashboard',
    Icon: ChartLineIcon,
    component: StartPage,
  },
  {
    path: '/affiliates',
    exact: true,
    title: 'Affiliates Dashboard',
    Icon: ChartLineIcon,
    component: AffiliatesPage,
  },
  {
    path: '/landings',
    exact: true,
    title: 'Landings Dashboard',
    Icon: BookIcon,
    component: LandingsPage,
  },
  {
    path: '/managers',
    exact: true,
    title: 'Managers Dashboard',
    Icon: AccountCircleIcon,
    component: ManagersPage,
  },
  {
    path: '/roles',
    exact: true,
    title: 'Roles Dashboard',
    Icon: SecurityIcon,
    component: RolesPage,
  },
  {
    path: '/payouts',
    exact: true,
    title: 'Payouts Dashboard',
    Icon: CreditCardIcon,
    component: PayoutsPage,
  },
  {
    path: '/redirect-domains',
    exact: true,
    title: 'Redirect Domains Dashboard',
    Icon: EarthIcon,
    inMenu: true,
    component: RedirectPage,
  },
  {
    path: '/failed-attempts-logs',
    exact: true,
    title: 'Failed Attempts Dashboard',
    Icon: BookOpenOutlineIcon,
    component: FailedPage,
  },
  {
    path: '/leads',
    exact: true,
    title: 'Leads Dashboard',
    Icon: AccountCircleIcon,
    component: LeadsPage,
  },
];
