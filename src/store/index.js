import Tinax from '@tinajs/tinax'

import work from './modules/work'
import user from './modules/user'

export const tinax = new Tinax({
  modules: {
    work,
    user,
  },
});

// for debug
global.tinax = tinax;
