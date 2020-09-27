function setCache(key, data) {
  try {
    wx.setStorageSync(key, JSON.stringify(data));
  } catch (e) {}
}

function getCache(key) {
  let data;
  try {
    data = JSON.parse(wx.getStorageSync(key));
  } catch (e) {
    data = null;
  }
  return data;
}

function removeCache(key) {
  wx.removeStorageSync(key)
}

module.exports = {
  setCache,
  getCache,
  removeCache
}