module.exports = function (success, error) {
  const client = require('../config/config');

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("连接成功");
      success && success();
    } catch (e) {
      console.error(e);
      error && error();
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
};
