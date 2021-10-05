import { storiesOf } from '@storybook/react';
import React from 'react';

import {
  TrackerWrapperForButton,
  useAnalyticsDispatch,
  EventParams,
  createAnalyticsMiddleware,
  analyticsStore,
  AnalyticsProvider,
} from '@xcritical/analytics';
import Button from '@xcritical/button';

storiesOf('Analytics', module)
  .add('Button wrapper', () => {
    const ButtonWithAnalytics = TrackerWrapperForButton(Button);

    return (
      <ButtonWithAnalytics
        conversion="conversion_name"
        analyticsParams={{ analytics_param: 'param_value' }}
        onClick={() => {}}>
        send data to analytics
      </ButtonWithAnalytics>
    );
  })
  .add('EventParams type', () => {
    type EventParams<T extends { [eventParam: string]: string }> =
      | T
      | 'payload';

    return null;
  })
  .add('Anlytics dispatch', () => {
    type AppConversions = 'download_video' | 'print_document';

    type AppParams = EventParams<{
      ['video_title']: string;
      ['document_format']: string;
      ['content_author']: string;
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
          content_author: 'author_name',
        },
      });
    };

    return <Button onClick={callback}>send data to analytics</Button>;
  })
  .add('Middleware', () => {
    type AppConversions = 'download_video' | 'print_document';

    type AppParams = EventParams<{
      ['video_title']: string;
      ['document_format']: string;
      ['content_author']: string;
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
          content_author: 'author_name',
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
  .add('In side effects', () => {
    /* import { analyticsStore } from '@xcritical/analytics'; */

    analyticsStore.analyticsDispatch({
      APIMethod: 'TRY_CALL_EVENT',
      actionParams: {
        conversion: 'conversion_name',
        analyticsParams: {
          param_name: 'param_value',
        },
      },
    });

    return null;
  })
  .add('Provider', () => {
    const App = () => <></>;

    return (
      <AnalyticsProvider
        initSettings={{
          serviceIds: {
            google: 'G-236J3ZP12',
            yandex: 'YA-63GV018JKJ78',
          },
        }}>
        <App />
      </AnalyticsProvider>
    );
  });
