import GA4React from 'ga-4-react';
import { GA4ReactResolveInterface } from 'ga-4-react/dist/models/gtagModels';

import { IClickEventWrapper, IEmptyInstance, IServiceInstance } from '../types';
export function googleInstanceConstructor(
  emptyInstance: IServiceInstance<IEmptyInstance>,
  googleId: string
): IServiceInstance<GA4React | GA4ReactResolveInterface> {
  const serviceInstance: GA4React = new GA4React(googleId);

  return {
    id: googleId,
    type: 'withAPI',
    instance: serviceInstance,
    async initialize() {
      return (this.instance as GA4React).initialize();
    },
    buffer: emptyInstance.buffer,
    event({ conversion, analyticsParams }: IClickEventWrapper) {
      this.buffer.push(function (this: IServiceInstance<GA4React>) {
        this.instance.gtag('event', conversion, analyticsParams);
      });
    },
    pageView(url: string) {
      this.buffer.push(function (this: IServiceInstance<GA4React>) {
        this.instance.pageview(url);
      });
    },
    activateEventAndPageView() {
      this.event = ({ conversion, analyticsParams }: IClickEventWrapper) => {
        this.instance.gtag('event', conversion, analyticsParams);
      };
      this.pageView = (url: string) => {
        this.instance.pageview(url);
      };
    },
  };
}
