import { storiesOf } from '@storybook/react';
import React from 'react';

import {
  TrackerWrapperForButton,
  useAnalyticsDispatch,
  EventParams,
  createAnalyticsMiddleware,
  analyticsStore,
  AnalyticsProvider,
  initAnalytics,
} from '@xcritical/analytics';
import Button from '@xcritical/button';

storiesOf('Analytics', module)
  .add('Button wrapper', () => {
    const ButtonWithAnalytics = TrackerWrapperForButton(Button);

    return (
      <ButtonWithAnalytics
        conversion="conversion_name"
        analyticsParams={{ analyticParam: 'param_value' }}
        onClick={() => {}}>
        send data to analytics
      </ButtonWithAnalytics>
    );
  })
  .add('EventParams type', () => {
    type EventParams<
      T extends { [actionType: string]: string | boolean | number }
    > = T | 'payload';

    return null;
  })
  .add('Anlytics dispatch', () => {
    type AppConversions = 'download_video' | 'print_document';

    type AppParams = EventParams<{
      videoTitle: string;
      documentFormat: string;
      contentAuthor: string;
    }>;

    type AppEvents = {
      conversion: AppConversions;
      analyticsParams?: Partial<AppParams>;
    };

    const analyticsDispatch = useAnalyticsDispatch<AppEvents>();

    const callback = () => {
      // any code
      analyticsDispatch({
        conversion: 'download_video',
        analyticsParams: {
          contentAuthor: 'author_name',
        },
      });
    };

    return <Button onClick={callback}>send data to analytics</Button>;
  })
  .add('Middleware', () => {
    type AppConversions = 'download_video' | 'print_document';

    type AppParams = EventParams<{
      videoTitle: string;
      documentFormat: string;
      contentAuthor: string;
    }>;

    type AppEvents = {
      conversion: AppConversions;
      analyticsParams?: Partial<AppParams>;
    };

    type EventMap = { [actionType: string]: AppEvents };

    /* matching app action types to analytics events */
    const eventMap: EventMap = {
      DO_NOT_SEND_PAYLOAD_TO_ANALYTICS: {
        conversion: 'print_document',
        analyticsParams: {
          contentAuthor: 'author_name',
        },
      },
      SEND_PAYLOAD_TO_ANALYTICS: {
        conversion: 'download_video',
        analyticsParams: 'payload',
      },
    };

    /* put this into applyMiddleware in your store */
    createAnalyticsMiddleware(eventMap);

    return null;
  })
  .add('Dispatch in side effects', () => {
    /* import { analyticsStore } from '@xcritical/analytics'; */

    analyticsStore.eventDispatch({
      conversion: 'conversion_name',
      analyticsParams: {
        paramName: 'param_value',
      },
    });

    analyticsStore.analyticsDispatch({
      APIMethod: 'CREATE',
      actionParams: {
        serviceName: 'google',
        serviceId: 'G-6Y1094F443XZ1',
      },
    });

    return null;
  })
  .add('Provider', () => {
    const App = () => <></>;

    return (
      <>
        {/* initialization via provider */}
        <AnalyticsProvider
          initSettings={{
            serviceIds: {
              google: 'G-236J3ZP12',
            },
          }}>
          <App />
        </AnalyticsProvider>

        {/* initialization in side effects */}
        <AnalyticsProvider>
          <App />
        </AnalyticsProvider>
      </>
    );
  })
  .add('Initialization in side effects', () => {
    /* import { initAnalytics } from '@xcritical/analytics'; */
    initAnalytics({
      serviceIds: {
        google: 'G-236J3ZP12',
      },
    });

    return null;
  });
