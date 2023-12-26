const Billing = require("../MODEL/BillingSchema");
const Product = require("../MODEL/ProductSchema");

const BillControllerFunction = {
  CreateBill: async (req, res) => {
    try {
      const { userName, userContact, items } = req.body;

      let totalAmount = 0;
      let billItems = [];

      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
          return await res
            .status(400)
            .json({ success: false, message: "PRODUCT NOT FOUND!!" });
        }
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        billItems.push({
          product: item.product,
          quantity: item.quantity,
          price: itemTotal,
        });
      }

      const newBill = new Billing({
        userName,
        userContact,
        items: billItems,
        totalAmount: totalAmount,
      });
      await newBill.save();

      return await res.status(200).json({
        success: true,
        message: "BILL CREATED SUCCESSFULLY!!",
        bill: newBill,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `CAN'T MAKE BILL!!`,
      });
    }
  },
  ShowAllbill: async (req, res) => {
    try {
      const allBills = await Billing.find();

      return await res.status(200).json({
        success: true,
        message: "BILLS FETCHED SUCCESSFULLY!!",
        data: allBills,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `CAN'T SHOW ALL BILLS!!`,
      });
    }
  },
  DeleteBill: async (req, res) => {
    try {
      await Billing.findOneAndDelete({ _id: req.params.id });
      return await res.status(200).json({
        success: true,
        message: "BILL DELETED SUCCESSFULLY !!",
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: "CAN'T DELETE BILL!!",
      });
    }
  },
  ViewSingleBill: async (req, res) => {
    try {
      const { id } = req.params;
      const singleBill = await Billing.findById({ _id: id });
      return await res.status(200).json({
        success: true,
        message: "BILL FETCHED SUCCESSFULLY!!",
        data: singleBill,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: "AN ERROR OCCURED!!",
      });
    }
  },
  UpdateBill: async (req, res) => {
    try {
      const billId = req.params.id;
      const { userName, userContact, items } = req.body;

      const updatedBill = await Billing.findById(billId);
      if (!updatedBill) {
        return res
          .status(404)
          .json({ success: false, message: "BILL NOT FOUND!!" });
      }

      updatedBill.userName = userName;
      updatedBill.userContact = userContact;

      let totalAmount = 0;
      let updatedItems = [];
      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res
            .status(400)
            .json({ success: false, message: "PRODUCT NOT FOUND!!" });
        }
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        updatedItems.push({
          product: item.product,
          quantity: item.quantity,
          price: itemTotal,
        });
      }

      updatedBill.items = updatedItems;
      updatedBill.totalAmount = totalAmount;

      await updatedBill.save();

      return res.status(200).json({
        success: true,
        message: "BILL UPDATED SUCCESSFULLY!!",
        data: updatedBill,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "CAN'T UPDATE BILL!!",
      });
    }
  },
};
module.exports = BillControllerFunction;
