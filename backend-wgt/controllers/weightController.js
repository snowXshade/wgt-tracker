import weightModel from '../models/weightModel.js';

export const addWeight = async (req, res) => {
  const { date, wgt } = req.body;
  const userId = req.user.userId;

  if (!date || wgt === undefined) return res.status(400).json({ message: 'Date and weight are required' });
  if (wgt < 0 || wgt > 200) return res.status(400).json({ message: 'Weight must be between 0 and 200' });

  try {
    const newWeight = new weightModel({ userId, date, wgt });
    const savedWeight = await newWeight.save();
    res.status(201).json(savedWeight);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add weight', error: error.message });
  }
};

export const getWeights = async (req, res) => {
  const userId = req.user?.userId;
  try {
    const weights = await weightModel.find({ userId }).sort({ date: 1 });
    res.json(weights);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch weights', error: error.message });
  }
};

export const deleteWeight = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await weightModel.findOneAndDelete({
      _id: id,
      userId: req.user.userId, // ensure user owns the entry
      
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Weight entry not found or unauthorized' });
    }

//     console.log("req.user.userId:", req.user.userId);
// console.log("req.params.id:", req.params.id);

    res.json({ message: 'Weight entry deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete weight entry' });
  }
};

export const updateWeight = async (req, res) => {
  const { id } = req.params;
  const { date, wgt } = req.body;

  if (!date || wgt === undefined) {
    return res.status(400).json({ message: 'Date and weight are required' });
  }

  try {
    const updated = await weightModel.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { date, wgt },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Entry not found or unauthorized' });
    }

    res.json({ message: 'Weight updated', updated });
  } catch (err) {
    console.error('Error updating weight:', err);
    res.status(500).json({ message: 'Failed to update weight' });
  }
};