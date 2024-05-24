const default_events = {
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
        };
    },
}