async function getData() {
  // 获取 response
  const response = await fetch(
    '//cdn.jsdelivr.net/gh/BlankerL/DXY-COVID-19-Data@latest/json/DXYArea.json'
  );
  // 获取结果 JSON
  const posts = await response.json();
  // 获取数据
  const results = posts.results;

  // 获取当前ip地理位置
  const ipdata = document.getElementById('c_ip').innerText;
  const geo = ipdata.split(/ |[)]|[(]/);
  if (geo.length === 8) {// 境内城市
    const province = geo[4];
    const city = geo[5];
    const yourProvince = getProvince(results, province);
    const cities = yourProvince.cities;
    const yourCity = getCity(cities, city);
    document.getElementById('covid19').innerHTML =
      city + '现存确诊患者：' + yourCity.currentConfirmedCount + '<a href="//ncov.dxy.cn/ncovh5/view/pneumonia" target="_blank" style="color: #979898">（数据来源：丁香园）</a>';
  } else {// 境外地区
    const province = geo[4];
    const yourProvince = getProvince(results, province);
    document.getElementById('covid19').innerHTML =
      province + '现存确诊患者：' + yourProvince.currentConfirmedCount + '<a href="//ncov.dxy.cn/ncovh5/view/pneumonia" target="_blank" style="color: #979898">（数据来源：丁香园）</a>';
  }

  // 获取省份
  function getProvince(arr, province) {
    for (let i in arr) {
      if (arr[i].provinceShortName === province) {
        return arr[i];
      }
    }
  }

  // 获取地级市
  function getCity(arr, city) {
    for (let i in arr) {
      if (arr[i].cityName === city) {
        return arr[i];
      }
    }
  }
  setTimeout(() => {
    getData();
  }, 5000);
}
