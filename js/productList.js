/**
 * 插入商品列表
 */
var productHeads = {
  name: "品名",
  product_code: "內部編碼",
  ean: "商品編碼",
  price: "價格",
  size: "尺寸",
  color: "顏色",
  length: "長度",
  width: "寬度",
  height: "高度",
  weight: "重量",
  total: "數量",
  image: "圖片",
  dismiss: "狀態",
  action: "動作"
};
var productResult = {
  total: 1,
  totalPage: 1,
  page: 1,
  perPage: 10,
  datas: [
    { name: "衣服", product_code: "a1234", ean: "12345678", price: "299", size: "S", color: "黑", length: 25, width: 45, height: 80, weight: 60, total: 2, image: 3, dismiss: 0 },
    { name: "衣服", product_code: "a2345", ean: "23456789", price: "299", size: "S", color: "紅", length: 25, width: 45, height: 80, weight: 60, total: 2, image: 0, dismiss: 0 },
    { name: "褲子", product_code: "b1234", ean: "87654321", price: "199", size: "L", color: "白", length: 80, width: 45, height: 60, weight: 60, total: 0, image: 2, dismiss: 0 },
    { name: "裙子", product_code: "c1234", ean: "98765432", price: "399", size: "M", color: "粉", length: 40, width: 45, height: 60, weight: 60, total: 0, image: 2, dismiss: 1 },
  ]
};
(function setList() {
  if (!/\/product\/list.html/.test(location.href)) return;
  var url = new URL(location.href);
  var sort = String(url.searchParams.get('sort'));
  var sortHead = (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;
  var elmDiv = "product-list".get();
  var json = productResult;

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
    json.datas.forEach(($1) => {
      var elmRow = "tr".new();
      Object.keys(productHeads).forEach(($2, j) => {
        var elmData = document.createElement('td');
        var elmI = document.createElement('i');
        if ($2 === "total") {
          var elmAdd = document.createElement('button');
          elmAdd.innerText = "補貨";
          elmAdd.onclick = function () {
            alert('補貨');
          };
          if ($1[$2]) {
            elmData.innerHTML = $1[$2];
          } else {
            elmData.appendChild(elmAdd);
          };
        } else if ($2 === "image") {
          if ($1[$2]) {
            var elmI = document.createElement('i');
            elmI.className = "fas fa-upload";
            elmData.className = "btn";
            elmData.appendChild(elmI);
            elmData.innerHTML += $1[$2];
            elmData.onclick = function () {
              alert('上傳');
            };
          } else {
            var elmAdd = document.createElement('button');
            elmAdd.innerText = "上傳"
            elmData.appendChild(elmAdd);
            elmData.onclick = function () {
              alert('上傳');
            };
          };
        } else if ($2 === "dismiss") {
          elmData.innerHTML = "販售中";
          if (!$1.total) elmData.innerHTML = "已缺貨";
          if ($1.dismiss) elmData.innerHTML = "已下架";
        } else if ($2 === "action") {
          var elmPreview = document.createElement('button');
          var elmEdit = document.createElement('button');
          var elmEnd = document.createElement('button');
          var elmRecover = document.createElement('button');
          elmPreview.innerText = "預覽";
          elmPreview.onclick = function () {
            alert('預覽');
          };
          elmEdit.innerText = "編輯";
          elmEdit.onclick = function () {
            alert('編輯');
          };
          elmEnd.className = "offline";
          elmEnd.innerText = "下架";
          elmEnd.onclick = function () {
            alert('下架');
          };
          elmRecover.innerText = "重新上架";
          elmRecover.onclick = function () {
            alert('重新上架');
          };
          elmData.appendChild(elmPreview);
          elmData.appendChild(elmEdit);
          elmData.appendChild($1.dismiss ? elmRecover : elmEnd);
        } else {
          elmData.innerHTML += $1[$2];
        }

        elmRow.appendChild(elmData);
      });

      if (!$1.total) elmRow.className = "report";
      if ($1.dismiss) elmRow.className = "offline";

      aryRow.push(elmRow)
    });
    return aryRow;
  }());

  elmDiv.appendChild(
    "section".new(null, [
      "table".new(null, [
        "thead".new(null, [
          "tr".new(null, elmHeads(productHeads))
        ]),
        "tbody".new({ class: "can-select" }, elmRows)
      ])
    ])
  );

  insertElmPage(elmDiv, json);

}());
/**
 * 插入商品提醒
 */
var orderNotifyResult = {
  total: 1,
  totalPage: 1,
  page: 1,
  perPage: 10,
  datas: [
    { id: "000000003", date: "2022-01-01 00:30:00", value: "有1款商品已缺貨" },
    { id: "000000004", date: "2022-01-01 00:45:00", value: "有1款商品無圖片" },
  ]
};
(function setNotify() {
  if (!/\/product\/notify.html/.test(location.href)) return;
  var tableHeads = {
    date: "日期",
    value: "內容",
    action: "動作"
  };
  var url = new URL(location.href);
  var sort = String(url.searchParams.get('sort'));
  var sortHead = (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;
  var elmDiv = "product-notify".get();
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
    { id: "000000001", date: "2022-01-01 00:00:00", value: "有1款商品已缺貨" },
    { id: "000000002", date: "2022-01-01 00:15:00", value: "有1款商品無圖片" },
  ]
};
(function setNotifyTrash() {
  if (!/\/product\/notifyTrash.html/.test(location.href)) return;
  var tableHeads = {
    date: "日期",
    value: "內容"
  };
  var url = new URL(location.href);
  var sort = String(url.searchParams.get('sort'));
  var sortHead = (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;
  var elmDiv = "user-notify-trash".get();
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
    { id: "000000001", state: "無圖片", schedule: "每3小時一次", email: "mail@icloud.com, mail@gmail.com" },
    { id: "000000001", state: "已缺貨", schedule: "每6小時一次", email: "mail@icloud.com, mail@gmail.com" },
  ]
};
(function setRuls() {
  if (!/\/product\/notify.html/.test(location.href)) return;
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
  var elmDiv = "product-rule".get();
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