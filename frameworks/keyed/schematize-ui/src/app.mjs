
import set from '@schematize/instance.js/src/Instance/set.mjs';
import Collection_prototype_append from '@schematize/instance.js/src/Collection/append.mjs';
// import Collection_prototype_replace from '@schematize/instance.js/src/Collection/replace.mjs';

import {
  // dom
  append,

  // eventTarget 
  addEventListener,

  // customDom
  create as c,
  createText as ct,
  listen,
  repeat,
  SYMBOL_ALL_PROPERTIES,

} from '@schematize/ui.js/src/index.mjs';

const S_button = `button`;
const S_div = `div`;
const S_td = `td`;

const S_click = `click`;

const COL_SM_6_SMALLPAD = `col-sm-6 smallpad`;
const BUTTON_PRIMARY_BLOCK = `btn btn-primary btn-block`;

const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
const _random = (max) => {
  return Math.round(Math.random()*1000)%max;
};
let id = 1;
const buildData = (count = 1000) => {
  let data = [];
  for (var i = 0; i < count; i++) {
    data.push({
      id: id++,
      label: (
        adjectives[_random(adjectives.length)] + " " + 
        colours[_random(colours.length)] + " " + 
        nouns[_random(nouns.length)]
      )
    });
  }
  return data;
};

const scope = {
  data: [],
  selected: undefined,
  updateSelected: (s) => {

    // previous selected
    let selected = scope.selected;
    if (selected) {
      set(`isSelected`, false, selected);
    }

    // new selected
    set(`selected`, s, scope);
    if (s) {
      set(`isSelected`, true, s);
    }

  },
};
const app = c(S_div, null, {
  id: `main`,
}, (el) => [
  c(S_div, el, {
    className: `container`,
  }, (el) => [
    c(S_div, el, {
      className: `jumbotron`,
    }, (el) => [
      c(S_div, el, {
        className: `row`,
      }, (el) => [
        c(S_div, el, {
          className: `col-md-6`,
        }, (el) => [
          c(`h1`, el, {}, [`Schematize-ui-"keyed"`]),  
        ]),
        c(S_div, el, {
          className: `col-md-6`,
        }, (el) => [
          c(S_div, el, {
            className: `row`,
          }, (el) => [
            c(S_div, el, {
              className: COL_SM_6_SMALLPAD,
            }, (el) => [
              c(S_button, el, {
                id: `run`,
                type: S_button,
                className: BUTTON_PRIMARY_BLOCK,
              }, (el, _ = el._) => (
                addEventListener(el, S_click, () => {
                  // _.data = data;
                  set(`data`, buildData(), _);
                  _.updateSelected(undefined);
                }),
                [`Create 1,000 rows`]
              )),
            ]),
            c(S_div, el, {
              className: COL_SM_6_SMALLPAD,
            }, (el) => [
              c(S_button, el, {
                id: `runlots`,
                type: S_button,
                className: BUTTON_PRIMARY_BLOCK,
              }, (el, _ = el._) => (
                addEventListener(el, S_click, () => {
                  set(`data`, buildData(10000), _);
                  _.updateSelected(undefined);
                }),
                [`Create 10,000 rows`]
              )),
            ]),
            c(S_div, el, {
              className: COL_SM_6_SMALLPAD,
            }, (el) => [
              c(S_button, el, {
                id: `add`,
                type: S_button,
                className: BUTTON_PRIMARY_BLOCK,
              }, (el, _ = el._) => (
                addEventListener(el, S_click, () => {
                  Collection_prototype_append.call(_.data, ...buildData());
                }),
                [`Append 1,000 rows`]
              )),
            ]),
            c(S_div, el, {
              className: COL_SM_6_SMALLPAD,
            }, (el) => [
              c(S_button, el, {
                id: `update`,
                type: S_button,
                className: BUTTON_PRIMARY_BLOCK,
              }, (el, _ = el._) => (
                addEventListener(el, S_click, () => {
                  let data = _.data;
                  for (let i = 0, il = data.length; i < il; i+=10) {
                    let item = data[i];
                    set(`label`, item.label + ' !!!', item);
                  }
                  _.updateSelected(undefined);
                }),
                [`Update every 10th row`]
              )),
            ]),
            c(S_div, el, {
              className: COL_SM_6_SMALLPAD,
            }, (el) => [
              c(S_button, el, {
                id: `clear`,
                type: S_button,
                className: BUTTON_PRIMARY_BLOCK,
              }, (el, _ = el._) => (
                addEventListener(el, S_click, () => {
                  set(`data`, [], _);
                  _.updateSelected(undefined);
                }),
                [`Clear`]
              )),
            ]),
            c(S_div, el, {
              className: COL_SM_6_SMALLPAD,
            }, (el) => [
              c(S_button, el, {
                id: `swaprows`,
                type: S_button,
                className: BUTTON_PRIMARY_BLOCK,
              },  (el, _ = el._) => (
                addEventListener(el, S_click, () => {
                  let data = _.data;
                  if (data.length > 998) {
                    let temp = data[1];
                    set(1, data[998], data);
                    set(998, temp, data);
                  }
                }),
                [`Swap Rows`]
              )),
            ]),
          ]),
        ]),  
      ]),  
    ]),
    c(`table`, el, {
      className: `table table-hover table-striped test-data`,
    }, (el) => [
      c(`tbody`, el, {
        id: `tbody`,
      }, (el, _ = el._, removeItem) => [

        ...repeat(
          (u, ri) => {
            listen(_, [
              `data`,
              [SYMBOL_ALL_PROPERTIES, `change`]
            ], u, 1);
            removeItem = ri;
          },
          (item) => (
            c(`tr`, el, {}, (el, _ = el._) => (

              // listen(_, [`selected`], (selected) => {
              //   el.className = (_.item === selected) ? `danger` : ``;
              // }),
              listen(_, [`item`, `isSelected`], (isSelected) => {
                el.className = (isSelected) ? `danger` : ``;
              }),

              [
                c(S_td, el, {
                  className: `col-md-1`,
                }, (el) => [
                  ct('', el, (n, _ = n._) => (
                    listen(_, ['item', 'id'], (v) => (
                      n.data = v || ''
                    ), 1)
                  )),
                ]),
                c(S_td, el, {
                  className: `col-md-4`,
                }, (el) => [
                  c(`a`, el, {
                    className: `lbl`,
                  }, (el, _ = el._) => (
                    addEventListener(el, S_click, (e) => {
                      e.preventDefault();
                      _.updateSelected(_.item);
                    }),
                    [
                      ct('', el, (n, _ = n._) => (
                        listen(_, ['item', 'label'], (v) => (
                          n.data = v || ''
                        ), 1)
                      )),
                    ]
                  )),
                ]),
                c(S_td, el, {
                  className: `col-md-1`,
                }, (el) => [
                  c(`a`, el, {
                    className: `remove`,
                  }, (el, _ = el._) => (
                    addEventListener(el, S_click, (e) => {
                      e.preventDefault();
                      let data = _.data;
                      let index = data.indexOf(_.item);
                      if (index !== -1) {
                        // Collection_prototype_replace.call(data, index, 1);
                        removeItem(index);
                        data.splice(index, 1);
                      }
                    }),
                    [
                      c(`span`, el, {
                        className: `remove glyphicon glyphicon-remove`,
                        [`aria-hidden`]: `true`,
                      })
                    ]
                  )),
                ]),
                c(S_td, el, {
                  className: `col-md-6`,
                }, (el) => []),
              ]
            ), {
              item: item,
            })
          ),
          `item`
        ),
        
      ]),
    ]),
    c(`span`, el, {
      className: `preloadicon glyphicon glyphicon-remove`,
      [`aria-hidden`]: `true`,
    }),
  ]),
], scope);

// finally append the application to the body
append(document.body, app);