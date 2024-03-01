import ElementSet from 'polaris-starter/services/element-set';

import { Modifier } from '../lib/modifier.js';

export default Modifier(({ service, on }) => {
  const elementSet = service(ElementSet);

  return (element, { id }: { id: string }) => {
    elementSet.add(element, id);

    on.cleanup(() => void elementSet.remove(element));
  };
});
