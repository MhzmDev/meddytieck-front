import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

export const Endpoints = {
  // Users Account
  tryLogin: `${baseUrl}/api/UserAccount/login`,
  refreshToken: `${baseUrl}/api/UserAccount/RefreshToken`,
  getEmployees: `${baseUrl}/api/UserAccount/GetUsers`,
  addEmployee: `${baseUrl}/api/UserAccount/registerEmployee`,
  updateEmployee: `${baseUrl}/api/UserAccount/UpdateUserData`,
  activateUser: `${baseUrl}/api/UserAccount/ActiveUSer`,
  deactivateUser: `${baseUrl}/api/UserAccount`,
  deleteUser: `${baseUrl}/api/UserAccount/DeleteUser`,
  getUserById: (id: string) => `${baseUrl}/api/UserAccount/${id}`,
  getSystemRoles: `${baseUrl}/api/UserAccount/SystemRoles`,
  updateUserRoles: (id: string) =>
    `${baseUrl}/api/UserAccount/UpdateUserRole/${id}`,

  // Areas
  getAreas: `${baseUrl}/api/Area`,
  getAreaById: `${baseUrl}/api/Area`,
  createArea: `${baseUrl}/api/Area`,
  updateArea: `${baseUrl}/api/Area`,
  deleteArea: `${baseUrl}/api/Area`,

  // Departments
  getDepartments: `${baseUrl}/api/UserAccount/GetAllDepartments`,

  // Suppliers
  getSuppliers: `${baseUrl}/api/Vendor/GetAllVendors`,
  getSupplierById: `${baseUrl}/api/Vendor/GetVendorById`,
  addSupplier: `${baseUrl}/api/Vendor/CreateVendor`,

  updateSupplier: `${baseUrl}/api/Vendor/UpdateVendor`,
  deleteSupplier: `${baseUrl}/api/Vendor/DeleteVendor`,
} as const;
