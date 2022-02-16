import {
  IClickEventWrapper,
  IEmptyInstance,
  IServiceInstance,
  WrapperForServiceInstance,
} from '../types';

const emptyInnnerInstance: IEmptyInstance = {};

export function emptyInstance(): IServiceInstance<IEmptyInstance> {
  return {
    id: '',
    type: 'empty',
    instance: emptyInnnerInstance,
    async initialize() {
      // empty implementation
    },
    event(unmappedParams: IClickEventWrapper) {
      this.buffer.push(function (this: WrapperForServiceInstance) {
        this.event(unmappedParams);
      });
    },
    pageView(url: string) {
      this.buffer.push(function (this: WrapperForServiceInstance) {
        this.pageView(url);
      });
    },
    activateEventAndPageView() {
      // empty implementation
    },
    buffer: [],
  };
}
