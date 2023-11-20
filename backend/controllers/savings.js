const SavingsSchema= require("../models/SavingsModel")


exports.addSavings = async (req, res) => {
    console.log(req.body);
    const {title, amount, category, description, date}  = req.body

    const savings = SavingsSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        
        await savings.save()
        res.status(200).json({message: 'Goal Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(savings)
}

exports.getSavings = async (req, res) =>{
    try {
        const Savings = await SavingsSchema.find().sort({ createdAt: -1 });
        res.status(200).json(Savings);
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteSavings = async (req, res) =>{
    const {id} = req.params;
    SavingsSchema.findByIdAndDelete(id)
        .then((savings) =>{
            res.status(200).json({message: 'Goal Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}