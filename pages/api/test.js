import dbConnect from "../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
    await res.json({ test: 'anarik fonarik'});
}

