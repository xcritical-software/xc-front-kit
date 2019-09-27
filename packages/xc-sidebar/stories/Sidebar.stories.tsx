import React  from 'react';
import { MdiReactIconComponentType } from 'mdi-react'
import { storiesOf } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';
import { Sidebar } from '../src';
import { NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';
import { routerConfig } from '../src/routerConfig';
import { sidebarThemeNamespace } from '../src/theme';


const list = (n: number) => {
  return (
    <div  >
      <ul style={{ listStyleType: 'none' }} >
        {new Array(n).fill(true).map((el, i) => (
          <li 
            key={i}
            style={{ padding: '10px 10px 10px 10px' }}
          >This is list item number {i}</li>
        ))}
      </ul>
    </div>
  )
}
const SidebarNavigate = styled.div`
  padding-bottom: 60px;
  flex-grow: 1;
  flex-shrink: 1;
  
  a {
    position: relative;
    display: block;
    text-align: center;
    margin-bottom: 15px;
    padding: 5px 0;
    fill: white;
  }

  a:hover { 
    ::before {
      content: " ";
      height: 100%;
      width: 2px;
      position: absolute;
      background-color: blue;
      left: 0;
    }
  }

  &__item_active::before {
    content: " ";
    height: 100%;
    width: 2px;
    position: absolute;
    background-color: blue;
    left: 0;
  }

  svg {
    display: inline-block;
    fill: white;    
    margin: 5px 0;
  }

  span {
    font-size: 13px;
    font-weight: 500;
    color: white;    
    display: block;
  }
`;

const NavPanelWrapper = styled.div`
  background-color: #31394C;
  min-height: 100%;
  width: 90px;
  border-right: 1px solid #47536C;
`
const NavPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`
const NavPanelLogo = styled.div`
  height: 90px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface IrouterConfig {
  path: string,
  exact: boolean,
  title: string,
  Icon: MdiReactIconComponentType
}

const NavPanel = () => (
  <NavPanelWrapper>
    <NavPanelContent>
      <NavPanelLogo>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#FD5200" height="50" viewBox="0 0 83.93 83.37">
          <title>XCritical_logo_Mini</title>
          <path
            className="cls-1"
            d="M123.38,42.47a24.86,24.86,0,0,0-4.61-7.78L107.16,53,125.6,82.33a20.18,20.18,0,0,0-2.22-39.86"
            transform="translate(-57.78 -12.53)"
          />
          <path
            className="cls-1"
            d="M80.52,34.92a24.85,24.85,0,0,0-4.41,7.55A20.18,20.18,0,0,0,73.9,82.34L92.11,53.48Z"
            transform="translate(-57.78 -12.53)"
          />
          <path
            className="cls-1"
            d="M93.28,31.37l6.46,11.76,8.79-15.6a25.09,25.09,0,0,0-8.79-1.64,24.56,24.56,0,0,0-5.66.67l-11.27-14Z"
            transform="translate(-57.78 -12.53)"
          />
          <polygon
            className="cls-1"
            points="52.38 70.27 52.42 70.27 41.96 51.51 30.9 70.27 48.29 70.27 59.56 83.37 52.38 70.27"
          />
        </svg>
      </NavPanelLogo>
      <SidebarNavigate>
    {routerConfig.map(({ path, exact, title, Icon }: IrouterConfig, i) => (
      <NavLink
      to={ path }
      exact={ exact }
      key={i}
      >
        <Icon />
        <span>{ title }</span>
        </NavLink>
    )) }
    </SidebarNavigate>
    </NavPanelContent>
  </NavPanelWrapper>
);


const theme = {
  [sidebarThemeNamespace]: {
    appearance: {
      rightBackground: 'red',
      default: {
        minWidth : 30,
        maxWidth : 400,
        separatorColor : 'lightblue',
        leftWidth : 91,
        color: 'white',
        leftBackground: '#31394C',
        rightBackground: '#31394C'
      },
      theme2: {
        minWidth : 130,
        maxWidth : 700,
        separatorColor : 'red',
        leftWidth : 100,
        color: 'green',
        leftBackground: 'pink',
        rightBackground: 'pink'
      },
    }
  },
};


const props = {
  navComponent: NavPanel(),
  alwaysShowScrollbar: false
};


storiesOf('Sidebar', module)
.add('Basic', () => (
    <ThemeProvider theme={theme}>
      <BrowserRouter>  
        <Sidebar { ...props } theme={theme} >
          { list(100) }
        </Sidebar>
       <Switch>
         {routerConfig.map(({ path, component, exact }: any) => {
           return <Route  key={path} path={path}  component={component} exact={exact}></Route>
          }
          )}
       </Switch>
      </BrowserRouter> 
    </ThemeProvider>
  ))

  