var orderHeads = {
  id: "編號",
  name: "名稱",
  phone: "電話",
  email: "信箱",
  create_date: "訂單日期",
  pay_date: "付款日期",
  ship_date: "出貨日期",
  dismiss: "狀態",
  action: "動作"
};
var orderResult = {
  total: 1,
  totalPage: 1,
  page: 1,
  perPage: 10,
  datas: [
    { id: "000000001", name: "王大明", phone: "0912345678", email: "mail@icloud.com", create_date: "2022-01-01 00:00:00", pay_date: "2022-01-01 00:15:00", ship_date: "2022-01-01 00:30:00", refund_date: null, dismiss: 0 },
    { id: "000000002", name: "王大明", phone: "0912345678", email: "mail@icloud.com", create_date: "2022-01-02 00:00:00", pay_date: null, ship_date: null, refund_date: null, dismiss: 0 },
    { id: "000000003", name: "李小華", phone: "0987654321", email: "mail@gmail.com", create_date: "2022-01-02 00:00:00", pay_date: "2022-01-02 00:15:00", ship_date: null, refund_date: null, dismiss: 0 },
    { id: "000000004", name: "陳中德", phone: "0911111111", email: "mail@outlook.com", create_date: "2022-01-02 00:00:00", pay_date: "2022-01-02 00:15:00", ship_date: null, refund_date: null, dismiss: 1 },
    { id: "000000005", name: "王大明", phone: "0912345678", email: "mail@icloud.com", create_date: "2022-01-02 00:00:00", pay_date: "2022-01-02 00:15:00", ship_date: null, refund_date: "2022-01-02 00:30:00", dismiss: 1 },
    { id: "000000006", name: "李小華", phone: "0987654321", email: "mail@gmail.com", create_date: "2022-01-02 00:00:00", pay_date: null, ship_date: null, refund_date: null, dismiss: 1 }
  ]
};
(function setList() {
  if (!/\/order\/list.html/.test(location.href)) return;
  var url = new URL(location.href);
  var sort = String(url.searchParams.get('sort'));
  var sortHead = (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;
  var elmDiv = "order-list".get();
  var json = orderResult;

  if (sort) {
    json.datas = json.datas.sort((a, b) => {
      var targetA = String(a[sortHead]);
      var targetB = String(b[sortHead]);
      var isAsc = Boolean(sortOrder === "asc");
      var isGreat = Boolean(targetA < targetB);
      var isLess = Boolean(targetA > targetB);

      if (isAsc && isGreat) return -1;
      if (isAsc && isLess) return 1;
      if (!isAsc && isGreat) return 1;
      if (!isAsc && isLess) return -1;
      return 0;
    });
  };

  var elmRows = (function () {
    var aryRow = [];
    json.datas.forEach((order) => {
      var elmRow = "tr".new();
      Object.keys(orderHeads).forEach((head) => {
        var elmData = document.createElement('td');
        switch (head) {
          case "pay_date":
            /**
             * 已付款 & 未取消
             */
            var isPaid = Boolean(order.pay_date && !order.dismiss);
            /**
             * 已付款 & 已取消 & 已退款
             */
            var isRefund = Boolean(order.pay_date && order.dismiss && order.refund_date);
            /**
             * 已付款 & 已取消 & 未退款
             */
            var unRefund = Boolean(order.pay_date && order.dismiss && !order.refund_date);
            /**
             * 未付款 & 未取消
             */
            var unPaid = Boolean(!order.pay_date && !order.dismiss);

            switch (true) {

              case (isPaid):
                elmData.className = "btn";
                elmData.appendChild(function () {
                  var elm = document.createElement('i');
                  elm.className = "fas fa-minus-circle";
                  elm.setAttribute('type', 'remove');
                  return elm;
                }());
                elmData.innerHTML += order[head];
                elmData.onclick = function () {
                  alert('移除付款日期?');
                };
                break;

              case (isRefund):
                elmData.innerText = `已退款 (${order.refund_date})`;
                break;

              case (unRefund):
                elmData.appendChild(function () {
                  var elm = document.createElement('button');
                  elm.innerText = "未退款";
                  elm.onclick = function () {
                    alert('更改狀態至已退款?\n更改後會寄送退款通知至消費者信箱。');
                  };
                  return elm;
                }());
                break;

              case (unPaid):
                var elmBtn = document.createElement('button');
                elmBtn.innerText = "未收款";
                elmBtn.onclick = function () {
                  alert('更改狀態至已付款?');
                };
                elmData.appendChild(elmBtn);
                break;

              default:
                elmData.innerHTML = "";
                break;
            };

            break;

          case "ship_date":
            /**
             * 已取消
             */
            var isCanceled = Boolean(order.dismiss && !order.ship_date);
            /**
             * 已出貨
             */
            var isShipped = Boolean(!order.dismiss && order.ship_date);

            switch (true) {
              case (isCanceled):
                elmData.innerHTML = "";
                break;

              case (isShipped):
                elmData.className = "btn";
                elmData.appendChild(function () {
                  var elm = document.createElement('i');
                  elm.className = "fas fa-minus-circle";
                  elm.setAttribute('type', 'remove');
                  return elm;
                }());
                elmData.innerHTML += order[head];
                elmData.onclick = function () {
                  alert('移除出貨日期?\n更改後會寄送修正通知至消費者信箱。');
                };
                break;

              default:
                elmData.appendChild(function () {
                  var elm = document.createElement('button');
                  elm.innerText = "未出貨";
                  elm.onclick = function () {
                    alert('更改狀態至已出貨?\n更改後會寄送出貨通知至消費者信箱。');
                  };
                  return elm;
                }());
            };
            break;

          case "dismiss":
            elmData.innerHTML = "未出貨";
            var isPaid = Boolean(order.pay_date);
            var isShipped = Boolean(order.ship_date);
            var unCancel = Boolean(!order.dismiss);
            var isRefund = Boolean(order.refund_date);
            elmData.innerHTML =
              isPaid ? (
                isShipped ? "已出貨" : (
                  unCancel ? "未出貨" : (
                    isRefund ? "已取消" : "未退款"
                  )
                )
              ) : (
                unCancel ? "未出貨" : "已取消"
              );
            break;

          case "action":
            var elmPreview = document.createElement('button');
            var elmEnd = document.createElement('button');
            elmPreview.innerText = "內容";
            elmPreview.onclick = function () {
              alert('內容');
            };
            elmEnd.className = "offline";
            elmEnd.innerText = "取消訂單";
            elmEnd.onclick = function () {
              alert('取消訂單');
            };
            elmData.appendChild(elmPreview);
            if (!order.dismiss) {
              if (!order.pay_date || !order.ship_date) elmData.appendChild(elmEnd);
            };
            break;
          default:
            elmData.innerHTML = order[head];
        };

        elmRow.appendChild(elmData);
      });

      if (order.dismiss) elmRow.className = "offline";
      if (order.dismiss && order.pay_date && !order.refund_date) elmRow.className = "report";

      aryRow.push(elmRow)
    });
    return aryRow;
  }());

  elmDiv.appendChild(
    "section".new(null, [
      "table".new(null, [
        "thead".new(null, [
          "tr".new(null, elmHeads(orderHeads))
        ]),
        "tbody".new({ class: "can-select" }, elmRows)
      ])
    ])
  );

  insertElmPage(elmDiv, json);

}());
/**
 * 插入訂單提醒
 */
var orderNotifyResult = {
  total: 1,
  totalPage: 1,
  page: 1,
  perPage: 10,
  datas: [
    { id: "000000003", date: "2022-01-01 00:30:00", value: "有1款取消尚未退款" },
    { id: "000000004", date: "2022-01-01 00:45:00", value: "有1款訂單尚未出貨" },
  ]
};
(function setNotify() {
  if (!/\/order\/notify.html/.test(location.href)) return;
  var tableHeads = {
    date: "日期",
    value: "內容",
    action: "動作"
  };
  var url = new URL(location.href);
  var sort = String(url.searchParams.get('sort'));
  var sortHead = (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;
  var elmDiv = "order-notify".get();
  var json = orderNotifyResult;

  if (sort) {
    json.datas = json.datas.sort((a, b) => {
      var targetA = String(a[sortHead]);
      var targetB = String(b[sortHead]);
      var isAsc = Boolean(sortOrder === "asc");
      var isGreat = Boolean(targetA < targetB);
      var isLess = Boolean(targetA > targetB);

      if (isAsc && isGreat) return -1;
      if (isAsc && isLess) return 1;
      if (!isAsc && isGreat) return 1;
      if (!isAsc && isLess) return -1;
      return 0;
    });
  };

  var elmRows = (function () {
    var aryRow = [];
    json.datas.forEach(($1, i) => {
      var elmRow = document.createElement('tr');
      Object.keys(tableHeads).forEach(($2, j) => {
        var elmData = document.createElement('td');
        if ($2 === "action") {
          elmData.appendChild(
            "button".new({
              class: "offline",
              innerText: "移除",
              onclick: function () {
                alert('移除');
              }
            })
          );
        } else {
          elmData.innerHTML += $1[$2];
        }

        elmRow.appendChild(elmData);
      });

      if ($1.is_expired) elmRow.className = "report";
      if ($1.dismiss) elmRow.className = "offline";

      aryRow.push(elmRow)
    });
    return aryRow;
  }());

  elmDiv.appendChild(
    "section".new(null, [
      "table".new(null, [
        "thead".new(null, [
          "tr".new(null, elmHeads(tableHeads))
        ]),
        "tbody".new({ class: "can-select" }, elmRows)
      ])
    ])
  );

  insertElmPage(elmDiv, json);

}());
/**
 * 插入商品提醒 (垃圾桶)
 */
var orderNotifyTrashResult = {
  total: 1,
  totalPage: 1,
  page: 1,
  perPage: 10,
  datas: [
    { id: "000000001", date: "2022-01-01 00:00:00", value: "有1筆取消尚未退款" },
    { id: "000000002", date: "2022-01-01 00:15:00", value: "有3筆訂單尚未出貨" },
  ]
};
(function setNotifyTrash() {
  if (!/\/order\/notifyTrash.html/.test(location.href)) return;
  var tableHeads = {
    date: "日期",
    value: "內容"
  };
  var url = new URL(location.href);
  var sort = String(url.searchParams.get('sort'));
  var sortHead = (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;
  var elmDiv = "order-notify-trash".get();
  var json = orderNotifyTrashResult;

  if (sort) {
    json.datas = json.datas.sort((a, b) => {
      var targetA = String(a[sortHead]);
      var targetB = String(b[sortHead]);
      var isAsc = Boolean(sortOrder === "asc");
      var isGreat = Boolean(targetA < targetB);
      var isLess = Boolean(targetA > targetB);

      if (isAsc && isGreat) return -1;
      if (isAsc && isLess) return 1;
      if (!isAsc && isGreat) return 1;
      if (!isAsc && isLess) return -1;
      return 0;
    });
  };

  var elmRows = (function () {
    var aryRow = [];
    json.datas.forEach(($1, i) => {
      var elmRow = document.createElement('tr');
      Object.keys(tableHeads).forEach(($2, j) => {
        var elmData = document.createElement('td');
        elmData.innerHTML += $1[$2];
        elmRow.appendChild(elmData);
      });

      if ($1.is_expired) elmRow.className = "report";
      if ($1.dismiss) elmRow.className = "offline";

      aryRow.push(elmRow)
    });
    return aryRow;
  }());

  elmDiv.appendChild(
    "section".new(null, [
      "table".new(null, [
        "thead".new(null, [
          "tr".new(null, elmHeads(tableHeads))
        ]),
        "tbody".new({ class: "can-select" }, elmRows)
      ])
    ])
  );
  insertElmPage(elmDiv, json);

}());
/**
 * 插入商品排程
 */
var productRuleResult = {
  total: 1,
  totalPage: 1,
  page: 1,
  perPage: 10,
  datas: [
    { id: "000000001", state: "未退款", schedule: "每1小時一次", email: "mail@icloud.com, mail@gmail.com" },
    { id: "000000002", state: "未出貨", schedule: "每日一次", email: "mail@icloud.com, mail@gmail.com" },
  ]
};
(function setRuls() {
  if (!/\/order\/notify.html/.test(location.href)) return;
  var tableHeads = {
    state: "狀態",
    schedule: "排程",
    email: "排程",
    action: "動作"
  };
  var url = new URL(location.href);
  var sort = String(url.searchParams.get('sort'));
  var sortHead = (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;
  var elmDiv = "order-rule".get();
  var json = productRuleResult;

  if (sort) {
    json.datas = json.datas.sort((a, b) => {
      var targetA = String(a[sortHead]);
      var targetB = String(b[sortHead]);
      var isAsc = Boolean(sortOrder === "asc");
      var isGreat = Boolean(targetA < targetB);
      var isLess = Boolean(targetA > targetB);

      if (isAsc && isGreat) return -1;
      if (isAsc && isLess) return 1;
      if (!isAsc && isGreat) return 1;
      if (!isAsc && isLess) return -1;
      return 0;
    });
  };

  var elmRows = (function () {
    var aryRow = [];
    json.datas.forEach(($1, i) => {
      var elmRow = document.createElement('tr');
      Object.keys(tableHeads).forEach(($2, j) => {
        var elmData = document.createElement('td');
        if ($2 === "action") {
          elmData.appendChild(
            "button".new({
              innerText: "編輯",
              onclick: function () {
                alert('編輯')
              }
            })
          );
          elmData.appendChild(
            "button".new({
              class: "offline",
              innerText: "移除",
              onclick: function () {
                alert('移除')
              }
            })
          );
        } else {
          elmData.innerHTML += $1[$2];
        }

        elmRow.appendChild(elmData);
      });

      if ($1.is_expired) elmRow.className = "report";
      if ($1.dismiss) elmRow.className = "offline";

      aryRow.push(elmRow)
    });
    return aryRow;
  }());

  elmDiv.appendChild(
    "section".new(null, [
      "table".new(null, [
        "thead".new(null, [
          "tr".new(null, elmHeads(tableHeads))
        ]),
        "tbody".new({ class: "can-select" }, elmRows)
      ])
    ])
  );

  insertElmPage(elmDiv, json);

}());