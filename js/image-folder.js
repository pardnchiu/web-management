
document.addEventListener("DOMContentLoaded", function () {
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
            is_folder_grid: $cookie("is_folder_grid"),
            left: {
                is_body_left_min: $cookie("is_body_left_min"),
                is_database_list: 0,
                is_database_add: 0,
                is_article_add: 0,
                is_folder_image: 1,
                is_file_edit: 0,
                is_json_edit: 0,
            },
            // 頂部導覽列
            top_tab: [
                {
                    title: "首頁",
                    href: "/",
                },
                {
                    title: "圖片庫範例",
                    href: "",
                }
            ],
        },
        event: {
            ...default_events,
            change_to_list: function (e) {
                const dom = "section.folder".$;

                if (dom && dom.$sel("section.list")) {
                    dom.$sel("section.list").dataset.grid = 0;
                    _cookie("is_folder_grid", "0")
                };
            },
            change_to_grid: function (e) {
                const dom = "section.folder".$;

                if (dom && dom.$sel("section.list")) {
                    dom.$sel("section.list").dataset.grid = 1;
                    _cookie("is_folder_grid", "1")
                };
            },
            get_image_viewer: function (e) {
                const _this = e.target;
                const dom = "section.folder-viewer".$;

                console.log(Boolean(dom.dataset.show))
                if (dom == null) {
                    return;
                }
                else if (parseInt(dom.dataset.show)) {
                    dom.dataset.show = 0;
                }
                else {
                    const src = _this.dataset.src;
                    const dom_body = dom.$sel("section.body");
                    const dom_download = dom.$sel("button[name='download']");
                    const dom_delete = dom.$sel("button[name='delete']");

                    if (dom_body == null || dom_download == null || dom_delete == null) {
                        return;
                    }
                    else if (/\.(jpg|jpeg|png|svg|webp)$/.test(src)) {
                        dom_download.dataset.src = src;
                        dom_delete.dataset.src = src;
                        dom_body.__child([
                            "img"._(src)
                        ]);
                        dom.dataset.show = 1;
                    };
                }
            },
            set_file_name: function (e) {
                const dom_this = e.target;
                const src = dom_this.dataset.src || "";
                const name = src.split(/\//).$(-1);
                prompt("輸入檔案名稱", name)
            },
            set_file_folder: function (e) {
                const dom_this = e.target;
                const dom_target = "section.folder-path".$;

                if (dom_target == null) {
                    return;
                }
                else if (parseInt(dom_target.dataset.show)) {
                    dom_target.dataset.show = 0;
                }
                else {
                    dom_target.dataset.show = 1;
                }
            },
            set_file_folder_selected: function (e) {
                const dom_this = e.target;
                const dom_parent = dom_this.$parent(0);
                const dom_selected = dom_parent.$sel("div[data-selected='1']");

                if (dom_selected) {
                    dom_selected.dataset.selected = 0;
                };

                dom_this.dataset.selected = 1;            
            },
            delete_folder: function (e) {
                const dom_this = e.target;
                const dom_folder = dom_this.$parent(2);

                if (dom_folder == null) {
                    return;
                }
                else if (confirm("刪除檔案夾")) {
                    dom_folder.remove();
                };
            },
            delete_file: function (e) {
                const _this = e.target;
                const src = _this.dataset.src;
                const folder = "section.folder".$;

                if (folder == null) {
                    return;
                };
                
                const dom_image = `button[data-src='${src}']`.$;

                if (dom_image == null) {
                    return;
                }
                else if (confirm("刪除檔案")) {
                    const dom_target = dom_image.$parent(0);
                    dom_target.remove();


                    const dom = "section.folder-viewer".$;

                    if (dom == null) {
                        return;
                    };

                    dom.class_("show");
                }
            }
        },
        next: (e) => {
        }
    });
});