import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import "./OrdersTable.css"; // Import the CSS file
import EmojiConvertor from "emoji-js";

const orderData = [
  {
    id: "ORD001",
    customer: "John Doe",
    total: 235.4,
    status: "Delivered",
    date: "2023-07-01",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    total: 412.0,
    status: "Processing",
    date: "2023-07-02",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    total: 162.5,
    status: "Shipped",
    date: "2023-07-03",
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    total: 750.2,
    status: "Pending",
    date: "2023-07-04",
  },
  {
    id: "ORD005",
    customer: "Charlie Wilson",
    total: 95.8,
    status: "Delivered",
    date: "2023-07-05",
  },
  {
    id: "ORD006",
    customer: "Eva Martinez",
    total: 310.75,
    status: "Processing",
    date: "2023-07-06",
  },
  {
    id: "ORD007",
    customer: "David Lee",
    total: 528.9,
    status: "Shipped",
    date: "2023-07-07",
  },
  {
    id: "ORD008",
    customer: "Grace Taylor",
    total: 189.6,
    status: "Delivered",
    date: "2023-07-08",
  },
];

const emoji = new EmojiConvertor();
emoji.init_env(); // Initialize emoji-js environment

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orderData);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orderData.filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "Delivered":
        return `${emoji.replace_colons(":smiley:")} status-delivered`;
      case "Processing":
        return `${emoji.replace_colons(
          ":hourglass_flowing_sand:"
        )} status-processing`;
      case "Shipped":
        return `${emoji.replace_colons(":truck:")} status-shipped`;
      default:
        return `${emoji.replace_colons(":warning:")} status-pending`;
    }
  };

  return (
    <motion.div
      className="orders-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="header">
        <h2 className="title">Order List</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search orders..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="search-icon" size={18} />
        </div>
      </div>

      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="order-id">{order.id}</td>
                <td className="customer-name">{order.customer}</td>
                <td className="order-total">${order.total.toFixed(2)}</td>
                <td className="order-status">
                  <span
                    className={`status-badge ${getStatusClassName(
                      order.status
                    )}`}
                    dangerouslySetInnerHTML={{
                      __html: getStatusClassName(order.status),
                    }}
                  />
                </td>

                <td className="order-date">{order.date}</td>
                <td className="order-actions">
                  <button className="view-button">
                    <Eye size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrdersTable;
