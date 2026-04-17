import React, { useState } from 'react';
import {
  Save,
  LogOut,
  Bell,
  Shield,
  Database,
  Server,
  User,
  Key
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    siteName: '管理系统',
    siteDescription: '一个功能强大的后台管理平台',
    adminEmail: 'admin@example.com',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    enableNotifications: true,
    notificationEmail: 'admin@example.com',
    enableTwoFactor: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加提交逻辑
    console.log('Form submitted:', formData);
  };

  // 模拟日志数据
  const logsData = [
    {
      id: '1',
      timestamp: '2024-01-07 14:30:00',
      user: '管理员',
      action: '登录系统',
      ip: '127.0.0.1',
      status: 'success'
    },
    {
      id: '2',
      timestamp: '2024-01-07 14:25:00',
      user: '管理员',
      action: '编辑内容',
      ip: '127.0.0.1',
      status: 'success'
    },
    {
      id: '3',
      timestamp: '2024-01-07 14:20:00',
      user: '张三',
      action: '登录系统',
      ip: '192.168.1.100',
      status: 'failure'
    },
    {
      id: '4',
      timestamp: '2024-01-07 14:15:00',
      user: '管理员',
      action: '创建内容',
      ip: '127.0.0.1',
      status: 'success'
    },
    {
      id: '5',
      timestamp: '2024-01-07 14:10:00',
      user: '李四',
      action: '访问仪表盘',
      ip: '192.168.1.101',
      status: 'success'
    }
  ];

  const tabs = [
    { id: 'general', label: '全局配置', icon: Server },
    { id: 'notifications', label: '通知设置', icon: Bell },
    { id: 'security', label: '安全设置', icon: Shield },
    { id: 'database', label: '数据库设置', icon: Database },
    { id: 'logs', label: '系统日志', icon: LogOut }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">系统设置</h1>

      {/* 标签页 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 标签页内容 */}
        <div className="p-6">
          {activeTab === 'general' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    站点名称
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    站点描述
                  </label>
                  <input
                    type="text"
                    id="siteDescription"
                    name="siteDescription"
                    value={formData.siteDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    管理员邮箱
                  </label>
                  <input
                    type="email"
                    id="adminEmail"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    时区
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Asia/Shanghai">Asia/Shanghai</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Europe/London">Europe/London</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    语言
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="zh-CN">中文</option>
                    <option value="en-US">English</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>保存设置</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="enableNotifications" className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="enableNotifications"
                      name="enableNotifications"
                      checked={formData.enableNotifications}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">启用通知</span>
                  </label>
                </div>
                <div>
                  <label htmlFor="notificationEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    通知邮箱
                  </label>
                  <input
                    type="email"
                    id="notificationEmail"
                    name="notificationEmail"
                    value={formData.notificationEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>保存设置</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="enableTwoFactor" className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="enableTwoFactor"
                      name="enableTwoFactor"
                      checked={formData.enableTwoFactor}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">启用双因素认证</span>
                  </label>
                </div>
                <div>
                  <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    会话超时（分钟）
                  </label>
                  <input
                    type="number"
                    id="sessionTimeout"
                    name="sessionTimeout"
                    value={formData.sessionTimeout}
                    onChange={handleChange}
                    min="5"
                    max="120"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    最大登录尝试次数
                  </label>
                  <input
                    type="number"
                    id="maxLoginAttempts"
                    name="maxLoginAttempts"
                    value={formData.maxLoginAttempts}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>保存设置</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">数据库信息</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">数据库类型</span>
                    <span className="text-sm text-gray-900 dark:text-white">PostgreSQL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">数据库版本</span>
                    <span className="text-sm text-gray-900 dark:text-white">15.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">连接状态</span>
                    <span className="text-sm text-green-600 dark:text-green-400">已连接</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <Database className="h-5 w-5" />
                  <span>备份数据库</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                  <Database className="h-5 w-5" />
                  <span>优化数据库</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          时间
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          用户
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          操作
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          IP地址
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          状态
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {logsData.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {log.timestamp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {log.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {log.action}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {log.ip}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
                              {log.status === 'success' ? '成功' : '失败'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>导出日志</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;