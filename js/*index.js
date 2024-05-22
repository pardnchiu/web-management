var leftTabs = [
    {
        icon: "fas fa-users",
        title: "會員管理",
        body: [
            {
                icon: "fas fa-list-alt",
                title: "會員列表",
                href: "/view/user/list.html"
            },
            {
                icon: "fas fa-plus-circle",
                title: "建立會員",
                href: "/view/user/create.html"
            },
            {
                icon: "fas fa-exclamation-triangle",
                title: "系統提醒",
                href: "/view/user/notify.html"
            }
        ]
    },
    {
        icon: "fas fa-box",
        title: "商品管理",
        body: [
            {
                icon: "fas fa-list-alt",
                title: "商品列表",
                href: "/view/product/list.html"
            },
            {
                icon: "fas fa-plus-circle",
                title: "新增商品",
                href: "/view/product/create.html"
            },
            {
                icon: "fas fa-exclamation-triangle",
                title: "系統提醒",
                href: "/view/product/notify.html"
            }
        ]
    },
    {
        icon: "fas fa-clipboard-list",
        title: "訂單管理",
        body: [
            {
                icon: "fas fa-list-alt",
                title: "訂單列表",
                href: "/view/order/list.html"
            },
            {
                icon: "fas fa-plus-circle",
                title: "建立訂單",
                href: "/view/order/create.html"
            },
            {
                icon: "fas fa-exclamation-triangle",
                title: "系統提醒",
                href: "/view/order/notify.html"
            }
        ]
    },
    {
        icon: "fas fa-envelope-open-text",
        title: "留言管理",
        body: [
            {
                icon: "fas fa-list-alt",
                title: "留言列表",
                href: "/view/message/list.html"
            },
            {
                icon: "fas fa-shield-alt",
                title: "自動屏蔽",
                href: "/view/message/hide.html"
            }
        ]
    },
    {
        icon: "fas fa-ad",
        title: "廣告管理",
        body: [
            {
                icon: "fas fa-list-alt",
                title: "廣告列表",
                href: ""
            },
            {
                icon: "fas fa-plus-circle",
                title: "建立廣告",
                href: ""
            }
        ]
    },
    {
        icon: "fas fa-tv",
        title: "網站管理",
        body: [
            {
                icon: "fas fa-file",
                title: "首頁",
                href: ""
            },
            {
                icon: "fas fa-file",
                title: "介紹頁",
                href: ""
            },
            {
                icon: "fas fa-file",
                title: "聯絡我們",
                href: ""
            }
        ]
    },
    {
        icon: "fas fa-user-shield",
        title: "系統管理",
        body: [
            {
                icon: "fas fa-mail-bulk",
                title: "信箱設定",
                href: ""
            },
            {
                icon: "fas fa-unlock-alt",
                title: "更改密碼",
                href: ""
            },
            {
                icon: "fas fa-key",
                title: "兩步驟驗證",
                href: ""
            },
            {
                icon: "fas fa-history",
                title: "使用紀錄",
                href: ""
            }
        ]
    },
    {
        icon: "fas fa-code-branch",
        title: "版本資訊",
        body: [
            {
                icon: "fab fa-readme",
                title: "Readme",
                href: ""
            },
            {
                icon: "fas fa-balance-scale",
                title: "License",
                href: ""
            }
        ]
    }
];

String.prototype.new = function (attrs, children) {
    var dom = document.createElement(this);

    if (attrs) {
        Object.keys(attrs).forEach(attr => {
            if (attr === "name") return dom.setAttribute('name', attrs.name);
            if (attr === "value") return dom.value = attrs.value;
            if (attr === "id") return dom.id = attrs.id;
            if (attr === "class") return dom.className = attrs.class;
            if (attr === "innerText") return dom.innerText = attrs.innerText;
            if (attr === "innerHTML") return dom.innerHTML = attrs.innerHTML;
            if (attr === "textContent") return dom.textContent = attrs.textContent;
            if (attr === "onscroll") return dom.onscroll = attrs.onscroll;
            if (attr === "onload") return dom.onload = attrs.onload;
            if (attr === "onready") return dom.onreadystatechange = attrs.onready;
            if (attr === "onclick") return dom.onclick = attrs.onclick;
            if (attr === "onkeyup") return dom.onkeyup = attrs.onkeyup;
            if (attr === "onchange") return dom.onchange = attrs.onchange;

            if (attr === "onchange") return dom.onchange = attrs.onchange;
            if (attr === "ondragenter") return dom.ondragenter = attrs.ondragenter;
            if (attr === "ondragover") return dom.ondragover = attrs.ondragover;
            if (attr === "ondragleave") return dom.ondragleave = attrs.ondragleave;
            if (attr === "ondrop") return dom.ondrop = attrs.ondrop;

            if (attr === "onkeydown") return dom.onkeydown = attrs.onkeydown;
            if (attr === "onkeypress") return dom.onkeypress = attrs.onkeypress;
            if (attr === "oninput") return dom.oninput = attrs.oninput;
            if (attr === "onfocus") return dom.onfocus = attrs.onfocus;
            if (attr === "onblur") return dom.onblur = attrs.onblur;
            if (attr === "href") return dom.href = attrs.href;
            if (attr === "alt") return dom.alt = attrs.alt;
            if (attr === "src") return dom.src = attrs.src;
            if (attr === "file") return dom.file = attrs.file;
            if (attr === "placeholder") return dom.placeholder = attrs.placeholder;
            if (attr === "style") return Object.keys(attrs.style).forEach($1 => dom.style[$1] = attrs.style[$1]);
            if (attr === "bgcolor") return dom.style["background-color"] = attrs.bgcolor;
            if (attr === "set") return Object.keys(attrs.set).forEach($1 => dom.setAttribute($1, attrs.set[$1]));
            if (attr === "lazyload") {
                dom.classList.add('lazyload')
                dom.classList.add('loading')
                dom.setAttribute('data-src', attrs.lazyload);
                lazyloadObserver.observe(dom);
                return;
            };
            if (attr === "checked") return dom.checked = attrs.checked;
            if (attr === "selected") return dom.selected = attrs.selected;
            dom.setAttribute(attr, attrs[attr]);
        })
    };

    if (children != null) {
        if (children.length > 0) children.forEach(child => {
            if (child === null) return;
            if (typeof (child) == "object") return dom.appendChild(child);
            dom.innerHTML += child;
        });
    };

    return dom;
};

String.prototype.get = function () {
    var string = String(this);
    var isId = !/(\.|\=|\[|\])/g.test(string);
    var target = isId ? document.getElementById(string) : document.querySelector(string);
    if (target) return target;
};

String.prototype.getChild = function (children) {
    var target = String(this).get();
    if (children === null || !target) return;
    var type = typeof (children);
    if (type == "object") children.forEach($1 => {
        var type = typeof ($1);
        if (type === "number") target = target.children[$1];
        if (type === "string") target = target.querySelector($1);
    });
    else if (type === "number") target = target.children[children];
    else if (type === "string") target = target.querySelector(children);
    return target;
};

HTMLElement.prototype.class = function (action, value) {
    if (!action) return;
    if (action === "repl") this.className = "";
    switch (typeof (value)) {
        case "string":
            if (action === "add" || action === "repl") this.classList.add(value);
            if (action === "rm") this.classList.remove(value);
            break;
        case "object":
            value.forEach($1 => {
                if (action === "add" || action === "repl") this.classList.add($1);
                if (action === "rm") this.classList.remove($1);
            });
    };
};

(function () {
    var rootPath = location.href.split('/index.html')[0].split('/view')[0];
    var elm = "ul".new();

    function clickTab(elm) {
        var selectElement = elm.parentElement.parentElement.querySelector('li.show');
        if (selectElement && selectElement !== elm.parentElement) {
            selectElement.class('rm', ["show"]);
            selectElement.class('add', 'hide');
            var timer = setTimeout(function () {
                clearTimeout(timer);
                selectElement.class('rm', 'hide');
            }, 300);
        }
        if (selectElement === elm.parentElement) {
            elm.parentElement.class('rm', ["show"]);
            elm.parentElement.class('add', 'hide');
            var timer = setTimeout(function () {
                clearTimeout(timer);
                elm.parentElement.class('rm', 'hide');
            }, 300);
            return;
        };
        elm.parentElement.class('add', 'show');
    };

    leftTabs.forEach((e1) => {
        var isSelected = false;

        var elmChildren = (function () {
            let ary = [];
            e1.body.forEach((e2) => {
                var page = `${rootPath}${e2.href}`;
                var regex = new RegExp(page.replace(/\.html/, ''), 'gi');
                var isPage = (e2.href && regex.test(location.href));
                if (!isSelected && isPage) isSelected = true;
                ary.push(
                    "li".new({ class: isPage ? "selected" : "" }, [
                        "a".new({ href: `${rootPath}${e2.href}` }, [
                            "i".new({ class: e2.icon }),
                            "span".new({ innerText: `${e2.title}` }),
                        ])
                    ])
                );
            });
            return ary;
        }());

        elm.appendChild(
            "li".new({ class: `r${e1.body.length} ${isSelected ? "show" : ""}` }, [
                "p".new({ onclick: function () { clickTab(this) } }, [
                    "i".new({ class: e1.icon, type: "icon" }),
                    "span".new({ innerText: `${e1.title}` }),
                    "i".new({ class: "fas fa-chevron-right", type: "fixed" })
                ]),
                "ul".new(null, elmChildren)
            ])
        );
    });

    "left-tab".get().appendChild(elm);
}());

function elmHeads(json) {
    var url = new URL(location.href);
    var sort = String(url.searchParams.get('sort'));
    var sortHead = (sort) ? String(sort.split('-')[0]) : null;
    var sortOrder = (sort) ? String(sort.split('-')[1]) : null;

    var ary = [];
    Object.keys(json).forEach(($1, i) => {
        var isOrder = Boolean(sortHead === $1);
        var isLast = Boolean(i === (Object.keys(json).length - 1));
        var elmHead = "th".new();
        var elmI = "i".new();

        if (isOrder) elmHead.className = sortOrder;
        elmHead.innerHTML = json[$1];
        if (!isLast) elmHead.onclick = function () {
            if (!sortOrder || !isOrder) url.searchParams.set('sort', `${$1}-desc`);
            if (isOrder && sortOrder === 'desc') url.searchParams.set('sort', `${$1}-asc`);
            if (isOrder && sortOrder === 'asc') url.searchParams.delete('sort');
            location.href = url;
        }

        elmI.className = "fas fa-caret-up";
        if (!isLast) elmHead.appendChild(elmI);

        ary.push(elmHead);
    });
    return ary;
};

function insertElmPage(elm, json) {
    var elmpages = (function () {
        var ary = [];
        var min = (Number(json.page) - 3) >= 0 ? (Number(json.page) - 3) : 0;
        var max = (Number(json.page) + 2) <= Number(json.totalPage) ? (Number(json.page) + 2) : Number(json.totalPage);
        ary.push("li".new({ innerText: "上一頁" }));
        for (let i = min + 1; i < max + 1; i++) {
            var isSelected = Boolean(i === json.page)
            ary.push(
                "li".new({ class: isSelected ? "selected" : "", innerText: i })
            );
        };
        ary.push("li".new({ innerText: "下一頁" }));
        return ary;
    }());
    elm.appendChild(
        "footer".new(null, [
            "ul".new(null, elmpages),
            "div".new(null, [
                "p".new({ innerText: "顯示" }),
                "select".new({
                    onchange: function () { }
                }, [
                    "option".new({ value: 10, innerText: 10 }),
                    "option".new({ value: 50, innerText: 50 }),
                    "option".new({ value: 100, innerText: 100 }),
                ]),
                "p".new({ innerText: "筆結果" })
            ])
        ])
    );
};