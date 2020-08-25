// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
 * @Author: your name
 * @Date: 2020-03-04 20:50:20
 * @LastEditTime: 2020-03-09 22:01:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /oneslide/css/main.js
 */
var $ = function $(s) {
  return document.querySelector(s);
};

var $$ = function $$(s) {
  return document.querySelectorAll(s);
};

var isMain = function isMain(str) {
  return /^#{1,2}(?!#)/.test(str);
};

var isSub = function isSub(str) {
  return /^#{3}(?!#)/.test(str);
};

var convert = function convert(raw) {
  var arr = raw.split(/\n(?=\s*#{1,3}[^#])/).filter(function (s) {
    return s != "";
  }).map(function (s) {
    return s.trim();
  });
  var html = '';

  for (var i = 0; i < arr.length; i++) {
    if (arr[i + 1] !== undefined) {
      if (isMain(arr[i]) && isMain(arr[i + 1])) {
        html += "\n<section data-markdown>\n<textarea data-template>\n".concat(arr[i], "\n</textarea>\n</section>\n");
      } else if (isMain(arr[i]) && isSub(arr[i + 1])) {
        html += "\n<section>\n<section data-markdown>\n<textarea data-template>\n".concat(arr[i], "\n</textarea>\n</section>\n");
      } else if (isSub(arr[i]) && isSub(arr[i + 1])) {
        html += "\n<section data-markdown>\n<textarea data-template>\n".concat(arr[i], "\n</textarea>\n</section>\n");
      } else if (isSub(arr[i]) && isMain(arr[i + 1])) {
        html += "\n<section data-markdown>\n<textarea data-template>\n".concat(arr[i], "\n</textarea>\n</section>\n</section>\n");
      }
    } else {
      if (isMain(arr[i])) {
        html += "\n<section data-markdown>\n<textarea data-template>\n".concat(arr[i], "\n</textarea>\n</section>\n");
      } else if (isSub(arr[i])) {
        html += "\n<section data-markdown>\n<textarea data-template>\n".concat(arr[i], "\n</textarea>\n</section>\n</section>\n");
      }
    }
  }

  return html;
};

var Menu = {
  init: function init() {
    console.log('Menu init...');
    this.$settingIcon = $('.control .icon-setting');
    this.$menu = $('.menu');
    this.$closeIcon = $('.menu .icon-close');
    this.$$tabs = $$('.menu .tab');
    this.$$contents = $$('.menu .content');
    this.bind();
  },
  bind: function bind() {
    var _this = this;

    this.$settingIcon.onclick = function () {
      _this.$menu.classList.add('open');
    };

    this.$closeIcon.onclick = function () {
      _this.$menu.classList.remove('open');
    };

    this.$$tabs.forEach(function ($tab) {
      return $tab.onclick = function () {
        _this.$$tabs.forEach(function ($node) {
          return $node.classList.remove('active');
        });

        $tab.classList.add('active');

        var index = _toConsumableArray(_this.$$tabs).indexOf($tab);

        _this.$$contents.forEach(function ($node) {
          return $node.classList.remove('active');
        });

        _this.$$contents[index].classList.add('active');
      };
    });
  }
};
var ImgUploader = {
  init: function init() {
    this.$fileInput = $('#img-uploader');
    this.$textarea = $('.editor textarea');
    AV.init({
      appId: "UqBaAsQMqOQB3rLwNGLTKtOF-gzGzoHsz",
      appKey: "uv9EyQmkgX7UjUt4TeVUBhVa",
      serverURLs: "https://uqbaasqm.lc-cn-n1-shared.com"
    });
    this.bind();
  },
  bind: function bind() {
    var self = this;

    this.$fileInput.onchange = function () {
      if (this.files.length > 0) {
        var localFile = this.files[0];
        console.log(localFile);

        if (localFile.size / 1048576 > 2) {
          alert('文件不能超过2M');
          return;
        }

        self.insertText("![\u4E0A\u4F20\u4E2D\uFF0C\u8FDB\u5EA60%]()");
        var avFile = new AV.File(encodeURI(localFile.name), localFile);
        avFile.save({
          keepFileName: true,
          onprogress: function onprogress(progress) {
            self.insertText("![\u4E0A\u4F20\u4E2D\uFF0C\u8FDB\u5EA6".concat(progress.percent, "%]()"));
          }
        }).then(function (file) {
          console.log('文件保存完成');
          console.log(file);
          var text = "![".concat(file.attributes.name, "](").concat(file.attributes.url, "?imageView2/0/w/800/h/400)");
          self.insertText(text);
        }).catch(function (err) {
          return console.log(err);
        });
      }
    };
  },
  insertText: function insertText() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var $textarea = this.$textarea;
    var start = $textarea.selectionStart;
    var end = $textarea.selectionEnd;
    var oldText = $textarea.value;
    $textarea.value = "".concat(oldText.substring(0, start)).concat(text, " ").concat(oldText.substring(end));
    $textarea.focus();
    $textarea.setSelectionRange(start, start + text.length);
  }
};
var Editor = {
  init: function init() {
    console.log('Editor init...');
    this.$editInput = $('.editor textarea');
    this.$saveBtn = $('.editor .button-save');
    this.$slideContainer = $('.slides');
    this.markdown = localStorage.markdown || "# one slide";
    this.bind();
    this.start();
  },
  bind: function bind() {
    var _this2 = this;

    this.$saveBtn.onclick = function () {
      localStorage.markdown = _this2.$editInput.value;
      location.reload();
    };
  },
  start: function start() {
    this.$editInput.value = this.markdown;
    this.$slideContainer.innerHTML = convert(this.markdown);
    Reveal.initialize({
      controls: true,
      progress: true,
      center: localStorage.align === 'left-top' ? false : true,
      hash: true,
      transition: localStorage.transition || 'slide',
      // none/fade/slide/convex/concave/zoom
      // More info https://github.com/hakimel/reveal.js#dependencies
      dependencies: [{
        src: 'plugin/markdown/marked.js',
        condition: function condition() {
          return !!document.querySelector('[data-markdown]');
        }
      }, {
        src: 'plugin/markdown/markdown.js',
        condition: function condition() {
          return !!document.querySelector('[data-markdown]');
        }
      }, {
        src: 'plugin/highlight/highlight.js'
      }, {
        src: 'plugin/search/search.js',
        async: true
      }, {
        src: 'plugin/zoom-js/zoom.js',
        async: true
      }, {
        src: 'plugin/notes/notes.js',
        async: true
      }]
    });
  }
};
var Theme = {
  init: function init() {
    this.$$figures = $$('.theme figure');
    this.$transition = $('.theme .transition');
    this.$align = $('.theme .align');
    this.$reveal = $('.reveal');
    this.bind();
    this.loadTheme();
  },
  bind: function bind() {
    var _this3 = this;

    this.$$figures.forEach(function ($figure) {
      return $figure.onclick = function () {
        _this3.$$figures.forEach(function ($item) {
          return $item.classList.remove('select');
        });

        $figure.classList.add('select');

        _this3.setTheme($figure.dataset.theme);
      };
    });

    this.$transition.onchange = function () {
      localStorage.transition = this.value;
      location.reload();
    };

    this.$align.onchange = function () {
      localStorage.align = this.value;
      location.reload();
    };
  },
  setTheme: function setTheme(theme) {
    localStorage.theme = theme;
    location.reload();
  },
  loadTheme: function loadTheme() {
    var theme = localStorage.theme || 'beige';
    var $link = document.createElement('link');
    $link.rel = 'stylesheet';
    $link.href = "css/theme/".concat(theme, ".css");
    document.head.appendChild($link); //$(`.theme figure[data-theme=${theme}]`)

    Array.from(this.$$figures).find(function ($figure) {
      return $figure.dataset.theme === theme;
    }).classList.add('select');
    this.$transition.value = localStorage.transition || 'slide';
    this.$align.value = localStorage.align || 'center';
    this.$reveal.classList.add(this.$align.value);
  }
};
var Print = {
  init: function init() {
    this.$download = $('.download');
    this.bind();
    this.start();
  },
  bind: function bind() {
    this.$download.addEventListener('click', function () {
      var $link = document.createElement('a');
      $link.setAttribute('target', '_blank');
      $link.setAttribute('href', location.href.replace(/#\/.*/, '?print-pdf'));
      $link.click();
    });

    window.onafterprint = function () {
      console.log('close');
      window.close();
    };
  },
  start: function start() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';

    if (window.location.search.match(/print-pdf/gi)) {
      link.href = 'css/print/pdf.css';
      window.print();
    } else {
      link.href = 'css/print/paper.css';
    }

    document.head.appendChild(link);
  }
};
var App = {
  init: function init() {
    Array.prototype.slice.call(arguments).forEach(function (Module) {
      return Module.init();
    });
  }
};
App.init(Menu, ImgUploader, Editor, Theme, Print);
},{}],"../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51465" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map