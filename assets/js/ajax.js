async function getData() {
  // 获取 response
  const response = await fetch(
    "//cdn.jsdelivr.net/gh/BlankerL/DXY-COVID-19-Data@master/json/DXYArea.json"
  );
  // 获取结果 JSON
  const posts = await response.json();
  // 获取数据
  const results = posts.results;

  // 获取当前ip地理位置
  const ipdata = document.getElementById("c_ip").innerText;
  const geo = ipdata.split(/ |[)]|[(]/);
  if (geo.length === 8) {
    var province = geo[4];
    var city = geo[5];
  }

  // 获取省份
  function getProvince(arr, province) {
    for (let i in arr) {
      if (arr[i].provinceShortName === province) {
        return arr[i];
      }
    }
  }
  const yourProvince = getProvince(results, province);

  // 获取地级市
  const cities = yourProvince.cities;
  function getCity(arr, city) {
    for (let i in arr) {
      if (arr[i].cityName === city) {
        return arr[i];
      }
    }
  }
  const yourCity = getCity(cities, city);

  document.getElementById("covid19").innerText =
    city + "现存确认患者：" + yourCity.currentConfirmedCount;
}

// 调用函数
getData();
