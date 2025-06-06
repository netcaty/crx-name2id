let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://c343312cec644926a67ac35eafcca89d--5000.ap-shanghai.cloudstudio.club';
const BACKUP_API_BASE_URL = import.meta.env.VITE_API_BASE_URL_BACKUP || 'http://localhost:5000';

const switchToBackupApi = () => {
  console.warn('主环境不可用，切换到备环境 API');
  API_BASE_URL = BACKUP_API_BASE_URL;
};

export const fetchExtensions = async (query, page) => {
  try {
    const response = await fetch(`${API_BASE_URL}/crx?q=${encodeURIComponent(query)}&page=${page}`);
    if (!response.ok) {
      throw new Error('获取扩展数据失败');
    }
    return response.json();
  } catch (error) {
    console.error(error.message);
    switchToBackupApi();
    const response = await fetch(`${API_BASE_URL}/crx?q=${encodeURIComponent(query)}&page=${page}`);
    if (!response.ok) {
      throw new Error('备环境获取扩展数据失败');
    }
    return response.json();
  }
};

export const fetchStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stat`);
    if (!response.ok) {
      throw new Error('获取统计数据失败');
    }
    return response.json();
  } catch (error) {
    console.error(error.message);
    switchToBackupApi();
    const response = await fetch(`${API_BASE_URL}/stat`);
    if (!response.ok) {
      throw new Error('备环境获取统计数据失败');
    }
    return response.json();
  }
};