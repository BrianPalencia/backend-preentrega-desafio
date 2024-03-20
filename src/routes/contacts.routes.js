import { Router } from "express";
import { contactService } from "../repository/index.js";



const router = Router();


router.get("/", async (req, res) => {
    try {
        const data = await contactService.getContacts();
        res.json(data);
    }
    catch (err) {
        console.error("Error getting contacts", err);
        res.status(500).json({ message: "Error getting contacts" });
    }
});

router.post("/", async (req, res) => {
    try {
        const contact = req.body;
        const data = await contactService.createContact(contact);
        res.json(data);
    }
    catch (err) {
        console.error("Error creating contact", err);
        res.status(500).json({ message: "Error creating contact" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const contact = req.body
        const data = await contactService.modifyContact(id, contact);
        res.json(data);
    }
    catch (err) {
        console.error("Error updating contact", err);
        res.status(500).json({ message: "Error updating contact" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await contactService.deleteContact(id);
        res.json(data);

    }
    catch (err) {
        console.error("Error deleting contact", err);
        res.status(500).json({ message: "Error deleting contact" });
    }
});


export default router;
