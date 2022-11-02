import dbConnect from '../../../utils/dbConnect';
import City from '../../../models/City';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch(method) {
        case 'GET':
            try {
                const city = await City.findById(id);

                if (!city) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: city });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedCity = await City.deleteOne({ _id: id });

                if(!deletedCity) {
                    return res.status(400).json({ success: false });
                }

                res.status(500).json({ success: true, data: {} });

            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}