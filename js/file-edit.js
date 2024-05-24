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
                is_file_edit: 1,
                is_json_edit: 0
            },
            // 頂部導覽列
            top_tab: [
                {
                    title: "首頁",
                    href: "/management-1-web",
                },
                {
                    title: "文檔範例",
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

            editor.init(`User-agent: *
Allow: /
Crawl-delay: 10`);
        }
    });
});
