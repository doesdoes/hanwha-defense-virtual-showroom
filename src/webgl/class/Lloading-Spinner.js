let instance;
export class LoadingSpinner {
  constructor() {
      if(instance) return instance
      this.element = null;
      this._init();
      instance = this
  }
  _init() {
      this.appendApp();
  }
  template() {
      return `
          <div class="loading-spinner-wrapper">
              <div class="loading-spinner-bg"></div>
              <div class="loading-spinner-ring">
                  <div class="loading-spinner-ring-parts"></div>
                  <div class="loading-spinner-ring-parts"></div>
                  <div class="loading-spinner-ring-parts"></div>
                  <div class="loading-spinner-ring-parts"></div>
                  <div class="loading-spinner-ring-parts"></div>
              </div>
          </div>
      `
  }
  appendApp() {
      const fragment = document.createElement('div');
      fragment.innerHTML = this.template();
      const target = fragment.children[0];
      document.body.appendChild(target);
      this.element = target;
  }
  show() {
      this.element.style.opacity = 1;
      this.element.style.pointerEvents = 'all';
  }
  hide() {
      this.element.style.opacity = 0;
      this.element.style.pointerEvents = 'none';
  }
}