import { MDEditor, MDViewer } from "https://pardnchiu.github.io/markdown-editor/js/PDMDEditor.min.js";

document.addEventListener("DOMContentLoaded", function () {

    const editor = new MDEditor({
        style: {
            showRow: 0
        }
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
            }
        },
        next: () => {
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
