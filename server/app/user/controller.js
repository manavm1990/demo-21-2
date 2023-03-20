import User from "./index.js";

const controller = {
  async create(username, password) {
    const createdUser = await User.create({ username, password });

    const jwt = await createdUser.authenticate(password);

    return { jwt };
  },
  async show(username, password) {
    const user = await User.findOne({ username }).populate("thoughts");

    const jwt = await user?.authenticate(password);

    return { jwt, thoughts: user?.thoughts };
  },
};

export default controller;
