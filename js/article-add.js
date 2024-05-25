import { MDEditor, MDViewer } from "https://pardnchiu.github.io/markdown-editor/js/PDMDEditor.min.js";

document.addEventListener("DOMContentLoaded", function () {

    const editor = new MDEditor({
        style: {
            showRow: 0
        }
    });

    const viewer = new MDViewer({
        delay: 50
    });

    page = new $dom({
        id: "body",
        data: {
            is_guest: false,
            login: {
                title: "Pardn Chiu",
                // 用於綁定 ':model'
                password: "",
            },
            title: "管理後台",
            left: {
                is_body_left_min: $cookie("is_body_left_min"),
                is_database_list: 0,
                is_database_add: 0,
                is_article_add: 1,
                is_folder_image: 0,
                is_file_edit: 0,
                is_json_edit: 0
            },
            // 頂部導覽列
            top_tab: [
                {
                    title: "首頁",
                    href: "/management-1-web",
                },
                {
                    title: "文章撰寫範例",
                    href: "",
                }
            ],
        },
        event: {
            ...default_events,
            go_back: function () {
                editor.goBack();
            },
            go_forward: function () {
                editor.goForward();
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
            show_photo_library: function () {
                const dom = "section.top-photo".$;

                if (dom == null) {
                    return;
                };

                const is_show = dom.$$class("show");

                dom.$$class_(is_show, "show");
            },
            add_photo: function (e) {
                const src = e.target.dataset.src;

                editor.addImage(src, "替代文字", "圖片標題")
            }
        },
        next: (e) => {
            editor.viewer = viewer;
            viewer.editor = editor;

            if ("section.markdown".$) {
                "section.markdown".$.$sel("section.editor")._child([
                    editor.body
                ]);
                
                if ("section.markdown".$.$sel("section.viewer") != null) {
                    "section.markdown".$.$sel("section.viewer")._child([
                        viewer.body
                    ]);
                };
            };

            editor.init();
            viewer.init();

            editor.body.onwheel = function(e) {
                viewer.body.scrollTop += e.deltaY;
            };
        }
    });
});
