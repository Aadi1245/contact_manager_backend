const asyncHandler = require("express-async-handler");
const Contact = require("../modals/contactModal.js")
//@desc get all contacts
// @route GET /api/contacts
// @access Private

// const { param } = require("../routes/contactRoutes");

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user:req.user.id});
    console.log("The contacts are :", contacts);
    res.status(200).json(contacts);
});


//@desc Create contact
// @route Post /api/contacts/:id
// @access Private

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        console.log("All fields are available :", name, email, phone);
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    console.log("The contact before creating is :", name, email, phone,req.user.id);
    const contact = await Contact.create({
        name,
        email,
        phone,
        user: req.user.id
    });

    console.log("The contact created is :", contact);

    res.status(201).json(contact);
});

//@desc Update contact
// @route PUT /api/contacts
// @access Private

const updateContact = asyncHandler(async (req, res) => {
      const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found !");
    }
    if(contacts.user.toString()!==req.user.id){
        res.status(403);
        throw new Error("User not authorized to update this contact !");
    }
    const updateContact= await Contact.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    });

    res.status(200).json(updateContact);
});

//@desc Create contact
// @route Delete /api/contacts
// @access Private

const deleteContact = asyncHandler(async (req, res) => {
     const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found !");
    }
    if(contacts.user.toString()!==req.user.id){
        res.status(403);
        throw new Error("User not authorized to delete this contact !");
    }
    const deletedContact= await Contact.findByIdAndDelete(req.params.id);
    if(!deletedContact){
        res.status(400);
        throw new Error("Contact not found !");
    }
    res.status(200).json(deletedContact);
});

//@desc Create contact
// @route GET /api/contacts/:id
// @access Private

const getContact = asyncHandler(async (req, res) => {
    const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw Error("Contact not found !");
    }
    res.status(200).json(contacts);
});

module.exports = { getContacts, createContact, updateContact, deleteContact, getContact };