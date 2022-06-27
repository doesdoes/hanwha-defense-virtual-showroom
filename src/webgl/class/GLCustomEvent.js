export function sendGLCustomEvent(param) {
  let event = null;
  if (window.CustomEvent && typeof window.CustomEvent === 'function') {
    event = new CustomEvent('GLCustomEvent', {detail: {msg: param.msg, distance: param.distance}});
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent('GLCustomEvent', true, true, {detail: {msg: param.msg, distance: param.distance}});
  }

  window.dispatchEvent(event);
}