import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

export const Endpoints = {
  // Users Account
  tryLogin: `${baseUrl}/api/UserAccount/login`,
  refreshToken: `${baseUrl}/api/UsersAccount/refreshToken`,
  getEmployees: `${baseUrl}/api/UsersAccount/GetUsers`,
  addEmployee: `${baseUrl}/api/UsersAccount/registerEmployee`,
  updateEmployee: `${baseUrl}/api/UsersAccount/UpdateUserData`,
  activateUser: `${baseUrl}/api/UsersAccount/ActiveUSer`,
  deactivateUser: `${baseUrl}/api/UsersAccount`,
  deleteUser: `${baseUrl}/api/UsersAccount/DeleteUser`,
  getUserById: (id: string) => `${baseUrl}/api/UsersAccount/${id}`,
  getSystemRoles: `${baseUrl}/api/UsersAccount/SystemRoles`,
  updateUserRoles: (id: string) =>
    `${baseUrl}/api/UsersAccount/UpdateUserRole/${id}`,

  // Areas
  getAreas: `${baseUrl}/api/Area`,

  // Departments
  getDepartments: `${baseUrl}/api/Department`,

  // Categories
  getCategories: `${baseUrl}/api/Category`,
  addCategory: `${baseUrl}/api/Category`,
  updateCategory: `${baseUrl}/api/Category`,
  getCategoryById: (id: number) => `${baseUrl}/api/Category/${id}`,
  deleteCategory: (id: number) => `${baseUrl}/api/Category/${id}`,

  // Category Attributes
  getCategoryAttributes: `${baseUrl}/api/CategoryAttributeDefination`,
  addCategoryAttribute: `${baseUrl}/api/CategoryAttributeDefination`,
  updateCategoryAttribute: `${baseUrl}/api/CategoryAttributeDefination`,
  deleteCategoryAttribute: (id: number) =>
    `${baseUrl}/api/CategoryAttributeDefination/${id}`,

  // Category Attribute Values
  getCategoryAttributeValues: `${baseUrl}/api/CategoryAttributeValueSetup`,
  addCategoryAttributeValue: `${baseUrl}/api/CategoryAttributeValueSetup`,
  updateCategoryAttributeValue: `${baseUrl}/api/CategoryAttributeValueSetup`,
  deleteCategoryAttributeValue: (id: number) =>
    `${baseUrl}/api/CategoryAttributeValueSetup/${id}`,

  // Seda Products
  addSedaProduct: `${baseUrl}/api/SystemProduct/AddSystemProduct`,
  updateSedaProduct: `${baseUrl}/api/SystemProduct/UpdateSystemProduct`,
  deleteSedaProduct: `${baseUrl}/api/SystemProduct`,
  getSedaProducts: `${baseUrl}/api/SystemProduct`,
  getSedaProductById: (id: number | string) =>
    `${baseUrl}/api/SystemProduct/${id}`,
  changeProductQuantity: `${baseUrl}/api/SystemProduct/ChangeQty`,

  // Merchants
  getMerchants: `${baseUrl}/api/UsersAccount/GetMerchants`,

  // Quotas
  getAllQuotas: `${baseUrl}/api/SysQuota/GetAllQuotas`,
} as const;
