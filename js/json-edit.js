import { editor as MDEditor } from "https://cdn.jsdelivr.net/gh/pardnchiu/PDMarkdownKit@1.0.0/dist/PDMarkdownKit.js";

document.addEventListener("DOMContentLoaded", function () {

    const editor = new MDEditor({
        showRow: 0
    });

    page = new PD({
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
                is_article_add: 0,
                is_folder_image: 0,
                is_file_edit: 0,
                is_json_edit: 0,
                is_json_edit_input: 1
            },
            // 頂部導覽列
            top_tab: [
                {
                    title: "首頁",
                    href: "/management-1-web",
                },
                {
                    title: "JSON編輯範例",
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
            save: function () {
                let txt = editor.getMdTxt()
                txt = txt.replace(/[\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u200B-\u200D\u2060\u202F\u3000]/g, ' ');

                try {
                    let json = JSON.parse(txt);
                    console.log(json);
                }
                catch (err) {
                    alert("錯誤: JSON解析失敗, 請檢查格式.")
                }
            },
            change_json_mode: function () {
                const dom_json = "section.json".$;
                const dom_markdown = "section.markdown".$;

                if ([dom_json, dom_markdown].filter(e => e == null).length) {
                    return;
                };

                const is_dom_json_hide = dom_json.$style("display") == "none";
                const is_dom_markdown_hide = dom_markdown.$style("display") == "none";

                if (!is_dom_json_hide && is_dom_markdown_hide) {
                    dom_json._style({ display: "none" });
                    dom_markdown._style({ display: "flex" });
                }
                else {
                    dom_json._style({ display: "flex" });
                    dom_markdown._style({ display: "none" });
                };
            }
        },
        next: () => {
            if ("section.markdown".$) {
                "section.markdown".$.$sel("section.editor")._child([
                    editor.body
                ]);
            };

            editor.init(JSON.stringify({
                meta: {
                    robots: "index follow",
                    title: "首頁標題範例文字",
                    description: "首頁描述範例文字",
                    image: "/image/1-1.jpg",
                    icon: "/image/1-1.jpg",
                    og_site_name: "",
                    og_type: "",
                    author: "",
                    published_time: "",
                    modified_time: "",
                    canonical: "",
                    alternate: ""
                },
                content: {
                    title: "文案標題範例文字",
                    block_1: {
                        content: "文案內容範例文字"
                    }
                }
            }, null, 4));
        }
    });
});
