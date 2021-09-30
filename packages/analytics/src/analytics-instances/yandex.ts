import {
  IClickEventWrapper,
  IEmptyInstance,
  IServiceInstance,
  IYandexEvent,
  IYandexPackage,
} from '../types';

export function yandexInstanceConstructor(
  emptyInstance: IServiceInstance<IEmptyInstance>,
  id: string
): IServiceInstance<IYandexPackage> {
  const serviceInstance: IYandexPackage = {
    post: (_params: IYandexEvent) => {},
  }; // mocked initialization of yandex service

  return {
    id,
    type: 'withAPI',
    instance: serviceInstance,
    async initialize() {},
    buffer: emptyInstance.buffer,
    event({ action, category, label }: IClickEventWrapper) {
      this.instance?.post({
        name: action,
        type: category,
        conditions: [label || ''],
      });
    },
    pageView(url: string) {
      this.instance.post(url);
    },
    activateEventAndPageView() {},
  };
}
