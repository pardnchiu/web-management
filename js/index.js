let page;

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
        }, 1000);
    },
    logout: function () {
        page.data.is_guest = true;
    },
    body_left_show: function (e) {
        const dom_target = "section.body-left".$;

        if (dom_target == null) {
            return;
        };
        
        dom_target.dataset.show = parseInt(dom_target.dataset.show) ? 0 : 1;
    },
    body_left_type: function (e) {
        const dom_target = "section.body-left".$;

        if (dom_target == null) {
            return;
        };

        const is_min = parseInt(dom_target.dataset.min);
        dom_target.dataset.min = is_min ? 0 : 1;
        _cookie("is_body_left_min", is_min ? 0 : 1)
    },
    tab_show: function (e) {
        const dom_this = e.target;
        const dom_parent = dom_this.$parent(0);
        const is_show = parseInt(dom_this.dataset.show);
        const is_child_selected = dom_parent.$sel("a[data-selected='1']") != null;

        if (is_child_selected && (isNaN(is_show) || is_show)) {
            this.dataset.show = 0;
        } else if (is_show) {
            this.dataset.show = 0;
        } else {
            this.dataset.show = 1;
        };
    },
}