import { mount } from '@vue/test-utils';
import { Uploader } from '@nutui/nutui';
import { nextTick, h } from 'vue';
import { Dongdong } from '@nutui/icons-vue';
import { sleep } from '@/packages/utils/unit';

const mockFile = new File([new ArrayBuffer(10000)], 'test.jpg', {
  type: 'test'
});

test('should render base uploader and type', async () => {
  const wrapper = mount(Uploader);
  const up_load = wrapper.find('.nut-uploader');
  expect(up_load.exists()).toBe(true);
  const up_load1 = wrapper.find('.nut-uploader__input');
  expect(up_load1.attributes().type).toBe('file');
});
test('should render base uploader props', async () => {
  const wrapper = mount(Uploader, {
    props: {
      'auto-upload': true,
      capture: true,
      name: 'files',
      accept: '.jpg',
      maximize: '1024 * 50',
      maximum: 2
    }
  });
  const toast = wrapper.find('.nut-uploader__input');
  expect(toast.attributes().capture).toBe('camera');
  expect(toast.attributes().name).toBe('files');
  expect(toast.attributes().accept).toBe('.jpg');
  expect(toast.exists()).toBe(true);
  toast.trigger('click');
  expect(wrapper.emitted('change'));
  const toast1 = wrapper.find('.nut-uploader__upload');
  expect(wrapper.emitted('oversize'));
  expect(toast1.exists()).toBe(true);
});
test('should render base uploader other props', async () => {
  const wrapper = mount(Uploader, {
    props: {
      'is-deletable': true,
      'file-list': [
        {
          name: '文件1.png',
          url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
          status: 'success',
          message: '上传成功',
          type: 'image'
        },
        {
          name: '文件2.png',
          url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
          status: 'error',
          message: '上传失败',
          type: 'image'
        },
        {
          name: '文件3.png',
          url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
          status: 'uploading',
          message: '上传中...',
          type: 'image'
        }
      ],
      headers: {},
      multiple: true,
      'is-preview': false,
      'upload-icon': h(Dongdong),
      'upload-icon-size': '20px'
    }
  });
  await nextTick();
  const toast4 = wrapper.find('.close');
  expect(toast4.exists()).toBe(true);
  toast4.trigger('click');
  expect(wrapper.emitted('delete')).toBeTruthy();
  const toast1 = wrapper.findAll('.nut-uploader__preview');
  expect(toast1.length).toBe(3);
  const toast2 = wrapper.find('.nut-uploader__preview-img__c');
  expect(toast2.exists()).toBe(true);
  toast2.trigger('click');
  expect(wrapper.emitted('fileItemClick')).toBeTruthy();
  expect(toast2.attributes().src).toBe(
    'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif'
  );
  const toast3 = wrapper.find('.nut-icon');
  expect(toast3.exists()).toBe(true);
  expect(toast3.html).toMatchSnapshot();
});
test('should render base uploader list', async () => {
  const wrapper = mount(Uploader, {
    props: {
      'upload-icon': 'dongdong',
      'list-type': 'list',
      'file-list': [
        {
          name: '文件1.png',
          url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
          status: 'success',
          message: '上传成功',
          type: 'image'
        },
        {
          name: '文件2.png',
          url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
          status: 'error',
          message: '上传失败',
          type: 'image'
        },
        {
          name: '文件3.png',
          url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
          status: 'uploading',
          message: '上传中...',
          type: 'image'
        }
      ]
    }
  });
  await nextTick();
  const toast3 = wrapper.find('.list');
  expect(toast3.exists()).toBe(true);
});

test('should render base uploader props disabled', async () => {
  const wrapper = mount(Uploader, {
    props: {
      disabled: true
    }
  });
  const up_load1 = wrapper.find('.nut-uploader__input');
  expect(up_load1.attributes().disabled).toBe('');
});

test('render preview image', async () => {
  const wrapper = mount(Uploader, {
    props: {
      modelValue: [
        { url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif' },
        { url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif' },
        { file: mockFile }
      ]
    }
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('before-delete prop return false', () => {
  const wrapper = mount(Uploader, {
    props: {
      fileList: [
        {
          name: '文件1.png',
          url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
          status: 'success',
          message: '上传成功',
          type: 'image'
        }
      ],
      isDeletable: true,
      beforeDelete: () => false
    }
  });
  wrapper.find('.nut-icon').trigger('click');
  expect(wrapper.emitted('delete')).toBeFalsy();
});
test('before-delete prop return true', () => {
  const wrapper = mount(Uploader, {
    props: {
      fileList: [
        {
          name: '文件1.png',
          url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
          status: 'success',
          message: '上传成功',
          type: 'image'
        }
      ],
      isDeletable: true,
      beforeDelete: () => true
    }
  });
  wrapper.find('.nut-icon').trigger('click');
  expect(wrapper.emitted('delete')).toBeTruthy();
});

test('before-delete prop resolved', async () => {
  const wrapper = mount(Uploader, {
    props: {
      fileList: [
        {
          name: '文件1.png',
          url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
          status: 'success',
          message: '上传成功',
          type: 'image'
        }
      ],
      isDeletable: true,
      beforeDelete: () => true
    }
  });

  wrapper.find('.nut-icon').trigger('click');
  await sleep();
  expect(wrapper.emitted('delete')).toBeTruthy();
});

test('before-delete prop rejected', async () => {
  const wrapper = mount(Uploader, {
    props: {
      fileList: [
        {
          name: '文件1.png',
          url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
          status: 'success',
          message: '上传成功',
          type: 'image'
        }
      ],
      isDeletable: true,
      beforeDelete: () => false
    }
  });

  wrapper.find('.nut-icon').trigger('click');
  await sleep();
  expect(wrapper.emitted('delete')).toBeFalsy();
});

// TODO: mock uploader trigger
test('multiFile upload filter max-size file', async () => {
  const wrapper = mount(Uploader, {
    props: {
      maxSize: 1000
    }
  });
  const smallFile = new File([new ArrayBuffer(100)], 'small.jpg');
  const input = wrapper.find<HTMLInputElement>('.nut-uploader__input');
  Object.defineProperty(input.element, 'files', {
    get: vi.fn().mockReturnValue([mockFile, smallFile])
  });
  // input.trigger('change');
  await sleep();
  // expect(wrapper.emitted<[File]>('oversize')![0]).toBeTruthy();
});

test('delete-icon prop', () => {
  const wrapper = mount(Uploader, {
    props: {
      deleteIcon: 'dongdong'
    }
  });

  expect(wrapper.html()).toMatchSnapshot();
});
