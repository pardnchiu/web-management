var tableHeads = {
  id          : "編號",
  name        : "名稱",
  phone       : "電話",
  email       : "信箱",
  create_date : "訂單日期",
  pay_date    : "付款日期",
  ship_date   : "出貨日期",
  dismiss     : "狀態",
  action      : "動作"
};

(function(){
  var url 			= new URL(location.href);
  var sort 			= String(url.searchParams.get('sort'));
  var sortHead 	= (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;

  /**
   * 調整假資料順序
   */
  (function(){
    if (!sort) return;
    dbOrderResults = dbOrderResults.sort((a, b) => {
      var targetA = String(a[sortHead]);
      var targetB = String(b[sortHead]);
      var isAsc 	= Boolean(sortOrder === "asc");
      var isGreat = Boolean(targetA < targetB);
      var isLess  = Boolean(targetA > targetB);

      if (isAsc && isGreat) 	return -1;
      if (isAsc && isLess) 		return 1;
      if (!isAsc && isGreat) 	return 1;
      if (!isAsc && isLess) 	return -1;
      return 0;
    });
  }());

  /**
   * 插入Head
   */
  (function(){
    var elmRow 	= document.createElement('tr');
    Object.keys(tableHeads).forEach(($1, i) => {
      var isOrder = Boolean(sortHead === $1);
      var isLast 	= Boolean(i === (Object.keys(tableHeads).length - 1));
      var elmHead = document.createElement('th');
      var elmI 		= document.createElement('i');

      if (isOrder) elmHead.className = sortOrder;
      elmHead.innerHTML = tableHeads[$1];
      if (!isLast) elmHead.onclick = function(){
        if (!sortOrder || !isOrder) 				  url.searchParams.set('sort', `${$1}-desc`);
        if (isOrder && sortOrder === 'desc') 	url.searchParams.set('sort', `${$1}-asc`);
        if (isOrder && sortOrder === 'asc') 	url.searchParams.delete('sort');
        location.href = url;
      }

      elmI.className = "fas fa-caret-up";
      if (!isLast) elmHead.appendChild(elmI);

      elmRow.appendChild(elmHead);
    });
    document.getElementById('order-list').children[0].appendChild(elmRow);
  }());

  /**
   * 插入Data
   */
  (function(){
    dbOrderResults.forEach((order) => {
      var elmRow = document.createElement('tr');
      Object.keys(tableHeads).forEach((head) => {
        var elmData = document.createElement('td');
        switch (head) {
        case "pay_date":
          /**
           * 已付款 & 未取消
           */
          var isPaid   = Boolean(order.pay_date && !order.dismiss);
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
          var unPaid   = Boolean(!order.pay_date && !order.dismiss);

          switch (true) {
          
          case (isPaid):
            elmData.className = "btn";
            elmData.appendChild(function(){
              var elm = document.createElement('i');
              elm.className = "fas fa-minus-circle";
              elm.setAttribute('type', 'remove');
              return elm;
            }());
            elmData.innerHTML += order[head];
            elmData.onclick = function(){
              alert('移除付款日期?');
            };
            break;
          
          case (isRefund):
            elmData.innerText = `已退款 (${order.refund_date})`;
            break;
          
          case (unRefund):
            elmData.appendChild(function(){
              var elm = document.createElement('button');
              elm.innerText = "未退款";
              elm.onclick = function(){
                alert('更改狀態至已退款?\n更改後會寄送退款通知至消費者信箱。');
              };
              return elm;
            }());
            break;
          
          case (unPaid):
            var elmBtn = document.createElement('button');
            elmBtn.innerText = "未收款";
            elmBtn.onclick = function(){
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
          var isCanceled  = Boolean(order.dismiss && !order.ship_date);
          /**
           * 已出貨
           */
          var isShipped   = Boolean(!order.dismiss && order.ship_date);

          switch (true) {
          case (isCanceled):
            elmData.innerHTML = "";
            break;

          case (isShipped):
            elmData.className = "btn";
            elmData.appendChild(function(){
              var elm = document.createElement('i');
              elm.className = "fas fa-minus-circle";
              elm.setAttribute('type', 'remove');
              return elm;
            }());
            elmData.innerHTML += order[head];
            elmData.onclick = function(){
              alert('移除出貨日期?\n更改後會寄送修正通知至消費者信箱。');
            };
            break;
            
          default:
            elmData.appendChild(function(){
              var elm = document.createElement('button');
              elm.innerText = "未出貨";
              elm.onclick = function(){
                alert('更改狀態至已出貨?\n更改後會寄送出貨通知至消費者信箱。');
              };
              return elm;
            }());
          };
          break;

        case "dismiss":
          elmData.innerHTML = "未出貨";
          var isPaid    = Boolean(order.pay_date);
          var isShipped = Boolean(order.ship_date);
          var unCancel  = Boolean(!order.dismiss);
          var isRefund  = Boolean(order.refund_date);
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
          var elmPreview 	= document.createElement('button');
          var elmEnd 			= document.createElement('button');
          elmPreview.innerText = "內容";
          elmPreview.onclick = function(){
            alert('內容');
          };
          elmEnd.className = "offline";
          elmEnd.innerText = "取消訂單";
          elmEnd.onclick = function(){
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

      document.getElementById('order-list').children[1].appendChild(elmRow);
    });
  }());
}());