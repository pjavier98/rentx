import { IDateProvider } from 'shared/container/providers/dateProvider/IDate.provider';
import { DayJSDateProvider } from 'shared/container/providers/dateProvider/implementations/dayjs.dateProvider';
import { container } from 'tsyringe';

container.registerSingleton<IDateProvider>('DateProvider', DayJSDateProvider);
