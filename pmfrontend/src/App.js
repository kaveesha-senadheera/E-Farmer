import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import InsertInventory from "./Components/Inventory/InsertInventory";  
import UpdateInventory from "./Components/Inventory/UpdateInventory";  
import SalesTrends from "./Components/SalesTrends/SalesTrends";  
import ProductListing from "./Components/ProductListing/ProductListing";
import Store from "./Components/Store/Store";
import AdminDashboard from './Components/Admin/AdminDashboard';
import MainPIHome from './Components/MainPI/MainPIHome';
import AddToCart from './Components/Store/AddToCart';
import { CartProvider } from './Components/Store/CartContext';
import SupplierDetails from './Components/Suppliers/SupplierDetails';
import SupplierForm from './Components/Suppliers/SupplierForm';
import CheckoutForm from './Components/Store/CheckoutForm';
import OrderManagementHome from './Components/OrderManager/OrderManagementHome';
import DeliveryForm from './Components/OrderManager/DeliveryForm';
import DeliveryStatusReportForm from './Components/OrderManager/DeliveryStatusReportForm';
import OrderList from './Components/OrderManager/OrderList';
import PaymentPage from "./Components/Store/PaymentPage";

function App() {
  return (
    <CartProvider>
    <Routes>
      {/*<Route path="/" element={<Dashboard />} />*/}
      <Route path="/" element={<AdminDashboard />} /> 
      <Route path="/add-inventory" element={<InsertInventory />} />
      <Route path="/update-inventory/:id" element={<UpdateInventory />} />
      <Route path="/sales-trends" element={<SalesTrends />} />  
      <Route path="/product-listing" element={<ProductListing />} /> 
      <Route path="/store" element={<Store />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/product-inventory" element={<Dashboard />} />
      <Route path="/product-inventory-home" element={<MainPIHome />} />
      <Route path="/cart" element={<AddToCart />} />
      <Route path="/supplier-details" element={<SupplierDetails />} />
      <Route path="/supplier-form" element={<SupplierForm />} />
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/order-management" element={<OrderManagementHome />} />
      <Route path="/orders" element={<OrderList />} />
        <Route path="/delivery-form" element={<DeliveryForm />} />
        <Route path="/delivery-status" element={<DeliveryStatusReportForm />} />
        <Route path="/payment" element={<PaymentPage />} />


    </Routes>
    </CartProvider>
  );
}

export default App;
