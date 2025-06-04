export const API_BASE_URL = 'https://c343312cec644926a67ac35eafcca89d--5000.ap-shanghai.cloudstudio.club';

export const fetchExtensions = async (query) => {
  const response = await fetch(`${API_BASE_URL}/crx?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('获取扩展数据失败');
  }
  return response.json();
};

export const fetchStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stat`);
  if (!response.ok) {
    throw new Error('获取统计数据失败');
  }
  return response.json();
};