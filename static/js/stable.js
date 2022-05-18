navigator["language"]["indexOf"]('zh') != -1 ? targetLanguage = 0 : targetLanguage = 1;

window["onload"] = function () {
  su["init"]();
};

SimUI_UpdateID = 45;
su = {
  'showBrowserTips': function (_0x40cb9e) {
    su["startLoading"]();
    fetch("https://ui.simsoft.top/plaintext/" + _0x40cb9e + ".txt?random=" + Math["random"]())["then"](function (_0x35a9f1) {
      return _0x35a9f1["text"]();
    })["then"](function (_0x510bfb) {
      let _0x5d989f = document["createElement"]("div");

      _0x5d989f["innerHTML"] = _0x510bfb;
      document["body"]["appendChild"](_0x5d989f);
      su["closeDialog"]("#loadingDialog", true);
      su["openDialog"]("#SimUI_BrowserTips");
    })["catch"](function (_0x32864f) {
      su["closeDialog"]("#loadingDialog", true);
      su["notice"]("建立连接时遇到未知问题，请更换网络环境再试。", '错误');
    });
  },
  'check': function () {
    var _0x6cf805 = false,
        _0x4de834 = navigator["userAgent"]["toLowerCase"]()["split"](" ");

    for (count = 0; count < _0x4de834["length"]; count += 1) {
      el = _0x4de834[count];

      if (el["indexOf"]("chrome/") != -1) {
        _0x6cf805 = true;
        version = el["substr"]("chrome/"["length"], el["length"] - el["indexOf"]("chrome/"))["split"]('.')[0];
        !localStorage["getItem"]("skipOldNotice") && version < 96 && su["showBrowserTips"]("old");
        break;
      } else {
        if (el["indexOf"]("firefox/") != -1) {
          _0x6cf805 = true;
          core_version = el["substr"]("firefox/"["length"], el["length"] - el["indexOf"]("firefox/"))["split"]('.')[0];
          version < 90 && su["showBrowserTips"]("old");
          break;
        } else {
          if (el["indexOf"]("trident/") != -1 || el["indexOf"]("msie") != -1) {
            _0x6cf805 = true;
            location = "https://ui.simsoft.top/html/browser";
            break;
          } else {
            if (el["indexOf"]("safari/") != -1) {
              _0x6cf805 = true;
              !localStorage["getItem"]("skipSafariNotice") && su["showBrowserTips"]("safari");
              break;
            }
          }
        }
      }
    }

    !_0x6cf805 && (location = "https://ui.simsoft.top/html/browser");
  },
  'init': function () {
    su["check"]();
    fetch("https://simsoft.top/verify/dmlock.php?url=" + location["href"])["then"](function (_0x39c177) {
      return _0x39c177["text"]();
    })["then"](function (_0x2fe598) {
      _0x2fe598 != '' && (location = _0x2fe598);
    })["catch"](function (_0x30a9fe) {
      fetch("https://ui.simsoft.top/verify/?url=" + location["href"])["then"](function (_0x5961c7) {
        return _0x5961c7["text"]();
      })["then"](function (_0x460b68) {
        _0x460b68 != '' && (location = _0x460b68);
      })["catch"](function (_0x598226) {
        alert(su["nativeTransl"]("verifyErr") + "\n" + _0x598226);
        location = "about:blank";
      });
    });
    menuOpened = false;
    msgTimeout = null;

    document["body"]["onclick"] = function () {
      su["closeMenu"]();
    };

    document["body"]["onkeyup"] = function (_0x17f701) {
      _0x17f701["keyCode"] == 13 && document["querySelector"]("*:focus") && document["querySelector"]("*:focus")["click"]();
    };

    document["getElementsByClassName"]("su-menuico")[0] && (document["getElementsByClassName"]("su-menuico")[0]["onclick"] = function () {
      su["toggleMenu"]();
    });
    matchMedia("(prefers-color-scheme: dark)")["matches"] && document["body"]["classList"]["add"]("dark");
    setTimeout("if(document.querySelector(\".su-switcher.focus\")){document.querySelector(\".su-switcher.focus\").click()}", 200);
    setTimeout(function () {
      document["body"]["classList"]["add"]("su-loaded");
    }, 210);
    window["SIMS_TRANSL"] && su["reloadMultiLanguage"]();
    console["log"]("%cSimUI v4.0-release" + SimUI_UpdateID + "%c© SimSoft", "padding:5px;background:orange;color:white", "padding:5px;background:#1e9fff;color:white;");
  },
  'toggleMenu': function () {
    event["stopPropagation"]();
    document["getElementById"]("menu") ? !menuOpened ? (menuOpened = true, document["getElementById"]("menu")["setAttribute"]("class", "su-menu open")) : (menuOpened = false, document["getElementById"]("menu")["setAttribute"]("class", "su-menu closed")) : su["warn"]("页面中无法找到有效的菜单元素");
  },
  'closeMenu': function () {
    document["getElementById"]("menu") ? menuOpened && (menuOpened = false, document["getElementById"]("menu")["setAttribute"]("class", "su-menu closed")) : su["warn"]("页面中无法找到有效的菜单元素");
  },
  'notice': function (_0x379618, _0x3c6d00) {
    let _0x584d09 = document["createElement"]("div");

    _0x584d09["setAttribute"]("class", "su-dialog open");

    _0x584d09["setAttribute"]('id', "noticeDialog");

    _0x584d09["setAttribute"]("role", "alertdialog");

    _0x584d09["setAttribute"]("aria-labelledby", "su-notice-title");

    _0x584d09["setAttribute"]("aria-describedby", "su-notice-content");

    !_0x3c6d00 && (_0x3c6d00 = su["nativeTransl"]("noticeTitle"));

    let _0x3ca90a = document["createElement"]("div");

    _0x3ca90a["innerHTML"] = "<div class=\"title\" id=\"su-notice-title\">" + _0x3c6d00 + "</div><div id=\"su-notice-content\" class=\"content\">" + _0x379618 + "<div style=\"height:0;overflow:hidden\">点击空格键以关闭对话框。</div></div><div class=\"btn su-btn\" onclick=\"su.closeDialog('#noticeDialog',true)\" aria-controls=\"form\">" + su["nativeTransl"]("noticeBtn") + "</div>";

    _0x584d09["appendChild"](_0x3ca90a);

    document["body"]["appendChild"](_0x584d09);

    let _0xf03849 = document["createElement"]("div");

    _0xf03849["setAttribute"]("class", "su-dialog-mask");

    document["body"]["appendChild"](_0xf03849);
    navigator["userAgent"]["indexOf"]("Chrome") != -1 ? document["getElementById"]("noticeDialog")["style"]["height"] = "fit-content" : document["getElementById"]("noticeDialog")["style"]["height"] = _0x3ca90a["scrollHeight"] + 40 + 'px';

    document["onkeydown"] = function (_0x583a06) {
      _0x583a06["keyCode"] == 32 && (su["closeDialog"]("#noticeDialog", true), document["onkeydown"] = null);
    };
  },
  'startLoading': function () {
    let _0x248325 = document["createElement"]("div");

    _0x248325["setAttribute"]("class", "su-dialog open");

    _0x248325["setAttribute"]('id', "loadingDialog");

    let _0x517f52 = document["createElement"]("div");

    _0x517f52["innerHTML"] = "<div class=\"su-loading\"></div>";

    _0x248325["appendChild"](_0x517f52);

    document["body"]["appendChild"](_0x248325);

    let _0x68cb74 = document["createElement"]("div");

    _0x68cb74["setAttribute"]("class", "su-dialog-mask");

    document["body"]["appendChild"](_0x68cb74);
    document["getElementById"]("loadingDialog")["style"]["height"] = "70px";
    document["getElementById"]("loadingDialog")["style"]["width"] = "70px";
  },
  'openDialog': function (_0x285f63) {
    let _0x41af7b = document["querySelector"](_0x285f63);

    if (_0x41af7b) {
      _0x41af7b["style"] = '';

      _0x41af7b["setAttribute"]("class", "su-dialog open");

      _0x41af7b["setAttribute"]("role", "alertdialog");

      let _0x487e6a = document["createElement"]("div");

      _0x487e6a["setAttribute"]("class", "su-dialog-mask");

      document["body"]["appendChild"](_0x487e6a);
      navigator["userAgent"]["indexOf"]("Chrome") != -1 ? _0x41af7b["style"]["height"] = "fit-content" : _0x41af7b["style"]["height"] = _0x41af7b["childNodes"][3]["scrollHeight"] + 110 + 'px';

      document["onkeydown"] = function (_0x5c3824) {
        _0x5c3824["keyCode"] == 32 && (su["closeDialog"](_0x285f63), document["onkeydown"] = null);
      };
    } else {
      su["warn"]("选择器" + _0x285f63 + "对应的元素不存在");
    }
  },
  'closeDialog': function (_0x1e85cf, _0x5cee9a) {
    let _0x1eb592 = document["querySelector"](_0x1e85cf);

    _0x1eb592 && document["getElementsByClassName"]("su-dialog-mask")[0] ? (document["getElementsByClassName"]("su-dialog-mask")[0]["style"] = "opacity:0;animation:maskFadeOut .3s;", _0x1eb592["setAttribute"]("class", "su-dialog closed"), setTimeout(function () {
      _0x1eb592["style"] = "display:none";
      _0x5cee9a && _0x1eb592["remove"]();
      document["getElementsByClassName"]("su-dialog-mask")[0]["remove"]();
    }, 300)) : su["warn"]("选择器" + _0x1e85cf + "对应的元素不存在，或其对应的对话框未处于打开状态");
  },
  'switch': function (_0x181f8f, _0x9cffbf, _0xf2cc8a) {
    pixels = _0x9cffbf - 1;
    document["querySelector"](_0x181f8f)["style"] = "margin-left:-" + pixels + "00%";

    _0xf2cc8a["parentElement"]["querySelector"](".su-switcher.focus")["classList"]["remove"]("focus");

    _0xf2cc8a["parentElement"]["querySelector"](".su-switcher:nth-child(" + _0x9cffbf + ')')["classList"]["add"]("focus");

    _0xf2cc8a["parentElement"]["parentElement"]["querySelector"](".su-pageswitch-box") && (_0xf2cc8a["parentElement"]["parentElement"]["querySelector"](".su-pageswitch-box")["style"]["height"] = _0xf2cc8a["parentElement"]["parentElement"]["querySelector"](".su-pageswitch-box .su-pageswitch:nth-child(" + _0x9cffbf + ')')["scrollHeight"] + 'px');
  },
  'msg': function (_0x3e8d89, _0x4e2c5c, _0x187425) {
    su["stopMsg"]();

    let _0x33d459 = document["createElement"]("div");

    _0x33d459["classList"]["add"]("su-msg");

    _0x33d459["innerText"] = _0x3e8d89;
    !_0x187425 && (_0x33d459["onclick"] = function () {
      su["stopMsg"]();
    });

    if (!_0x4e2c5c) {
      var _0x4e2c5c = 2000;
    }

    msgTimeout = setTimeout(function () {
      su["stopMsg"]();
    }, _0x4e2c5c);
    document["body"]["appendChild"](_0x33d459);
  },
  'stopMsg': function () {
    if (document["getElementsByClassName"]("su-msg")[0]) {
      msgTimeout && (clearTimeout(msgTimeout), msgTimeout = null);
      let _0x496415 = document["getElementsByClassName"]("su-msg")[0];

      _0x496415["classList"]["add"]("fadeout");

      setTimeout(function () {
        _0x496415["remove"]();
      }, 200);
    }
  },
  'reloadMultiLanguage': function () {
    document["querySelectorAll"]('*')["forEach"](su["applyMultiLanguage"]);
  },
  'applyMultiLanguage': function (_0x16b6a) {
    if (_0x16b6a["getAttribute"]("data-sims-transl")) {
      let _0x390030 = _0x16b6a["getAttribute"]("data-sims-transl");

      SIMS_TRANSL[_0x390030] ? _0x16b6a["getAttribute"]("data-sims-transl-html") == '1' ? _0x16b6a["innerHTML"] = SIMS_TRANSL[_0x390030][targetLanguage] : _0x16b6a["innerText"] = SIMS_TRANSL[_0x390030][targetLanguage] : su["warn"]("找不到翻译ID " + _0x390030 + "对应的文案");
    }
  },
  'transl': function (_0xd44f35) {
    return SIMS_TRANSL[_0xd44f35] ? SIMS_TRANSL[_0xd44f35][targetLanguage] : (su["warn"]("找不到翻译ID " + _0xd44f35 + "对应的文案"), '');
  },
  'nativeTransl': function (_0x5b21b0) {
    let _0x42ef26 = {
      'noticeTitle': ['提示', "Warning"],
      'noticeBtn': ['确定', 'OK'],
      'verifyErr': ["您当前无法连接到服务器，请稍后再试。", "Cannot connect to the server."]
    };
    return _0x42ef26[_0x5b21b0][targetLanguage];
  },
  'warn': function (_0xf3d162) {
    console["log"]("%cSimUI Warning%c" + _0xf3d162, "background:orange;color:white;padding:0 5px;", "padding-left:5px;");
  }
};