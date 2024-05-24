document.addEventListener("DOMContentLoaded", function () {
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
            left: {
                is_body_left_min: $cookie("is_body_left_min"),
                is_database_list: false,
                is_database_add: true,
                is_article_add: false,
                is_folder_image: false,
                is_file_edit: false,
                is_json_edit: false
            },
            // 頂部導覽列
            top_tab: [
                {
                    title: "首頁",
                    href: "/",
                },
                {
                    title: "資料新增範例",
                    href: "",
                }
            ],
            // 篩選
            form: {
                title: "新增資料範例",
                data: {
                    uri: {
                        is_input: true,
                        is_textarea: false,
                        is_select: false,
                        type: "text",
                        size: "",
                        placeholder: "自訂ID",
                        value: ""
                    },
                    title: {
                        is_input: true,
                        is_textarea: false,
                        is_select: false,
                        type: "text",
                        size: "_33",
                        placeholder: "標題",
                        value: ""
                    },
                    subtitle: {
                        is_input: true,
                        is_textarea: false,
                        is_select: false,
                        type: "text",
                        size: "_33",
                        placeholder: "副標題",
                        value: ""
                    },
                    description: {
                        is_input: false,
                        is_textarea: true,
                        is_select: false,
                        type: "text",
                        size: "",
                        placeholder: "內容",
                        value: "",
                        row: 10
                    },
                    tag: {
                        is_input: false,
                        is_textarea: true,
                        is_select: false,
                        type: "text",
                        size: "_33",
                        placeholder: "標籤",
                        value: "",
                        row: 5
                    },
                }
            },
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
            body_left_show: function (e) {
                const dom = "section.body-left".$;

                if (dom == null) {
                    return;
                };

                const is_show = dom.$$class("show");
                dom.$$class_(is_show, "show");
            },
            body_left_type: function (e) {
                const dom = "section.body-left".$;

                if (dom == null) {
                    return;
                };

                console.log(dom.dataset)
                const is_min = dom.dataset.min === "true";
                dom.dataset.min = is_min ? "false" : "true";
                _cookie("is_body_left_min", is_min ? "false" : "true")
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

            }
        },
        next: () => {
            page.event.init();
            // const url = new URL(location.href);

            // login.data.email = url.searchParams.get("user_email");
            // history.replaceState(null, null, "/management/login");
        }
    });
});
