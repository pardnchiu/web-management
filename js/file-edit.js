import { MDEditor, MDViewer } from "https://pardnchiu.github.io/markdown-editor/js/PDMDEditor.min.js";

document.addEventListener("DOMContentLoaded", function () {

    const editor = new MDEditor({
        style: {
            showRow: 0
        }
    });

    const page = new $dom({
        id: "body",
        data: {
            is_guest: false,
            login: {
                title: "Pardn Chiu",
                // 用於綁定 ':model'
                password: "",
            },
            title: "管理後台",
            // 左側導覽列
            left_tab: [
                {
                    icon: "fa-solid fa-newspaper",
                    title: "文章管理",
                    body: [
                        {
                            is_selected: false,
                            icon: "fa-solid fa-table-list",
                            title: "文章列表",
                            href: "/article-list.html"
                        },
                        {
                            is_selected: false,
                            icon: "fa-solid fa-pen",
                            title: "撰寫文章",
                            href: "/article-add.html"
                        },
                    ]
                },
                {
                    icon: "fa-solid fa-folder-open",
                    title: "檔案管理",
                    body: [
                        {
                            is_selected: false,
                            icon: "fa-solid fa-photo-film",
                            title: "媒體庫",
                            href: "/photo-library.html"
                        },
                        {
                            is_selected: true,
                            icon: "fa-solid fa-file",
                            title: "robots.txt",
                            href: "/file-edit.html"
                        },
                    ]
                },
                {
                    icon: "fa-solid fa-tv",
                    title: "網站管理",
                    body: [
                        {
                            is_selected: false,
                            icon: "fa-solid fa-file",
                            title: "首頁"
                        },
                        {
                            is_selected: false,
                            icon: "fa-solid fa-file",
                            title: "介紹頁"
                        },
                        {
                            is_selected: false,
                            icon: "fa-solid fa-file",
                            title: "聯絡我們"
                        },
                    ]
                },
                {
                    icon: "fa-solid fa-user-shield",
                    title: "系統管理",
                    body: [
                        {
                            is_selected: false,
                            icon: "fa-solid fa-mail-bulk",
                            title: "信箱設定"
                        },
                        {
                            is_selected: false,
                            icon: "fa-solid fa-unlock-alt",
                            title: "更改密碼"
                        },
                        {
                            is_selected: false,
                            icon: "fa-solid fa-key",
                            title: "兩步驟驗證"
                        },
                    ]
                },
                {
                    icon: "fa-solid fa-code-branch",
                    title: "版本資訊",
                    body: [
                        {
                            is_selected: false,
                            icon: "fa-brands fa-readme",
                            title: "Readme"
                        },
                        {
                            is_selected: false,
                            icon: "fa-solid fa-balance-scale",
                            title: "License"
                        },
                    ]
                },
            ],
            // 頂部導覽列
            top_tab: [
                {
                    title: "首頁",
                    href: "/",
                },
                {
                    title: "撰寫文章",
                    href: "",
                }
            ],
        },
        event: {
            init: function () {
                if ("section.body-left".$) {
                    "section.body-left".$.$childAll.forEach(e => {
                        e._class("r" + e.$child(-1).$childAll.length)
                    });
                };
            },
            show: function () {
                const isShow = this.$parent(0).$$class("show");
                this.__class(`fa-solid ${isShow ? "fa-eye-slash" : "fa-eye"}`);
                this.$pre(0).$child(0).type = isShow ? "password" : "text";
                this.$parent(0).$$class_(isShow, "show");
            },
            login: function () {
                page.dom.$child(0)._class("show");

                setTimeout(() => {
                    page.data.is_guest = false;

                    setTimeout(_ => {
                        page.event.init();
                    }, 100);
                }, 1000);
            },
            logout: function () {
                page.data.is_guest = true;
            },
            tab_show: function (e) {
                const parent = this.$parent(0);
                const is_show = parent.$$class("show") || parent.$sel("a[data-selected='true']");
                const is_hide = parent.$$class("hide");

                if (is_hide) {
                    parent._class("show").class_("hide");
                }
                else if (is_show) {
                    parent._class("hide").class_("show");
                }
                else {
                    parent._class("show");
                }

            },
            show_photo_library: function () {
                const dom = "section.bottom-photo".$;

                if (dom == null) {
                    return;
                };

                const is_show = dom.$$class("show");

                dom.$$class_(is_show, "show");
            },
            add_h2: function () {
                editor.addHeading(2)
            },
            add_h3: function () {
                editor.addHeading(3)
            },
            add_h4: function () {
                editor.addHeading(4)
            },
            add_h5: function () {
                editor.addHeading(5)
            },
            add_h6: function () {
                editor.addHeading(6)
            },
            add_bold: function () {
                editor.addBold()
            },
            add_italic: function () {
                editor.addItalic()
            },
            add_strikethrough: function () {
                editor.addStrikethrough()
            },
            add_underline: function () {
                editor.addUnderline()
            },
            add_marker: function () {
                editor.addMarker()
            },
            add_blockquote: function () {
                editor.addBlockquote()
            },
            add_ul: function () {
                editor.addUl()
            },
            add_ol: function () {
                editor.addOl()
            },
            add_code: function () {
                editor.addCode()
            },
            add_link: function () {
                editor.addLink("標題", "連結")
            },
            add_photo: function (e) {
                const src = e.target.dataset.src;

                editor.addImage(src, "替代文字", "圖片標題")
            }
        },
        next: () => {
            page.event.init();

            if ("section.PDMDEditor".$) {
                "section.PDMDEditor".$.$sel("section.editor")._child([
                    editor.body
                ]);
                
                if ("section.PDMDEditor".$.$sel("section.viewer") != null) {
                    "section.PDMDEditor".$.$sel("section.viewer")._child([
                        viewer.body
                    ]);
                };
            };

            editor.init();
        }
    });
});
