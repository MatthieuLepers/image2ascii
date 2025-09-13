import { createApp } from 'vue';

import App from '@/App.vue';
import router from '@/plugins/router';
import i18n from '@/plugins/i18n';
import GenerateModifiers from '@/plugins/GenerateModifiers';
import DateFormat from '@/plugins/DateFormat';

const app = createApp(App);

app.directive('click-outside', {
  beforeMount(el: any, binding: any) {
    el.clickOutsideHandler = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideHandler);
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideHandler);
    delete el.clickOutsideHandler;
  },
});

app.directive('icon', {
  created(el, binding) {
    el.classList.add(`icon-${binding.arg}`);
  },
});

app.use(router);
app.use(i18n);
app.use(GenerateModifiers);
app.use(DateFormat);
app.mount('#app');
