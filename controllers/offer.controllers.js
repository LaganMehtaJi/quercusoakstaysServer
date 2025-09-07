import offerModel from "../models/offer.models.js";
export const AddOffer = async (req, res) => {
    try {   
        const { code, discountPercentage, title, discription, expiryDate } = req.body;
        if (!code || !discountPercentage || !title || !discription || !expiryDate) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingOffer = await offerModel.find({});
        if(existingOffer.length == 0){
            const newOffer = new offerModel({
                code,
                discountPercentage,
                title,      
                discription,
                expiryDate
            });
            await newOffer.save();
            res.status(201).json({ message: "Offer Added Successfully", offer: newOffer
            })
        }else{
            res.status(400).json({ message: "Only 1 offer are allowed" });
        }

    }catch (error){
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const GetAllOffer = async (req, res) => {
    try {
        const offers = await offerModel.find({});
        if(offers.length === 0){
            return res.status(404).json({ message: "No offers found" });
        }
        res.status(200).json({ offers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const DeleteOffer = async (req, res) => {
    try {
        const { code } = req.params;
        const offer = await offerModel.findOne({ code });
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }   
            
        await offerModel.deleteOne({ code });
        res.status(200).json({ message: "Offer deleted successfully" });
    } catch (error) {       
        console.log(error); 
        res.status(500).json({ message: "Server Error" });

    }       
};

export const UpdateOffer = async (req, res) => {
    try {       
        const { code } = req.params;
        if(!code){
            console.log("Offer code is required");
            return res.status(400).json({ message: "Offer code is required" });
        }
        const { discountPercentage, title, discription, expiryDate } = req.body;
        const offer = await offerModel.findOne({ code });
        if (!offer) {
            console.log("Offer not found for code:", code);
            return res.status(404).json({ message: "Offer not found" });
        }   

        if(!discountPercentage||!title||!discription||!expiryDate){
            console.log("All fields are required");
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedOffer = await offerModel.updateOne({ code }, { discountPercentage, title, discription, expiryDate });
       if (updatedOffer.modifiedCount === 0) {
    return res.status(400).json({ message: "No changes made to the offer" });
}  

        res.status(200).json({ message: "Offer updated successfully", offer });
    }   
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });

    }
};