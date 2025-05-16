import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Dashboard, Add, ShowChart, Store, AccountCircle, Inventory } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", bgcolor: "#2c3e50", color: "white" },
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ mx: "auto" }}>
          🛒 Store Admin
        </Typography>
      </Toolbar>

      <List>
        <ListItem button onClick={() => navigate("/dashboard")}>
          <ListItemIcon sx={{ color: "white" }}><Dashboard /></ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>

        {/*add product*/}
        <ListItem button onClick={() => navigate("/product-listing")}>
          <ListItemIcon sx={{ color: "white" }}><Inventory /></ListItemIcon>
          <ListItemText primary="Product Listing" />
        </ListItem>

        {/* "Store" Navigation Button */}
        <ListItem button onClick={() => navigate("/store")}>
          <ListItemIcon sx={{ color: "white" }}><Store /></ListItemIcon>
          <ListItemText primary="Store" />
        </ListItem>

        <ListItem button onClick={() => navigate("/add-inventory")}>
          <ListItemIcon sx={{ color: "white" }}><Add /></ListItemIcon>
          <ListItemText primary="Add Inventory" />
        </ListItem>

        <ListItem button onClick={() => navigate("/sales-trends")}>
  <ListItemIcon sx={{ color: "white" }}><ShowChart /></ListItemIcon>
  <ListItemText primary="Sales Trends & Reports" />
</ListItem>


        <ListItem button onClick={() => navigate("/supplier-details")}>
          <ListItemIcon sx={{ color: "white" }}><Store /></ListItemIcon>
          <ListItemText primary="Supplier Details" />
        </ListItem>

        <ListItem button onClick={() => navigate("/supplier-form")}>
          <ListItemIcon sx={{ color: "white" }}><Store /></ListItemIcon>
          <ListItemText primary="Add Supllier" />
        </ListItem>

        <ListItem button onClick={() => navigate("/profile")}>
          <ListItemIcon sx={{ color: "white" }}><AccountCircle /></ListItemIcon>
          <ListItemText primary="Inventory Manager Profile" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
