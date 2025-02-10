import React, { useState } from 'react';
import { Users, Shield, Key, ChevronRight, Plus, Pencil, Trash2, X, ChevronDown } from 'lucide-react';

const tabs = ['users', 'roles', 'permissions'];
type Tab = typeof tabs[number];
type User = { id: number; name: string; email: string; roles: string[] };
type Role = { id: number; name: string; description: string; permissions: string[] };
type Permission = { id: number; name: string; description: string; roles: string[] };

function IamTab() {
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [expandedPermission, setExpandedPermission] = useState<number | null>(null);
  const [permissionSearchTerm, setPermissionSearchTerm] = useState('');
  const [roleSearchTerm, setRoleSearchTerm] = useState('');
  

  // Enhanced mock data with machine-readable permission names
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', roles: ['Admin', 'Editor'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', roles: ['Editor'] },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', roles: ['Viewer'] },
  ]);

  const [roles, setRoles] = useState<Role[]>([
    { 
      id: 1, 
      name: 'Admin',
      description: 'Full system access with all permissions',
      permissions: ['create_users', 'edit_content', 'view_content', 'manage_roles', 'manage_permissions']
    },
    { 
      id: 2, 
      name: 'Editor',
      description: 'Can edit and manage content',
      permissions: ['edit_content', 'view_content']
    },
    { 
      id: 3, 
      name: 'Viewer',
      description: 'Read-only access to content',
      permissions: ['view_content']
    },
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    { 
      id: 1, 
      name: 'create_users',
      description: 'Ability to create and manage user accounts',
      roles: ['Admin']
    },
    { 
      id: 2, 
      name: 'edit_content',
      description: 'Can modify and publish content',
      roles: ['Admin', 'Editor']
    },
    { 
      id: 3, 
      name: 'view_content',
      description: 'Can view published content',
      roles: ['Admin', 'Editor', 'Viewer']
    },
  ]);

  const tabs = [
    { id: 'users' as Tab, label: 'User Management', icon: Users },
    { id: 'roles' as Tab, label: 'Role Management', icon: Shield },
    { id: 'permissions' as Tab, label: 'Permission Management', icon: Key },
  ];

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(permissionSearchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(permissionSearchTerm.toLowerCase())
  );

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(roleSearchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(roleSearchTerm.toLowerCase())
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPermissionSearchTerm('');
    setRoleSearchTerm('');
  };


  const handleAdd = () => {
    setModalType('add');
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setModalType('edit');
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    switch (activeTab) {
      case 'users':
        setUsers(users.filter(user => user.id !== id));
        break;
      case 'roles':
        setRoles(roles.filter(role => role.id !== id));
        break;
      case 'permissions':
        setPermissions(permissions.filter(permission => permission.id !== id));
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newItem: any = {};
    formData.forEach((value, key) => {
      if (key === 'roles' || key === 'permissions') {
        newItem[key] = Array.from(formData.getAll(key));
      } else if (key === 'name' && activeTab === 'permissions') {
        // Convert permission name to machine-readable format
        newItem[key] = value.toString().toLowerCase().replace(/\s+/g, '_');
      } else {
        newItem[key] = value;
      }
    });

    switch (activeTab) {
      case 'users':
        if (modalType === 'add') {
          setUsers([...users, { ...newItem, id: users.length + 1 }]);
        } else {
          setUsers(users.map(user => user.id === selectedItem.id ? { ...user, ...newItem } : user));
        }
        break;
      case 'roles':
        if (modalType === 'add') {
          setRoles([...roles, { ...newItem, id: roles.length + 1, permissions: newItem.permissions || [] }]);
        } else {
          setRoles(roles.map(role => role.id === selectedItem.id ? { ...role, ...newItem } : role));
        }
        break;
      case 'permissions':
        if (modalType === 'add') {
          setPermissions([...permissions, { ...newItem, id: permissions.length + 1, roles: newItem.roles || [] }]);
        } else {
          setPermissions(permissions.map(permission => 
            permission.id === selectedItem.id ? { ...permission, ...newItem } : permission
          ));
        }
        break;
    }
    setIsModalOpen(false);
  };

  const renderModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {modalType === 'add' ? 'Add New' : 'Edit'} {activeTab.slice(0, -1)}
            </h2>
            <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'users' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedItem?.name}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={selectedItem?.email}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Roles</label>
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={roleSearchTerm}
                    onChange={(e) => setRoleSearchTerm(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                    {filteredRoles.map(role => (
                      <label key={role.id} className="inline-flex items-center mr-4">
                        <input
                          type="checkbox"
                          name="roles"
                          value={role.name}
                          defaultChecked={selectedItem?.roles?.includes(role.name)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{role.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
            {activeTab === 'roles' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedItem?.name}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedItem?.description}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Permissions</label>
                  <input
                    type="text"
                    placeholder="Search permissions..."
                    value={permissionSearchTerm}
                    onChange={(e) => setPermissionSearchTerm(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                    {filteredPermissions.map(permission => (
                      <label key={permission.id} className="flex items-center">
                        <input
                          type="checkbox"
                          name="permissions"
                          value={permission.name}
                          defaultChecked={selectedItem?.permissions?.includes(permission.name)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {permission.name}
                          <span className="text-gray-500 text-xs ml-1">({permission.description})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
            {activeTab === 'permissions' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedItem?.name}
                    placeholder="e.g., create_users"
                    pattern="[a-z0-9_]+"
                    title="Use lowercase letters, numbers, and underscores only"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Use lowercase letters, numbers, and underscores only (e.g., create_users)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedItem?.description}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assign to Roles</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Search roles..."
                      value={roleSearchTerm}
                      onChange={(e) => setRoleSearchTerm(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <div className="mt-2 space-y-2">
                      {filteredRoles.map(role => (
                        <label key={role.id} className="flex items-center">
                          <input
                            type="checkbox"
                            name="roles"
                            value={role.name}
                            defaultChecked={selectedItem?.roles?.includes(role.name)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {role.name}
                            <span className="text-gray-500 text-xs ml-1">({role.description})</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {modalType === 'add' ? 'Add' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">IAM Management</h1>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`
                    py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm
                    ${activeTab === id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roles
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-2">
                            {user.roles.map(role => (
                              <span key={role} className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                                {role}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'roles' && (
              <div className="space-y-4">
                {roles.map(role => (
                  <div key={role.id} className="border border-gray-200 rounded-lg">
                    <div 
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                      onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Shield className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{role.name}</h3>
                          <p className="text-sm text-gray-500">{role.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(role);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(role.id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transform transition-transform ${
                            expandedRole === role.id ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                    {expandedRole === role.id && (
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions</h4>
                        <div className="space-y-2">
                          {role.permissions.map((permission, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Key className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{permission}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'permissions' && (
              <div className="space-y-4">
                {permissions.map(permission => (
                  <div key={permission.id} className="border border-gray-200 rounded-lg">
                    <div 
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                      onClick={() => setExpandedPermission(expandedPermission === permission.id ? null : permission.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Key className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{permission.name}</h3>
                          <p className="text-sm text-gray-500">{permission.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(permission);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(permission.id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transform transition-transform ${
                            expandedPermission === permission.id ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                    {expandedPermission === permission.id && (
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned Roles</h4>
                        <div className="flex flex-wrap gap-2">
                          {permission.roles.map((role, index) => (
                            <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {renderModal()}
    </div>
  );
}

export default IamTab;