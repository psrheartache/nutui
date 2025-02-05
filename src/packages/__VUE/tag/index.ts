import Tag from './tag.vue';
import type { ComponentPublicInstance } from 'vue';
import { withInstall } from '@/packages/utils';

withInstall(Tag);

export type { TagProps } from './tag.vue';

export type { TagType } from './types';

export type TagInstance = ComponentPublicInstance & InstanceType<typeof Tag>;

export { Tag, Tag as default };
