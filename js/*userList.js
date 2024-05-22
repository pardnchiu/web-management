var userListResult = {
  total: 1,
  totalPage: 1,
  page: 1,
  perPage: 10,
  datas: [
    { id: "000000001", name: "王大明", id_number: "A123456789", phone: "0912345678", email: "mail@icloud.com", email_verify: true, sex: 1, address: "台北市blabla...", birthday: "1990-01-01", signup: "2022-01-01", expire: "2027-01-01", is_expired: false, is_ad: true, dismiss: 0 },
    { id: "000000002", name: "李小華", id_number: "B123456789", phone: "0987654321", email: "mail@gmail.com", email_verify: false, sex: 2, address: "新北市blabla...", birthday: "1990-12-31", signup: "2017-01-01", expire: "2022-01-01", is_expired: true, is_ad: false, dismiss: 0 },
    { id: "000000003", name: "陳中德", id_number: "C123456789", phone: "0911111111", email: "mail@outlook.com", email_verify: true, sex: 1, address: "桃園市blabla...", birthday: "1991-01-01", signup: "2022-01-01", expire: "2027-01-01", is_expired: false, is_ad: false, dismiss: 1 }
  ]
};

var userNotifyResult = {
  total: 1,
  totalPage: 1,
  page: 1,
  perPage: 10,
  datas: [
    { id: "000000002", date: "2022-01-01 00:15:00", value: "有1個會員資格已過期" },
  ]
};

var userNotifyTrashResult = {
  total: 1,
  totalPage: 1,
  page: 1,
  perPage: 10,
  datas: [
    { id: "000000001", date: "2022-01-01 00:00:00", value: "有1個會員資格已過期" },
  ]
};

var userRuleResult = {
  total: 1,
  totalPage: 1,
  page: 1,
  perPage: 10,
  datas: [
    { id: "000000001", state: "已到期", schedule: "每半日一次", email: "mail@icloud.com, mail@gmail.com" },
  ]
};

(function setList() {
  if (!/\/user\/list.html/.test(location.href)) return;
  var tableHeads = {
    id: "編號",
    name: "姓名",
    id_number: "身分證字號",
    phone: "電話",
    email: "信箱",
    email_verify: "信箱驗證",
    sex: "性別",
    address: "地址",
    birthday: "生日",
    signup: "註冊日",
    expire: "到期日",
    ad: "廣告",
    dismiss: "狀態",
    action: "動作"
  };
  var url = new URL(location.href);
  var sort = String(url.searchParams.get('sort'));
  var sortHead = (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;
  var elmDiv = "user-list".get();
  var json = userListResult;

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
    json.datas.forEach((e1) => {
      var elmRow = "tr".new();
      Object.keys(tableHeads).forEach((e2) => {
        var elmData = document.createElement('td');
        var elmI = document.createElement('i');
        if (e2 === "phone") {
          elmI.className = "fas fa-mobile";
          elmData.className = "btn";
          elmData.onclick = function () {
            if (confirm('撥打電話?')) window.open(`tel:${e1[e2]}`, '_self');
          };
          elmData.appendChild(elmI);
        } else if (e2 === "email") {
          elmI.className = "fas fa-envelope";
          elmData.className = "btn";
          elmData.onclick = function () {
            if (confirm('打開郵件?')) window.open(`mailto:${e1[e2]}`, '_self');
          };
          elmData.appendChild(elmI);
        } else if (e2 === "address") {
          elmI.className = "fas fa-map-marker-alt";
          elmData.className = "btn";
          elmData.onclick = function () {
            if (confirm('打開地圖?')) window.open(`https://www.google.com/maps?q=${e1[e2]}`, '_blank');
          };
          elmData.appendChild(elmI);
        };
        if (e2 === "email_verify") {
          elmData.innerHTML = e1[e2] ? "已驗證" : "";
        } else if (e2 === "sex") {
          if (e1[e2] === 1) elmData.innerHTML = "男";
          if (e1[e2] === 2) elmData.innerHTML = "女";
        } else if (e2 === "dismiss") {
          elmData.innerHTML = "有效";
          if (e1.is_expired) elmData.innerHTML = "已過期";
          if (e1.dismiss) elmData.innerHTML = "已停權";
        } else if (e2 === "ad") {
          elmData.innerHTML = e1.is_ad ? "允許" : "";
        } else if (e2 === "action") {
          var elmEdit = document.createElement('button');
          var elmReport = document.createElement('button');
          var elmEnd = document.createElement('button');
          var elmRecover = document.createElement('button');
          elmEdit.innerText = "編輯";
          elmEdit.onclick = function () {
            alert('編輯');
          };
          elmReport.innerText = "通知";
          elmReport.onclick = function () {
            alert('通知');
          };
          elmEnd.className = "offline";
          elmEnd.innerText = "停權";
          elmEnd.onclick = function () {
            alert('停權');
          };
          elmRecover.innerText = "恢復";
          elmEnd.onclick = function () {
            alert('恢復');
          };
          elmData.appendChild(elmEdit);
          if (e1.is_expired) elmData.appendChild(elmReport)
          elmData.appendChild(e1.dismiss ? elmRecover : elmEnd);
        } else {
          elmData.innerHTML += e1[e2];
        }

        elmRow.appendChild(elmData)
      });

      if (e1.is_expired) elmRow.className = "report";
      if (e1.dismiss) elmRow.className = "offline";

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

(function setNotify() {
  if (!/\/user\/notify.html/.test(location.href)) return;
  var tableHeads = {
    date: "日期",
    value: "內容",
    action: "動作"
  };
  var url = new URL(location.href);
  var sort = String(url.searchParams.get('sort'));
  var sortHead = (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;
  var elmDiv = "user-notify".get();
  var json = userNotifyResult;

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
        if ($2 === "dismiss") {
          elmData.innerHTML = "有效";
          if ($1.is_expired) elmData.innerHTML = "已過期";
          if ($1.dismiss) elmData.innerHTML = "已停權";
        } else if ($2 === "action") {
          var elmRemove = document.createElement('button');
          elmRemove.className = "offline";
          elmRemove.innerText = "停權";
          elmRemove.onclick = function () {
            alert('停權');
          };
          elmData.appendChild(elmRemove);
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
          "tr".new(null,  elmHeads(tableHeads))
        ]),
        "tbody".new({ class: "can-select" }, elmRows)
      ])
    ])
  );

  insertElmPage(elmDiv, json);

}());

(function setNotifyTrash() {
  if (!/\/user\/notifyTrash.html/.test(location.href)) return;
  var tableHeads = {
    date: "日期",
    value: "內容"
  };
  var url = new URL(location.href);
  var sort = String(url.searchParams.get('sort'));
  var sortHead = (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;
  var elmDiv = "user-notify-trash".get();
  var json = userNotifyTrashResult;

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
        if ($2 === "dismiss") {
          elmData.innerHTML = "有效";
          if ($1.is_expired) elmData.innerHTML = "已過期";
          if ($1.dismiss) elmData.innerHTML = "已停權";
        } else if ($2 === "action") {
          var elmRemove = document.createElement('button');
          elmRemove.className = "offline";
          elmRemove.innerText = "停權";
          elmRemove.onclick = function () {
            alert('停權');
          };
          elmData.appendChild(elmRemove);
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
          "tr".new(null,  elmHeads(tableHeads))
        ]),
        "tbody".new({ class: "can-select" }, elmRows)
      ])
    ])
  );
  insertElmPage(elmDiv, json);

}());

(function setUserRuls() {
  if (!/\/user\/notify.html/.test(location.href)) return;
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
  var elmDiv = "user-rule".get();
  var json = userRuleResult;

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
          "tr".new(null,  elmHeads(tableHeads))
        ]),
        "tbody".new({ class: "can-select" }, elmRows)
      ])
    ])
  );

  insertElmPage(elmDiv, json);

}());