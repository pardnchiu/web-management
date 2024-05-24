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
            left: {
                is_body_left_min: $cookie("is_body_left_min"),
                is_database_list: 0,
                is_database_add: 1,
                is_article_add: 0,
                is_folder_image: 0,
                is_file_edit: 0,
                is_json_edit: 0
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
            ...default_events,
        },
        next: () => {
        }
    });
});
