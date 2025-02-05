import Price from './price.vue';
import type { ComponentPublicInstance } from 'vue';
import { withInstall } from '@/packages/utils';

withInstall(Price);

export type { PriceProps } from './price.vue';

export type { PriceSize, PricePosition } from './types';

export type PriceInstance = ComponentPublicInstance & InstanceType<typeof Price>;

export { Price, Price as default };
