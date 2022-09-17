var dbUserResults = [
  { id: "000000001", name: "王大明", id_number: "A123456789", phone: "0912345678", email: "mail@icloud.com", email_verify: true, sex: 1, address: "台北市blabla...", birthday: "1990-01-01", signup: "2022-01-01", expire: "2027-01-01", is_expired: false, is_ad: true, dismiss: 0 },
  { id: "000000002", name: "李小華", id_number: "B123456789", phone: "0987654321", email: "mail@gmail.com", email_verify: false, sex: 2, address: "新北市blabla...", birthday: "1990-12-31", signup: "2017-01-01", expire: "2022-01-01", is_expired: true, is_ad: false, dismiss: 0 },
  { id: "000000003", name: "陳中德", id_number: "C123456789", phone: "0911111111", email: "mail@outlook.com", email_verify: true, sex: 1, address: "桃園市blabla...", birthday: "1991-01-01", signup: "2022-01-01", expire: "2027-01-01", is_expired: false, is_ad: false, dismiss: 1 }
];

var dbPriductResults = [
  { name: "衣服", product_code: "a1234", ean: "12345678", price: "299", size: "S", color: "黑", length: 25, width: 45, height: 80, weight: 60, total: 2, image: 3, dismiss: 0 },
  { name: "衣服", product_code: "a2345", ean: "23456789", price: "299", size: "S", color: "紅", length: 25, width: 45, height: 80, weight: 60, total: 2, image: 0, dismiss: 0 },
  { name: "褲子", product_code: "b1234", ean: "87654321", price: "199", size: "L", color: "白", length: 80, width: 45, height: 60, weight: 60, total: 0, image: 2, dismiss: 0 },
  { name: "裙子", product_code: "c1234", ean: "98765432", price: "399", size: "M", color: "粉", length: 40, width: 45, height: 60, weight: 60, total: 0, image: 2, dismiss: 1 },
];

var dbOrderResults = [
  { id: "000000001", name: "王大明", phone: "0912345678", email: "mail@icloud.com", create_date: "2022-01-01 00:00:00", pay_date: "2022-01-01 00:15:00", ship_date: "2022-01-01 00:30:00", refund_date: null, dismiss: 0 },
  { id: "000000002", name: "王大明", phone: "0912345678", email: "mail@icloud.com", create_date: "2022-01-02 00:00:00", pay_date: null, ship_date: null, refund_date: null, dismiss: 0 },
  { id: "000000003", name: "李小華", phone: "0987654321", email: "mail@gmail.com", create_date: "2022-01-02 00:00:00", pay_date: "2022-01-02 00:15:00", ship_date: null, refund_date: null, dismiss: 0 },
  { id: "000000004", name: "陳中德", phone: "0911111111", email: "mail@outlook.com", create_date: "2022-01-02 00:00:00", pay_date: "2022-01-02 00:15:00", ship_date: null, refund_date: null, dismiss: 1 },
  { id: "000000005", name: "王大明", phone: "0912345678", email: "mail@icloud.com", create_date: "2022-01-02 00:00:00", pay_date: "2022-01-02 00:15:00", ship_date: null, refund_date: "2022-01-02 00:30:00", dismiss: 1 },
  { id: "000000006", name: "李小華", phone: "0987654321", email: "mail@gmail.com", create_date: "2022-01-02 00:00:00", pay_date: null, ship_date: null, refund_date: null, dismiss: 1 }
];