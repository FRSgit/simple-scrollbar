(function(w, d) {
  var raf = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.setImmediate || function(c) { return setTimeout(c, 0); };

  function initEl(el) {
    if (el.hasOwnProperty('data-simple-scrollbar')) return;
    Object.defineProperty(el, 'data-simple-scrollbar', new SimpleScrollbar(el));
  }

  function throttle (_fn, _timeout) {
    var timeoutId,
        timer = 0;

    return function (e) {
      clearTimeout(timeoutId);

      if (Date.now() > timer) {
        resolve(e);
      } else {
        timeoutId = setTimeout(
          resolve.bind(void 0, e),
          _timeout
        );
      }
    };

    /////

    function resolve (e) {
      _fn(e);
      timeoutId = void 0;
      timer = Date.now() + _timeout;
    }
  }

  // Mouse drag handler
  function dragDealer(el, context) {
    var dragHandler = drag;
    var lastPageY;

    el.addEventListener('mousedown', function(e) {
      lastPageY = e.pageY;
      el.classList.add('ss-grabbed');
      d.body.classList.add('ss-grabbed');

      w.addEventListener('mousemove', dragHandler);
      w.addEventListener('mouseup', stop);

      return false;
    });

    function drag(e) {
      var delta = e.pageY - lastPageY;
      lastPageY = e.pageY;

      raf(function() {
        context.el.scrollTop += delta / context.scrollRatio;
      });
    }

    function stop() {
      el.classList.remove('ss-grabbed');
      d.body.classList.remove('ss-grabbed');
      w.removeEventListener('mousemove', dragHandler);
      w.removeEventListener('mouseup', stop);
    }
  }

  // Constructor
  function ss(el) {
    var self = this;

    self.target = el;
    
    self.bar = '<div class="ss-scroll">';

    self.el = d.createElement('div');
    self.el.setAttribute('class', 'ss-content');

    while (self.target.firstChild) {
      self.el.appendChild(self.target.firstChild);
    }
    self.target.appendChild(self.el);

    self.target.insertAdjacentHTML('beforeend', self.bar);
    self.bar = self.target.lastChild;

    dragDealer(self.bar, self);
    self.moveBar();

    self.el.addEventListener('scroll', throttle(self.moveBar.bind(self), 30));
    self.el.addEventListener('mouseenter', self.moveBar.bind(self));

    self.target.classList.add('ss-container');
  }

  ss.prototype = {
    moveBar: function(e) {
      var self = this,
          totalHeight = self.el.scrollHeight,
          ownHeight = self.el.clientHeight;

      self.scrollRatio = ownHeight / totalHeight;

      raf(function() {
        // Hide scrollbar if no scrolling is possible
        if(self.scrollRatio >= 1) {
          self.target.classList.add('ss-hidden');
        } else {
          self.target.classList.remove('ss-hidden');
          self.bar.style.cssText = 'height:' + (self.scrollRatio) * 100 + '%; top:' + (self.el.scrollTop / totalHeight ) * 100 + '%;';
        }
      });
    }
  }

  ss.initEl = initEl;

  w.SimpleScrollbar = ss;
})(window, document);
