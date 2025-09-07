import  {addModel} from "../models/add.models.js";

export const AddPhone = async (req, res) => {
    try {       
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ message: "Phone number is required" });
        }
        const newPhone = new addModel({ phone });
        await newPhone.save();
        res.status(201).json({ message: "Phone number added successfully", phone: newPhone });
    }   
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const GetAllPhone = async (req, res) => {   
    try {
        const phones = await addModel.find({});     
        if (phones.length === 0) {      
            return res.status(404).json({ message: "No phone numbers found" });
        }           
        res.status(200).json({ phones });   

    } catch (error) {   
        console.log(error);     
        res.status(500).json({ message: "Server Error" });  

    }
};


export const DeletePhone = async (req, res) => {
    try {
        const { phone } = req.params;

        const phoneno = await addModel.findOne({ phone });
        if (!phoneno) {
            return res.status(404).json({ message: "Phone number not found" });
        }   

        await addModel.findOneAndDelete({ phone });       

        res.status(200).json({ message: "Phone number deleted successfully" });     
    } catch (error) {       
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};
