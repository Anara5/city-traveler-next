import dbConnect from '../../../utils/dbConnect';
import City from '../../../models/City';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const cities = await City.find({});
                res.status(200).json({ success: true, data: cities })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const city = await City.create(req.body);
                res.status(201).json({ success: true, data: city })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default: 
        res.status(400).json({ success: false });
        break;
    }
}
