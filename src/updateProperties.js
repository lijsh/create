export const updateProperties = (dom, key, value) => {
  if (typeof value == 'function' && key.startsWith('on')) {
    const eventType = key.slice(2).toLowerCase();
    dom._$handlers = dom._$handlers || {};
    dom.removeEventListener(eventType, dom._$handlers[eventType]);
    dom._$handlers[eventType] = value;
    dom.addEventListener(eventType, dom._$handlers[eventType]);
  } else if (key == 'checked' || key == 'value' || key == 'className') {
    dom[key] = value;
  } else if (key == 'style' && typeof value == 'object') {
    Object.assign(dom.style, value);
  } else if (key == 'key') {
    dom._$key = value;
  } else if (typeof value != 'object' && typeof value != 'function') {
    dom.setAttribute(key, value);
  }
};